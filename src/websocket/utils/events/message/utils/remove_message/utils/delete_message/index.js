import { pool } from "../../../../../../../../config/postgreSQL/index.js";

export const handleDeleteMessageAction = async (messageId) => {
    const client = await pool.connect();

    try {
        const deleteMessageQuery = `
        DELETE FROM messages WHERE id = $1
        RETURNING messages.*, 
                  (SELECT username FROM users WHERE id = messages.sender_id) AS username,
  (SELECT profile_picture FROM users WHERE id = messages.sender_id) AS profile_picture;
    `;

        const deleteMessageQueryResponse = await client.query(deleteMessageQuery, [messageId]);

        const message = deleteMessageQueryResponse?.rows[0];

        if (message) {
            return {
                success: true,
                data: message, 
            };
        } else {
            return {
                error: true,
                message: "No rows were removed",
            };
        }
    } catch (error) {
        console.error("Error removing message:", error);
        return {
            error: true,
            message: error.message,
        };
    } finally {
        client.release();
    }
};
