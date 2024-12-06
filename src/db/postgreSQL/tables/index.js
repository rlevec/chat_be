import { formDataModel, userModel, contactListModel, messageModel, conversationModel } from "../models/index.js"


export const tables = [
    {
        id: 1,
        key: "form_data",
        model: formDataModel,
        name: "form_data"
    }, 
    {
        id: 1,
        key: "users",
        model: userModel,
        name: "users"
    },
    {
        id: 2,
        key: "contact_list",
        model: contactListModel,
        name: "contact_list"
    },
    {
        id: 3,
        key: "conversations",
        model: conversationModel,
        name: "conversations"
    },
    {
        id: 3,
        key: "messages",
        model: messageModel,
        name: "messages"
    }
]