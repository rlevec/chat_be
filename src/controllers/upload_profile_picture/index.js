import { pool } from "../../config/postgreSQL/index.js";
import { handleGetFormDataAction } from "../../services/form_data/index.js";
import { handleFileUploadAction } from "../../services/file_upload/index.js";

export const handleUploadProfilePictureGetRequestAction = async (req, res, next) => {

  const client = await pool.connect();

  try {
    const result = await handleGetFormDataAction(client, "upload_profile_picture");
    return res.status(result?.status).json(result); // Send JSON response with status
  } catch (error) {
    console.error("Error fetching upload profile picture form data:", error); // Log error for debugging
    return next(error); // Pass error to Express error handler
  } finally {
    client.release(); // Ensure client is always released
  }
};


export const handleUploadProfilePicturePostRequestAction = async (req, res, next, io) => {


    const client = await pool.connect();
  
    try {

      const result = await handleFileUploadAction(client, req, io);
  
      if(result) return res.status(result?.status).json(result);
    } catch (error) {
      console.error("Error handling upload POST request:", error);
      next(error); // Pass error to the next middleware
    } finally {
      client.release();
    }
  };
  