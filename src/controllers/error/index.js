import { pool } from "../../config/postgreSQL/index.js";
import { handleGetFormDataAction } from "../../services/form_data/index.js";


export const handleErrorGetRequestAction = async (req, res, next) => {
  const client = await pool.connect();

  try {
    const result = await handleGetFormDataAction(client, "error");

    return res.status(result?.status).json(result); 

  } catch (error) {
    console.error("Error fetching error form data:", error);
    return next(error);
  } finally {
    client.release();
  }
};
