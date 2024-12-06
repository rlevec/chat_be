import { handleBroadcastToSingleUserAction } from "../../../../broadcast/single_user/index.js"

export const handleUserTypingStatusAction = async(io, data, userData) => {
   
    const {
        conversationParticipants,
        typing
    } = data || {}

    const {
        id,
    } = userData || {}

    const sender = conversationParticipants?.find((participant) => participant.id === id)
    const receiver = conversationParticipants?.find((participant) => participant.id !== id)

    const senderId = sender?.id
    const senderUsername = sender?.username
    const receiverId = receiver?.id

     if(receiverId && senderId) {
        const event = "user_typing_status"
        const message = `${senderUsername} is typing...`
        const broadcastObject = {
          message,
          isTyping: typing
        }
        await handleBroadcastToSingleUserAction(
            io,
            receiverId,
            broadcastObject,
            event
          );
     }
}