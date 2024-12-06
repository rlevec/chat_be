import {handleUpdateReadStatusAction} from "./utils/update_read_status/index.js"

import { handleBroadcastToSingleUserAction } from "../../../../broadcast/single_user/index.js";

export const handleReadStatusAction = async(io, data, userData) => {
    const { id: senderId } = userData || {};
    const { receiverId, messageId } = data || {};

    if (receiverId && senderId && messageId) {
        const updateReadStatusResponse = await handleUpdateReadStatusAction(messageId);

        const { error, success, data: readStatusResponseData } = updateReadStatusResponse || {};

     



        if (error) {
            console.error("Error updating read status", error);
        } else {
            const event = "read_status_update";
            const message = {
                success,
                data: readStatusResponseData,
            };

            // Ensure to broadcast to both sender and receiver only once
            if (senderId) {
                await handleBroadcastToSingleUserAction(io, senderId, message, event);
            }
            if (receiverId) {
                await handleBroadcastToSingleUserAction(io, receiverId, message, event);
            }
        }
    }
};
