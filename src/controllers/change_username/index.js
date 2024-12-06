import { pool } from "../../config/postgreSQL/index.js";
import { handleGetFormDataAction } from "../../services/form_data/index.js";
import {handleChangeUsernameAction} from "../../services/change_username/index.js"


export const handleChangeUsernameGetRequestAction = async (req, res, next) => {
 
  const client = await pool.connect();

  try {
    const result = await handleGetFormDataAction(client, "change_username");

    
    return res.status(result.status).json(result);
  } catch (error) {
    console.error("Error handling change username GET request:", error);
    next(error); 
  } finally {
    client.release();
  }
};

export const handleChangeUsernamePutRequestAction = async (req, res, next, io) => {
  const { body, query } = req; // Destructure body from request

  const client = await pool.connect();

  try {
    const result = await handleChangeUsernameAction(client, query, body, io);
    return res.status(result?.status).json(result); 
  } catch (error) {
    console.error("Error during update username action", error);
    return next(error); 
  } finally {
    client.release(); 
  }
};
