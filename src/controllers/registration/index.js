import { pool } from "../../config/postgreSQL/index.js";
import { handleGetFormDataAction } from "../../services/form_data/index.js";
import { handleRegistrationAction } from "../../services/registration/index.js";

// Handler for GET request on registration
export const handleRegistrationGetRequestAction = async (req, res, next) => {
  console.log("Registration GET request hit");
  const client = await pool.connect();

  try {
    const result = await handleGetFormDataAction(client, "registration");

    // Directly respond with the status and message from the service
    return res.status(result.status).json(result);
  } catch (error) {
    console.error("Error handling registration GET request:", error);
    next(error); // Pass error to the next middleware
  } finally {
    client.release();
  }
};

// Handler for POST request on registration
export const handleRegistrationPostRequestAction = async (req, res, next) => {
  const { body } = req; // Destructure body from req
  const client = await pool.connect();

  try {
    const result = await handleRegistrationAction(client, body);

    // Directly respond with the status and message from the service
    return res.status(result.status).json(result);
  } catch (error) {
    console.error("Error handling registration POST request:", error);
    next(error); // Pass error to the next middleware
  } finally {
    client.release();
  }
};
