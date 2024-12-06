import { pool } from "../../../../../../../../config/postgreSQL/index.js";

export const handleUpdateReadStatusAction = async (messageId) => {
    const client = await pool.connect();

    try {
        const updateReadStatusQuery = `
      UPDATE messages
SET is_read = true
WHERE id = $1
   RETURNING messages.*, 
                  (SELECT username FROM users WHERE id = messages.sender_id) AS username,
                 (SELECT profile_picture FROM users WHERE id = messages.sender_id) AS profile_picture;
    `;

        const updateReadStatusQueryResponse = await client.query(updateReadStatusQuery, [messageId]);

        const message = updateReadStatusQueryResponse?.rows[0];

        if (message) {
            return {
                success: true,
                data: message, // This will contain the updated row with all fields
            };
        } else {
            return {
                error: true,
                message: "No rows were updated",
            };
        }
    } catch (error) {
        console.error("Error updating read status:", error);
        return {
            error: true,
            message: error.message,
        };
    } finally {
        client.release();
    }
};
