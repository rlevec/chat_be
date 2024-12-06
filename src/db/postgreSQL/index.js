import { pool } from "../../config/postgreSQL/index.js";
import { handleCheckAndCreateTablesAction } from "./utils/index.js";
import { handleThrowNewErrorAction } from "../../utils/index.js";

const handlePostgreSQLClientAction = async () => {
  const client = await pool.connect();

  try {
    const result = await client.query('SELECT NOW()');

    const psqlQueryResponseValid = !!result?.rows?.[0]?.now;
    if (psqlQueryResponseValid) {
      console.log("PostgreSQL client connected.");
      await handleCheckAndCreateTablesAction(client);

      return {
        success: true,
        message: "PostgreSQL client connected"
      }
    } else {
      handleThrowNewErrorAction(500, "Failed to connect to the PostgreSQL client.")
    }
  } catch (err) {
    console.log("Failed to connect to the PostgreSQL client", err)
    handleThrowNewErrorAction(500, "Failed to connect to the PostgreSQL client.")
  } finally {
    client.release();
  }
};

export { handlePostgreSQLClientAction };
