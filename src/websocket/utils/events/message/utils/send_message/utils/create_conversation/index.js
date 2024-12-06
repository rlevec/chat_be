import { pool } from "../../../../../../../../config/postgreSQL/index.js";

export const handleCreateConversationAction = async (senderId, receiverId) => {
    const client = await pool.connect();
    
    try {
        const createConverstationQuery = `
            INSERT INTO conversations (user1_id, user2_id) 
            VALUES ($1, $2)
            RETURNING *;
        `;

        const createConversationQueryResponse = await client.query(createConverstationQuery, [senderId, receiverId]);

        const conversation = createConversationQueryResponse?.rows[0];


        if (conversation) {
            return {
                success: true,
                data: conversation
            };
        } else {
            return {
                error: true,
            };
        }
    } catch (error) {
        console.error("Error creating conversation:", error);
        return {
            error: true,
            message: error.message
        };
    } finally {
        client.release();
    }
};
