export const templateEmail = ({otp} ={}) => {
    return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>OTP Verification</title>
  </head>
  <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">
    <div style="max-width: 600px; margin: 40px auto; background-color: #ffffff; padding: 30px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
      <h2 style="color: #333333; margin-top: 0;">Your OTP Code</h2>
      <p style="font-size: 16px; color: #444;">Hello,</p>
      <p style="font-size: 16px; color: #444;">Use the OTP code below to complete your verification:</p>

      <div style="font-size: 32px; font-weight: bold; color: #2b2b2b; letter-spacing: 5px; margin: 20px 0;">${otp}</div>

      <p style="font-size: 14px; color: #444;">This code will expire in 10 minutes. Do not share it with anyone.</p>

      <div style="font-size: 12px; color: #999999; margin-top: 30px; text-align: center;">
        If you did not request this code, please ignore this email.
      </div>
    </div>
  </body>
</html>
`;
}
// Compare this snippet from src/utils/index.js: