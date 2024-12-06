// Emit a message to all users except the sender
export const handleBrodcastToAllExceptSenderAction = (socket, event, message) => {
    socket.broadcast.emit(event, message);
  }
  