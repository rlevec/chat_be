import { handleSendMessageAction } from "./utils/send_message/index.js"
import { handleGetConversationMessagesAction } from "./utils/get_conversation_messages/index.js"
import { handleEditMessageAction } from "./utils/edit_message/index.js"
import { handleRemoveMessageAction } from "./utils/remove_message/index.js"
import { handleUserTypingStatusAction } from "../contact/utils/user_typing_status/index.js"
import { handleReadStatusAction } from "./utils/read_status/index.js"

export const handleMessageEventsAction = async(io, socket, userData) => {
    socket.on("send_message", async(data) => {
       
        await handleSendMessageAction(io, data, userData)
    })

    socket.on("get_conversation_messages", async(data) => {
  
         await handleGetConversationMessagesAction(io, data, userData)
    })


    socket.on("remove_message", async(data) => {
        await handleRemoveMessageAction(io, data, userData)
    })

    socket.on("edit_message", async(data) => {
       
        await handleEditMessageAction(io, data, userData)
    })

    socket.on("user_typing_status", async(data) => {
        await handleUserTypingStatusAction(io, data, userData)
    });

    socket.on("read_status", async(data) => {
        await handleReadStatusAction(io, data, userData)
    })
}