import { handleSendContactRequestAction } from "./utils/send_contact_request/index.js"

import { handleGetContactListAction } from "./utils/get_contact_list/index.js"

import { handleAcceptContactAction } from "./utils/accept_contact/index.js"

import { handleBlockContactAction } from "./utils/block_contact/index.js"

import { handleUnblockContactAction } from "./utils/unblock_contact/index.js"

import { handleDeclineContactAction } from "./utils/decline_contact/index.js"

import { handleDeleteContactAction } from "./utils/delete_contact/index.js"

export const handleContactEventsAction = async(io, socket, userData) => {
   
    socket.on("send_contact_request", async(data) => {
        await handleSendContactRequestAction(io, data, userData)
    })

    socket.on("get_contact_list", async() => {
        await handleGetContactListAction(io, userData)
    })

    socket.on("accept_contact", async(data) => {
       await handleAcceptContactAction(io, userData, data?.contactUsername)
    })

    socket.on("decline_contact", async(data) => {
        await handleDeclineContactAction(io, userData, data?.contactUsername)
     })

     socket.on("delete_contact", async(data) => {
        await handleDeleteContactAction(io, userData, data?.contactUsername)
     })

    socket.on("block_contact", async(data) => {
        handleBlockContactAction(io, userData, data?.contactUsername)
    })

    socket.on("unblock_contact", async(data) => {
        handleUnblockContactAction(io, userData, data?.contactUsername)
    })
}