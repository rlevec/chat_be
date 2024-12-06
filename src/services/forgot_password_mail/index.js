import nodemailer from 'nodemailer';

import { nodemailerConfig } from '../../config/nodemailer/index.js';
import { config } from '../../config/default/index.js';


// Function to send reset password email
export const handleSendForgotPasswordEmailAction = async (email, forgotPasswordToken) => {
  // Construct the activation URL
  const resetPasswordUrl = `${config?.feUrl}/${nodemailerConfig?.resetPasswordRoute}/${forgotPasswordToken}`;

  // Configure the transporter (use environment variables for sensitive information)
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: false,
    port: 587,
    auth: {
     user: nodemailerConfig?.user,
        pass: nodemailerConfig?.pass
    },
  });

  // Set up the email options
  const mailOptions = {
    from: `"Your App" <${nodemailerConfig?.user}>`, // You can configure this in env too
    to: email,
    subject: 'Password Reset Request',
    text: `Hello,\n\nYou are receiving this email because you (or someone else) has requested a password reset.\n\nPlease click on the following link, or paste this into your browser to complete the process:\n\n${resetPasswordUrl}\n\nIf you did not request this, please ignore this email and your password will remain unchanged.\n`,
  };

  // Try sending the email

    const info = await transporter.sendMail(mailOptions);

    // Check if the email was accepted by the recipient's server
    if (info?.accepted?.length) {
      return {
        status: 200,
        success: true,
        redirect: "/login",
        message: "Forgot password email sent",
      };
    }

    handleThrowNewErrorAction(500, "Unable to send forgot password email")
    
};