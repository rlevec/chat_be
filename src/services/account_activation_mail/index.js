import nodemailer from 'nodemailer';

import { handleThrowNewErrorAction } from '../../utils/index.js';

import { config } from '../../config/default/index.js';
import { nodemailerConfig } from '../../config/nodemailer/index.js';

// Function to send the account activation email
export const handleSendAccountActivationEmailAction = async (email, activationToken) => {
  // Construct the activation URL
  const activationUrl = `${config?.feUrl}/${nodemailerConfig?.accountActivationRoute}/${activationToken}`;

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
    subject: 'Activate Your Account',
    text: `Dear ${email},\n\nThank you for signing up on our Chat App! We're excited to have you on board.\n\nTo activate your account, click the link below:\n\n${activationUrl}\n\nIf the link doesn't work, copy and paste this into your browser: ${activationUrl}\n\nBest regards,\nLaas Deven`,
  };

  // Try sending the email

    const info = await transporter.sendMail(mailOptions);

    // Check if the email was accepted by the recipient's server
    if (info?.accepted?.length) {
      return {
        status: 200,
        success: true,
        redirect: "/login",
        message: "Activation email sent",
      };
    }

    handleThrowNewErrorAction(500, "Unable to send activation email")
    
};
