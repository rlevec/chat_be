// Emit a message to all connected users
export const handleBroadcastToAllUsersAction = async (io, event, message) => {
    io.emit(event, message);
  }