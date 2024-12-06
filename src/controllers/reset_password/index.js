import { pool } from "../../config/postgreSQL/index.js";
import { handleGetFormDataAction } from "../../services/form_data/index.js";
import { handleResetPasswordAction } from "../../services/reset_password/index.js";

// Handle GET request for login form data
export const handleResetPasswordGetRequestAction = async (req, res, next) => {
  console.log("reset_password_get_request_hit");
  const client = await pool.connect();

  try {
    const result = await handleGetFormDataAction(client, "reset_password");
    return res.status(result?.status).json(result); // Send JSON response with status
  } catch (error) {
    console.error("Error fetching reset password form data:", error); // Log error for debugging
    return next(error); // Pass error to Express error handler
  } finally {
    client.release(); // Ensure client is always released
  }
};

// Handle POST request for login
export const handleResetPasswordPutRequestAction = async (req, res, next) => {
  console.log("reset_password_out_request_hit");
  const { body } = req; // Destructure body from request
  const query = req.query;
  const client = await pool.connect();

  try {
    const result = await handleResetPasswordAction(client, query, body);
    return res.status(result?.status).json(result); // Send JSON response with status
  } catch (error) {
    console.error("Error during reset password action:", error); // Log error for debugging
    return next(error); // Pass error to Express error handler
  } finally {
    client.release(); // Ensure client is always released
  }
};
