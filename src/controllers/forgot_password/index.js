import { pool } from "../../config/postgreSQL/index.js";
import { handleGetFormDataAction } from "../../services/form_data/index.js";
import { handleForgotPasswordAction } from "../../services/forgot_password/index.js";

// Handle GET request for login form data
export const handleForgotPasswordGetRequestAction = async (req, res, next) => {
  console.log("forgot_password_get_request_hit");
  const client = await pool.connect();

  try {
    const result = await handleGetFormDataAction(client, "forgot_password");
    return res.status(result?.status).json(result); // Send JSON response with status
  } catch (error) {
    console.error("Error fetching forgot password form data:", error); // Log error for debugging
    return next(error); // Pass error to Express error handler
  } finally {
    client.release(); // Ensure client is always released
  }
};

// Handle POST request for login
export const handleForgotPasswordPostRequestAction = async (req, res, next) => {
  const { body } = req; // Destructure body from request
  const client = await pool.connect();

  try {
    const result = await handleForgotPasswordAction(client, body);
    return res.status(result?.status).json(result); // Send JSON response with status
  } catch (error) {
    console.error("Error during forgot password action:", error); // Log error for debugging
    return next(error); // Pass error to Express error handler
  } finally {
    client.release(); // Ensure client is always released
  }
};
