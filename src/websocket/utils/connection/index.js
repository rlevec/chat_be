import { handleGetUserByIdAction } from "../psql/get_user_by_id/index.js";
import { handleSetDataToRedisAction } from "../redis/set_data_to_redis/index.js";
import { handleBrodcastToAllExceptSenderAction } from "../broadcast/all_except_sender/index.js";

import { handleValidateSessionAction } from "../validate_session/index.js";

import { handleBroadcastToAllUsersAction } from "../broadcast/all_users/index.js";

import { handleGetAllDataFromRedis } from "../redis/get_all_data_from_redis/index.js";

import { handleBroadcastToSingleUserAction } from "../broadcast/single_user/index.js";

export const handleConnectionAction = async (io, socket) => {
  const sessionId = await handleValidateSessionAction(socket);
  const userId = sessionId?.userId;

  if (userId) {
    socket.user_id = userId;

    const response = await handleGetUserByIdAction(userId);

    if (response?.success && response?.data) {
      const userData = {
        socket_id: socket.id,
        id: userId,
        username: response?.data?.username,
      };

      const [
        userStorageResponse,
        socketStorageResponse,
        allUserStorageResponse,
      ] = await Promise.all([
        handleSetDataToRedisAction(`user:${userId}`, userData),
        handleSetDataToRedisAction(`user:${userId}:socketId`, socket.id),
        handleGetAllDataFromRedis(),
      ]);

      if (
        userStorageResponse?.error ||
        socketStorageResponse?.error ||
        allUserStorageResponse?.error
      )
        return (
          userStorageResponse || socketStorageResponse || allUserStorageResponse
        );

   

      handleBrodcastToAllExceptSenderAction(socket, "user_connected", {
        success: true,
        message: `${userData?.username} connected`,
      });
      handleBroadcastToSingleUserAction(
        io,
        userId,
        { success: true, message: "Connection successful" },
        "connection_feedback"
      );
      handleBroadcastToAllUsersAction(io, "online_users", {
        success: true,
        message: "Online users",
        data: allUserStorageResponse?.data,
      });

      return {
        success: true,
        message: "Successfully connected and notified other users!",
        data: userData,
      };
    }

    return response; 
  } else return { error: true, message: "User not authenticated." }; 
};
