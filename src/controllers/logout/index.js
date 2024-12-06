import { pool } from "../../config/postgreSQL/index.js";
import { handleLogoutAction } from "../../services/logout/index.js";


export const handleLogoutPostRequestAction = async (req, res, next) => {
  const { body } = req; // Destructure body from req
  const client = await pool.connect();

  try {
    const result = await handleLogoutAction(req, res);

    // Directly respond with the status and message from the service
    return res.status(result.status).json(result);
  } catch (error) {
    console.error("Error handling logout POST request:", error);
    next(error); // Pass error to the next middleware
  } finally {
    client.release();
  }
};
