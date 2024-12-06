
import {handleContactEventsAction} from "./contact/index.js"

import {handleMessageEventsAction} from "./message/index.js"

export const handleEventsAction = async(io, socket, userData) => {
    //contact events handlers
    handleContactEventsAction(io, socket, userData)
    //message events handlers
    handleMessageEventsAction(io, socket, userData)
}