import { pool } from "../../../../../../../../config/postgreSQL/index.js";

export const handleUpdateMessageAction = async (messageContent, messageId) => {
    const client = await pool.connect();

    try {
        const updateMessageQuery = `
        UPDATE messages
        SET content = $1,
            updated_at = CURRENT_TIMESTAMP
        WHERE id = $2
        RETURNING messages.*, 
                  (SELECT username FROM users WHERE id = messages.sender_id) AS username,
                 (SELECT profile_picture FROM users WHERE id = messages.sender_id) AS profile_picture;
    `;

        const updateMessageQueryResponse = await client.query(updateMessageQuery, [messageContent, messageId]);

        const message = updateMessageQueryResponse?.rows[0];

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
        console.error("Error updating message:", error);
        return {
            error: true,
            message: error.message,
        };
    } finally {
        client.release();
    }
};
