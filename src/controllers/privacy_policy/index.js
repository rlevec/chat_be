import { pool } from "../../config/postgreSQL/index.js";
import { handleGetFormDataAction } from "../../services/form_data/index.js";

// Handle GET request for terms of use  data
export const handlePrivacyPolicyGetRequestAction = async (req, res, next) => {
  console.log("privacy_policy_get_request_hit");
  const client = await pool.connect();

  try {
    const result = await handleGetFormDataAction(client, "privacy_policy");
    return res.status(result?.status).json(result); // Send JSON response with status
  } catch (error) {
    console.error("Error fetching privacy policy form data:", error); // Log error for debugging
    return next(error); // Pass error to Express error handler
  } finally {
    client.release(); // Ensure client is always released
  }
};


