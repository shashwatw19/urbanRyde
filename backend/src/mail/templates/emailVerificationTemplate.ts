const emailVerificationTemplate = (otp: number): string => {
    return `<!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>Verify Your UrbanRyde Account</title>
        <style>
            body {
                background-color: #f5f5f5;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
                font-size: 16px;
                line-height: 1.5;
                color: #1a1a1a;
                margin: 0;
                padding: 0;
            }
    
            .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #ffffff;
                border-radius: 8px;
                margin-top: 20px;
                margin-bottom: 20px;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            }
    
            .header {
                text-align: center;
                padding-bottom: 30px;
                border-bottom: 1px solid #e5e5e5;
                margin-bottom: 30px;
            }
    
            .logo {
                font-size: 32px;
                font-weight: bold;
                color: #000000;
                margin-bottom: 10px;
            }
    
            .message {
                font-size: 24px;
                font-weight: 600;
                margin-bottom: 20px;
                color: #1a1a1a;
                text-align: center;
            }
    
            .body {
                font-size: 16px;
                margin-bottom: 30px;
                color: #333333;
                text-align: center;
            }
    
            .otp-container {
                text-align: center;
                margin: 30px 0;
            }
    
            .highlight {
                font-weight: bold;
                color: #000000;
                font-size: 36px;
                padding: 20px 30px;
                border: 2px solid #000000;
                display: inline-block;
                border-radius: 8px;
                background-color: #f8f8f8;
                letter-spacing: 4px;
                font-family: 'Courier New', monospace;
            }
    
            .footer {
                font-size: 14px;
                color: #666666;
                text-align: center;
                margin-top: 40px;
                padding-top: 20px;
                border-top: 1px solid #e5e5e5;
            }
    
            .support-link {
                color: #000000;
                text-decoration: underline;
            }
    
            .app-info {
                background-color: #f8f8f8;
                padding: 20px;
                border-radius: 8px;
                margin-top: 20px;
                text-align: center;
                font-size: 14px;
                color: #666666;
            }
        </style>
    </head>
    
    <body>
        <div class="container">
            <div class="header">
                <div class="logo">UrbanRyde</div>
                <p style="color: #666666; margin: 0;">Your ride, your way</p>
            </div>
            
            <div class="message">Verify your account </div>
            
            <div class="body">
                <p>Welcome to UrbanRyde!</p>
                <p>You're just one step away from booking your first ride. Please verify your account using the code below:</p>
            </div>
            
            <div class="otp-container">
                <div class="highlight">${otp}</div>
            </div>
            
            <div class="body">
                <p><strong>This verification code expires in 5 minutes.</strong></p>
                <p>If you didn't create an UrbanRyde account, you can safely ignore this email.</p>
            </div>
            
            <div class="app-info">
                <p><strong>Ready to ride?</strong></p>
                <p>Once verified, you can book rides, track your driver in real-time, and enjoy safe, reliable transportation.</p>
            </div>
            
            <div class="footer">
                <p>Need help? Contact our support team at 
                <a href="mailto:support@urbanryde.com" class="support-link">support@urbanryde.com</a></p>
                <p>Thanks for choosing UrbanRyde!</p>
            </div>
        </div>
    </body>
    </html>`;
}

export { emailVerificationTemplate };