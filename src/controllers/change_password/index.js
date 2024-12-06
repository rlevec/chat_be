import { pool } from "../../config/postgreSQL/index.js";
import { handleGetFormDataAction } from "../../services/form_data/index.js";

import { handleChangePasswordAction } from "../../services/change_password/index.js";


export const handleChangePasswordGetRequestAction = async (req, res, next) => {

  const client = await pool.connect();

  try {
    const result = await handleGetFormDataAction(client, "change_password");

    // Directly respond with the status and message from the service
    return res.status(result.status).json(result);
  } catch (error) {
    console.error("Error handling change password GET request:", error);
    next(error); // Pass error to the next middleware
  } finally {
    client.release();
  }
};

export const handleChangePasswordPutRequestAction = async (req, res, next) => {
  const { body, query } = req;

  const client = await pool.connect();

  try {
    const result = await handleChangePasswordAction(client, query, body);
    return res.status(result?.status).json(result); // Send JSON response with status
  } catch (error) {
    console.error("Error during update password action", error); // Log error for debugging
    return next(error); // Pass error to Express error handler
  } finally {
    client.release(); // Ensure client is always released
  }
};
