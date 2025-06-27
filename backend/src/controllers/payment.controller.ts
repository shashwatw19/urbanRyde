import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";
import { Request, Response } from "express";
import crypto, { KeyObject } from "crypto";
import { IUser, User } from "../models/user.model";
import { ICaptain } from "../models/captain.model";
import { Ride } from "../models/ride.model";
import { instance } from "../config/razporpay.config";
import { mailSender } from "../config/mailSender";
import { sendMessageToSocketId } from "../socket";
import { validationResult } from "express-validator";
import { Captain } from "../models/captain.model";
import { Result } from "express-validator";
import { rideCompletedTemplate } from "../mail/templates/rideCompletedTemplate";
export interface PaymentRequest {
  _id: string;
  pickup: string;
  destination: string;
  vehicleType: "car" | "auto" | "moto";
  fare: number | undefined;
  user: Partial<IUser>;
  captain: Partial<ICaptain>;
  duration: number | undefined;
  status: "pending" | "accepted" | "ongoing" | "completed" | "cancelled";
  otp: number | undefined;
}

const capturePayment = asyncHandler(async (req: Request, res: Response) => {
  const errors: Result = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessage: string[] = errors.array();
    throw new ApiError(400, "invalid Fields", false, errorMessage);
  }
  const { rideId, fare } = req.body;
  console.log("Payment Request...", rideId, fare);

  const validRide = await Ride.findById(rideId);

  if (!validRide) {
    throw new ApiError(404, "ride not found..");
  }

  const options = {
    amount: (fare as number) * 100,
    currency: "INR",
    receipt: Math.random().toString(36).substring(2, 12),
  };
  try {
    const paymentResponse = await instance.orders.create(options);
    console.log("paymentResponse from createOrders", paymentResponse);
    return res
      .status(200)
      .json(new ApiResponse(200, "order creadted ", paymentResponse));
  } catch (e) {
    console.log(e);
    throw new ApiError(401, `error from razorPay while creating order ${e}`);
  }
});

const verifyPayment = asyncHandler(async (req: Request, res: Response) => {
  const errors: Result = validationResult(req);

  if (!errors.isEmpty()) {
    const errorMessage: string[] = errors.array();
    throw new ApiError(400, "invalid fields", false, errorMessage);
  }

  const razorpay_order_id = req.body?.razorpay_order_id;
  const razorpay_payment_id = req.body?.razorpay_payment_id;
  const razorpay_signature = req.body?.razorpay_signature;
  const rideId = req.body.rideId
  const captainId = req.body?.captainId;
  console.log("Reqest body for rzp payment req ", req.body);
  let body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_SECRET as BinaryType | KeyObject)
    .update(body.toString())
    .digest("hex");

  if (expectedSignature === razorpay_signature) {
    
    const captain = await Captain.findById(captainId);
    if (!captain) {
      throw new ApiError(404, "Captain not found");
    }
    const captainSocketId = captain.socketId;
    if (!captainSocketId) {
      throw new ApiError(400, "Not able to send payment confirmation to captain");
    }
    sendMessageToSocketId(captainSocketId, 'payment-completed', {
      rideId
    });
    return res
      .status(200)
      .json(new ApiResponse(200, "Payment Verified...You can end Ride"));
  } else {
    
    throw new ApiError(401, "Payment Failed...Not Able to verify");
  }
});

const sendRideSuccessMail = asyncHandler(
  async (req: Request, res: Response) => {
    const errors: Result = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessage: string[] = errors.array();
      throw new ApiError(400, "invalid fields", false, errorMessage);
    }
    const {emailId , username , captain , vehicleType , duration , distance , fare , pickup , destination } = req.body;
    console.log("emailId for sending success mail ");
    
    const rideDetails = {
    riderName: username,
    driverName: captain,
    vehicleType: vehicleType,
    pickupLocation: pickup,
    dropoffLocation: destination,
    fare: fare,
    distance: distance,
    duration: duration,
    }
    try {
      const response = await mailSender(
        emailId,
        "Your Has Ride Has Been Completed ",
        rideCompletedTemplate(rideDetails)
      );
      
      return res.status(200).json(new ApiResponse(200, "success mail sent!"));
    } catch (e) {
      console.log("error while sending ride success mail", e);
      throw new ApiError(500, "error while sending success mail");
    }
  }
);

export { capturePayment, verifyPayment, sendRideSuccessMail };
