import { handleGetFormDataAction } from "../../services/form_data/index.js";
import { handleResendAccountActivationEmailAction } from "../../services/resend_account_activation_email/index.js";
import { pool } from "../../config/postgreSQL/index.js";

// Handle GET request for account activation form data
export const handleResendAccountActivationEmailGetRequestAction = async (req, res, next) => {
  const client = await pool.connect();

  try {
    const result = await handleGetFormDataAction(client, "resend_account_activation_email");

    return res.status(result?.status).json(result);
  } catch (error) {
    return next(error); // Pass error to Express error handler
  } finally {
    client.release(); // Ensure client is always released
  }
};


// Handler for POST request on registration
export const handleResendAccountActivationEmailPostRequestAction = async (req, res, next) => {
  const { body } = req; // Destructure body from req
  const client = await pool.connect();

  try {
    const result = await handleResendAccountActivationEmailAction(client, body);

    // Directly respond with the status and message from the service
    console.log("result", result)
    return res.status(result.status).json(result);
  } catch (error) {
    console.error("Error handling resend account activation POST request:", error);
    next(error); // Pass error to the next middleware
  } finally {
    client.release();
  }
};
