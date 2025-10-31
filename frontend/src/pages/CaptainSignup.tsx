import { CaptainSignUpSchema } from "../schema/CaptainSchema";
import { captainSignUpSchema } from "../schema/CaptainSchema";
import { useContext, useState } from "react";
import { ChangeEvent, FormEvent } from "react";
import { Link } from "react-router-dom";
import { createOtp } from "../services/operations/user/auth";
import { UserDataContext } from "../context/UserContext";
import moto from '../assets/bike.webp'
import car from "../assets/car.webp"
import VerifyEmailCaptain from "./VerifyEmailCaptain";
import auto from "../assets/auto.webp"

const CaptainSignup = () => {

  const [input, setInput] = useState<CaptainSignUpSchema>({
    email: "",
    password: "",
    firstname: "",
    lastname: "",
    color: "",
    NumberPlate: "",
    capacity: 1,
    vehicleType: "car"
  });

  const { loading, setLoading, setUser } = useContext(UserDataContext);
  const [error, setErrors] = useState<Partial<CaptainSignUpSchema>>({});
  const [showVerifyEmail , setShowVerifyEmail] = useState<boolean>(false)
  const changeHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: name === "capacity" ? parseInt(value) || 1 : value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const result = captainSignUpSchema.safeParse(input);

    if (!result.success) {
      const fieldError = result.error.formErrors.fieldErrors;
      setErrors(fieldError as Partial<CaptainSignUpSchema>);
      return;
    }
    console.log("input from signup captain", input)
    try {
      const response = await createOtp(input.email, setLoading);
      if (response) {
        setUser({
          email: input.email,
          password: input.password,
          fullname: {
            firstname: input.firstname,
            lastname: input.lastname || "",
          },
          vehicle: {
            color: input.color,
            NumberPlate: input.NumberPlate,
            capacity: input.capacity,
            vehicleType: input.vehicleType!
          }
        });
        // return navigate('/verify-email-captain');
        setShowVerifyEmail(true)
      }
    } catch (e) {
      console.log("error in signup component", e);
    } finally {
      setErrors({});
    }
  };

  if(showVerifyEmail){
    return <VerifyEmailCaptain></VerifyEmailCaptain>
  }
  return (
    <div className="p-7 flex flex-col justify-between gap-10 items-start min-h-screen">
      <h1 className="text-black md:text-4xl text-4xl ">UrbanRyde</h1>

      <form
        onSubmit={handleSubmit}
        className="md:max-w-xl md:mt-20 mt-10 mx-auto w-full"
      >
        {/* Name Section */}
        <div className="flex flex-col mb-7 gap-2 items-start justify-between">
          <h3 className="text-lg mb-2 font-medium ">
            What's your name captain?
          </h3>
          <div className="flex flex-row gap-2 md:w-full">
            <div className="w-1/2 md:w-full flex flex-col gap-1">
              <input
                className="bg-[#eeeeee] px-4 py-2 w-full border text-base placeholder::text-base rounded-md"
                onChange={changeHandler}
                type="text"
                name="firstname"
                value={input.firstname}
                required
                placeholder="first name"
              />
              {error.firstname && (
                <span className="text-red-500 text-sm">{error.firstname}</span>
              )}
            </div>
            <div className="w-1/2 md:w-full flex flex-col gap-1">
              <input
                className="bg-[#eeeeee] px-4 py-2 w-full border text-base placeholder::text-base rounded-md"
                onChange={changeHandler}
                type="text"
                name="lastname"
                value={input.lastname}
                placeholder="last name"
              />
              {error.lastname && (
                <span className="text-red-500 text-sm">{error.lastname}</span>
              )}
            </div>
          </div>
        </div>

        {/* Email Section */}
        <div className="flex flex-col mb-7 gap-2 items-start justify-between">
          <h3 className="text-lg mb-2 font-medium ">What's your email?</h3>
          <input
            className="bg-[#eeeeee] px-4 py-2 border w-full text-base placeholder::text-base rounded-md"
            onChange={changeHandler}
            type="email"
            name="email"
            value={input.email}
            required
            placeholder="email@example.com"
          />
          {error.email && (
            <span className="text-red-500 text-sm">{error.email}</span>
          )}
        </div>

        {/* Password Section */}
        <div className="flex flex-col mb-7 gap-2 items-start justify-between">
          <h3 className="text-lg mb-2 font-medium ">Enter Password</h3>
          <input
            className="bg-[#eeeeee] px-4 py-2 border w-full text-base placeholder::text-base rounded-md"
            onChange={changeHandler}
            name="password"
            value={input.password}
            required
            placeholder="password"
            type="password"
          />
          {error.password && (
            <span className="text-red-500 text-sm">{error.password}</span>
          )}
        </div>

        <div className="flex flex-col mb-7 gap-6 items-start justify-between">
          <div className="w-full">
            <h3 className="text-xl mb-1 font-semibold text-gray-800">Vehicle Information</h3>
            <p className="text-sm text-gray-600">Tell us about your vehicle</p>
          </div>

          {/* Vehicle Type Selection */}
          <div className="w-full">
            <label className="block text-sm font-semibold text-gray-700 mb-3">Vehicle Type</label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { value: "car", label: "UberGo", icon: car },
                { value: "auto", label: "Auto", icon: auto },
                { value: "moto", label: "Moto ", icon: moto }
              ].map((vehicle) => (
                <div key={vehicle.value} className="relative">
                  <input
                    type="radio"
                    id={vehicle.value}
                    name="vehicleType"
                    value={vehicle.value}
                    checked={input.vehicleType === vehicle.value}
                    onChange={(e) => {
                      // Auto-set capacity based on vehicle type
                      let newCapacity = input.capacity;
                      if (e.target.value === "moto") {
                        newCapacity = 1; // Lock to 1 for moto
                      } else if (e.target.value === "auto" && input.capacity > 3) {
                        newCapacity = 3; // Max 3 for auto
                      }

                      setInput({
                        ...input,
                        vehicleType: e.target.value as "car" | "auto" | "moto",
                        capacity: newCapacity
                      });
                    }}
                    className="sr-only peer"
                  />
                  <label
                    htmlFor={vehicle.value}
                    className="flex flex-col items-center justify-center p-4 bg-gray-50 border-2 border-gray-200 rounded-lg cursor-pointer hover:bg-gray-100 peer-checked:border-green-500 peer-checked:bg-green-50 peer-checked:text-green-700 transition-all duration-200"
                  >
                    <img src={vehicle.icon} className="h-10 w-10 object-cover"/>
                    <span className="text-sm font-medium">{vehicle.label}</span>
                  </label>
                </div>
              ))}
            </div>
            {error.vehicleType && (
              <span className="text-red-500 text-sm mt-2 block">{error.vehicleType}</span>
            )}
          </div>

          {/* Vehicle Details */}
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Vehicle Color */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-700">Vehicle Color</label>
              <div className="relative">
                <input
                  className="bg-white px-4 py-3 w-full border-2 border-gray-200 text-base placeholder:text-gray-400 rounded-lg focus:border-green-500 focus:outline-none transition-colors duration-200"
                  onChange={changeHandler}
                  type="text"
                  name="color"
                  value={input.color}
                  required
                  placeholder="e.g., Red, Blue, White"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <span className="text-gray-400">🎨</span>
                </div>
              </div>
              {error.color && (
                <span className="text-red-500 text-sm">{error.color}</span>
              )}
            </div>

            {/* Number Plate */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-700">Number Plate</label>
              <div className="relative">
                <input
                  className="bg-white px-4 py-3 w-full border-2 border-gray-200 text-base placeholder:text-gray-400 rounded-lg focus:border-green-500 focus:outline-none transition-colors duration-200 uppercase"
                  onChange={changeHandler}
                  type="text"
                  name="NumberPlate"
                  value={input.NumberPlate}
                  required
                  placeholder="e.g., DL01AB1234"
                  style={{ textTransform: 'uppercase' }}
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <span className="text-gray-400">🔢</span>
                </div>
              </div>
              {error.NumberPlate && (
                <span className="text-red-500 text-sm">{error.NumberPlate}</span>
              )}
            </div>
          </div>

          {/* Capacity Selection */}
          <div className="w-full">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Passenger Capacity
              {input.vehicleType === "moto" && (
                <span className="text-xs text-gray-500 ml-2">(Fixed for bikes)</span>
              )}
              {input.vehicleType === "auto" && (
                <span className="text-xs text-gray-500 ml-2">(Max 3 for auto)</span>
              )}
            </label>

            <div className="grid grid-cols-4 gap-3">
              {(() => {
                // Define capacity options based on vehicle type
                let capacityOptions: number[] = [];

                switch (input.vehicleType) {
                  case "moto":
                    capacityOptions = [1]; // Only 1 for moto
                    break;
                  case "auto":
                    capacityOptions = [1, 2, 3]; // Max 3 for auto
                    break;
                  case "car":
                    capacityOptions = [1, 2, 4, 6]; // Standard options for car
                    break;
                  default:
                    capacityOptions = [1, 2, 4, 6];
                }

                return capacityOptions.map((capacity) => (
                  <div key={capacity} className="relative">
                    <input
                      type="radio"
                      id={`capacity-${capacity}`}
                      name="capacity"
                      value={capacity}
                      checked={input.capacity === capacity}
                      onChange={(e) => {
                        setInput({
                          ...input,
                          capacity: parseInt(e.target.value)
                        });
                      }}
                      disabled={input.vehicleType === "moto" && capacity !== 1}
                      className="sr-only peer"
                    />
                    <label
                      htmlFor={`capacity-${capacity}`}
                      className={`flex flex-col items-center justify-center p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${input.vehicleType === "moto" && capacity !== 1
                          ? 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed'
                          : 'bg-gray-50 border-gray-200 hover:bg-gray-100 peer-checked:border-green-500 peer-checked:bg-green-50 peer-checked:text-green-700'
                        }`}
                    >
                      <span className="text-lg font-bold mb-1">{capacity}</span>
                      <span className="text-xs text-gray-600">
                        {capacity === 1 ? 'Passenger' : 'Passengers'}
                      </span>
                    </label>
                  </div>
                ));
              })()}
            </div>

            {error.capacity && (
              <span className="text-red-500 text-sm mt-2 block">{error.capacity}</span>
            )}

            {/* Helper text */}
            <div className="mt-2 text-xs text-gray-500">
              {input.vehicleType === "moto" && " moto can only carry 1 passenger"}
              {input.vehicleType === "auto" && " Auto-rickshaws can carry up to 3 passengers"}
              {input.vehicleType === "car" && " UberGo can carry multiple passengers"}
            </div>
          </div>
        </div>


        <button
          disabled={loading}
          className="bg-green-600 rounded-full font-semibold mb-7 px-4 py-2 border w-full text-white disabled:opacity-50"
          type="submit"
        >
          {loading ? "Creating Account..." : "Signup As Captain"}
        </button>

        <p className="text-sm text-center font-medium">
          Already have an account?
          <Link to={"/captain-signin"}>
            <span className="text-blue-600"> signin</span>
          </Link>
        </p>
      </form>

      <Link
        to={"/signup"}
        className="bg-black max-w-xl mx-auto rounded-full text-center font-semibold mb-7 px-4 py-2 border w-full text-white "
      >
        Sign up as User
      </Link>
    </div>
  );
};

export default CaptainSignup;