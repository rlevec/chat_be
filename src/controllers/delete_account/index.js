import { pool } from "../../config/postgreSQL/index.js";
import { handleGetFormDataAction } from "../../services/form_data/index.js";
import { handleDeleteAccountAction } from "../../services/delete_account/index.js";


export const handleDeleteAccountGetRequestAction = async (req, res, next) => {
 
  const client = await pool.connect();

  try {
    const result = await handleGetFormDataAction(client, "delete_account");

    // Directly respond with the status and message from the service
    return res.status(result.status).json(result);
  } catch (error) {
    console.error("Error handling delete account GET request:", error);
    next(error); // Pass error to the next middleware
  } finally {
    client.release();
  }
};

export const handleDeleteAccountDeleteRequestAction = async (req, res, next, io) => {
  const {query } = req; // Destructure body from request

  const client = await pool.connect();

  try {
    const result = await handleDeleteAccountAction(client, query, io);  

    return res.status(result?.status).json(result); // Send JSON response with status
  } catch (error) {
    console.error("Error during delete account action", error); // Log error for debugging
    return next(error); // Pass error to Express error handler
  } finally {
    client.release(); // Ensure client is always released
  }
};
