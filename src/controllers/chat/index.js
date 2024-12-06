import { pool } from "../../config/postgreSQL/index.js";
import { handleGetFormDataAction } from "../../services/form_data/index.js";


export const handleChatGetRequestAction = async (req, res, next) => {
  const client = await pool.connect();

  try {
    const result = await handleGetFormDataAction(client, "chat");
    return res.status(result?.status).json(result); // Send JSON response with status
  } catch (error) {
    console.error("Error fetching chat form data:", error); // Log error for debugging
    return next(error); // Pass error to Express error handler
  } finally {
    client.release(); // Ensure client is always released
  }
};
