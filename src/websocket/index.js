
import { handleConnectionAction } from "./utils/connection/index.js";
import { handleEventsAction } from "./utils/events/index.js";
import { handleDisconnectionAction } from "./utils/disconnection/index.js";



// Main WebSocket connection handling
 export const handleWebsocketConnectionsAction = async(io) => {
  io.on('connection', async (socket) => {
    console.log('A user connected:', socket.id);
    
    const connectionResponse = await handleConnectionAction(io, socket);
    
    if (!connectionResponse.success) {
      console.error(connectionResponse.message);
    } else {
       
      const userData = connectionResponse?.data

   
      await handleEventsAction(io, socket, userData)
    }
    
    socket.on('disconnect', async () => {
      await handleDisconnectionAction(io, socket, socket.user_id)    

    });
  });
};
