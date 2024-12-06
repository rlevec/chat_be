import { pool } from "../../../../../../../../config/postgreSQL/index.js";

export const handleCreateMessageAction = async (conversationId, senderId, receiverId, messageContent) => {
    const client = await pool.connect();
    
    try {
        const createMessageQuery = `
        INSERT INTO messages (sender_id, receiver_id, conversation_id, content) 
        VALUES ($1, $2, $3, $4)
        RETURNING messages.*, 
           (SELECT username FROM users WHERE id = messages.sender_id) AS username,
           (SELECT profile_picture FROM users WHERE id = messages.sender_id) AS profile_picture;
    `;

        const createMessageQueryResponse = await client.query(createMessageQuery, [senderId, receiverId, conversationId, messageContent]);

        const message = createMessageQueryResponse?.rows[0];


        if (message) {
            return {
                success: true,
                data: message
            };
        } else {
            return {
                error: true,
            };
        }
    } catch (error) {
        console.error("Error creating message:", error);
        return {
            error: true,
            message: error.message
        };
    } finally {
        client.release();
    }
};
