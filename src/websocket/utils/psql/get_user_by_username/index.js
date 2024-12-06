import { pool } from "../../../../config/postgreSQL/index.js";

export const handleGetUserByUsernameAction = async(username) => {
  

    const client = await pool.connect();
  
    try {
      const query = `SELECT * FROM users WHERE username = $1`;
  
      const response = await client.query(query, [username]);
  
      const user = response?.rows?.[0] || null
    
      if(user) {
        return {
          success: true,
           code: 200,
           message: "User found",
           data: user
        }
      } else {
        return {
          error: true,
          code: 404,
          message: "User not found",
        }
      }
    } catch(error) {
      console.log("error", error)
      return {
         error: true,
         code : 500,
         message: "User not found",
     }
    } finally {
      client.release()
    }
  }
  