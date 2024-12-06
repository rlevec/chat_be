import { pool } from "../../config/postgreSQL/index.js";
import { handleGetFormDataAction } from "../../services/form_data/index.js";
import { handleLoginAction } from "../../services/login/index.js";

// Handle GET request for login form data
export const handleLoginGetRequestAction = async (req, res, next) => {
  console.log("login_get_request_hit");
  const client = await pool.connect();

  try {
    const result = await handleGetFormDataAction(client, "login");
    return res.status(result?.status).json(result); // Send JSON response with status
  } catch (error) {
    console.error("Error fetching login form data:", error); // Log error for debugging
    return next(error); // Pass error to Express error handler
  } finally {
    client.release(); // Ensure client is always released
  }
};

// Handle POST request for login
export const handleLoginPostRequestAction = async (req, res, next) => {
  const { body } = req; // Destructure body from request
  const client = await pool.connect();

  try {
    const result = await handleLoginAction(client, body, req);
    console.log("result", result)
    return res.status(result?.status).json(result); // Send JSON response with status
  } catch (error) {
    console.error("Error during login action:", error); // Log error for debugging
    return next(error); // Pass error to Express error handler
  } finally {
    client.release(); // Ensure client is always released
  }
};
