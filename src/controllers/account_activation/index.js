import { handleGetFormDataAction } from "../../services/form_data/index.js";
import { pool } from "../../config/postgreSQL/index.js";
import { handleAccountActivationStatusAction } from "../../services/account_activation_status/index.js";

// Handle GET request for account activation form data
export const handleAccountActivationGetRequestAction = async (req, res, next) => {

  const client = await pool.connect();

  try {
    const result = await handleGetFormDataAction(client, "account_activation");

    return res.status(result?.status).json(result);
  } catch (error) {
    return next(error); // Pass error to Express error handler
  } finally {
    client.release(); // Ensure client is always released
  }
};

// Handle PUT request for account activation status
export const handleAccountActivationPutRequestAction = async (req, res, next) => {

  const query = req.query;
  const client = await pool.connect();

  try {
    const result = await handleAccountActivationStatusAction(query, client);

    return res.status(result?.status).json(result); // Use status 200 for successful activation
  } catch (error) {
    console.error("Error updating account activation status:", error);
    return next(error); // Pass error to Express error handler
  } finally {
    client.release(); // Ensure client is always released
  }
};
