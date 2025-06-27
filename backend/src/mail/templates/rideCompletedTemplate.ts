const rideCompletedTemplate = (rideDetails: {
  riderName: string;
  driverName: string;
  vehicleType: string;
  pickupLocation: string;
  dropoffLocation: string;
  fare: number;
  distance: number;
  duration: number;
}): string => {
  return `<!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>Ride Completed - UrbanRyde</title>
        <style>
            body {
                background-color: #f5f5f5;
                font-family: Arial, sans-serif;
                font-size: 14px;
                line-height: 1.4;
                color: #333333;
                margin: 0;
                padding: 0;
            }
    
            .container {
                max-width: 500px;
                margin: 20px auto;
                padding: 15px;
                background-color: #ffffff;
                border-radius: 6px;
                box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
            }
    
            .header {
                text-align: center;
                padding-bottom: 15px;
                border-bottom: 1px solid #eee;
                margin-bottom: 20px;
            }
    
            .logo {
                font-size: 20px;
                font-weight: bold;
                color: #000000;
                margin-bottom: 5px;
            }
    
            .tagline {
                font-size: 12px;
                color: #666666;
                margin: 0;
            }
    
            .message {
                font-size: 16px;
                font-weight: 600;
                margin-bottom: 15px;
                color: #333333;
                text-align: center;
            }
    
            .body {
                font-size: 14px;
                margin-bottom: 15px;
                color: #333333;
            }
    
            .ride-summary {
                background-color: #f8f8f8;
                padding: 15px;
                border-radius: 6px;
                margin: 15px 0;
            }
    
            .summary-title {
                margin: 0 0 15px 0;
                font-size: 16px;
                font-weight: 600;
                color: #333333;
            }
    
            .location {
                background-color: #ffffff;
                padding: 10px;
                border-radius: 4px;
                margin: 8px 0;
                font-size: 13px;
                border-left: 3px solid #000;
            }
    
            .pickup {
                border-left-color: #22c55e;
            }
    
            .dropoff {
                border-left-color: #ef4444;
            }
    
            .fare-highlight {
                text-align: center;
                font-size: 18px;
                font-weight: bold;
                color: #000000;
                background-color: #ffffff;
                padding: 10px;
                border-radius: 4px;
                margin: 15px 0;
                border: 1px solid #ddd;
            }
            .detail-row {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 12px 0;
                border-bottom: 1px solid #eee;
                font-size: 13px;
                margin-bottom: 4px;
            }

            .detail-row:last-child {
                border-bottom: none;
                margin-bottom: 0;
            }

            .detail-label {
                color: #666666;
                font-weight: 600;
                text-transform: uppercase;
                letter-spacing: 0.5px;
                font-size: 11px;
                flex: 1;
            }

            .detail-value {
                color: #333333;
                font-weight: 500;
                text-align: right;
                flex: 1;
            }

            .details-container {
                background-color: #ffffff;
                border-radius: 4px;
                padding: 8px;
                margin-top: 10px;
            }

           
            .rating-section {
                background-color: #f8f8f8;
                padding: 15px;
                border-radius: 6px;
                margin-top: 15px;
                text-align: center;
                font-size: 13px;
                color: #666666;
            }
    
            .footer {
                font-size: 12px;
                color: #666666;
                text-align: center;
                margin-top: 20px;
                padding-top: 15px;
                border-top: 1px solid #eee;
            }
    
            .support-link {
                color: #000000;
                text-decoration: none;
            }
    
            .disclaimer {
                font-size: 11px;
                color: #999999;
                margin-top: 15px;
            }
        </style>
    </head>
    
    <body>
        <div class="container">
            <div class="header">
                <div class="logo">UrbanRyde</div>
                <p class="tagline">Your ride, your way</p>
            </div>
            
            <div class="message">Ride Completed Successfully! ✅</div>
            
            <div class="body">
                <p>Hi ${rideDetails.riderName},</p>
                <p>Thank you for choosing UrbanRyde! Your ride has been completed successfully.</p>
            </div>
            
            <div class="ride-summary">
                <h3 class="summary-title">Trip Summary</h3>
                
                <div class="location pickup">
                    <strong>🟢 Pickup:</strong> ${rideDetails.pickupLocation}
                </div>
                
                <div class="location dropoff">
                    <strong>🔴 Dropoff:</strong> ${rideDetails.dropoffLocation}
                </div>
                
                <div class="fare-highlight">
                    Total Fare: ₹${rideDetails.fare}
                </div>
                
               
            </div>
            
            <div class="rating-section">
                <p><strong>How was your ride?</strong></p>
                <p>Your feedback helps us improve our service. Rate your experience in the UrbanRyde app.</p>
            </div>
            
            <div class="footer">
                <p>Need help with this trip? Contact our support team at 
                <a href="mailto:support@urbanryde.com" class="support-link">support@urbanryde.com</a></p>
                <p>Thanks for riding with UrbanRyde!</p>
                <p class="disclaimer">
                    This is an automated email. Please do not reply to this message.
                </p>
            </div>
        </div>
    </body>
    </html>`;
};

export { rideCompletedTemplate };
