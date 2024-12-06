import { handleRemoveDataFromRedisAction } from "../redis/remove_data_from_redis/index.js";

import { handleBrodcastToAllExceptSenderAction } from "../broadcast/all_except_sender/index.js";

import { handleGetUserByIdAction } from "../psql/get_user_by_id/index.js";
import { handleGetAllDataFromRedis } from "../redis/get_all_data_from_redis/index.js";

import { handleBroadcastToAllUsersAction } from "../broadcast/all_users/index.js";

export const handleDisconnectionAction = async (io, socket, userId) => {
  if (userId) {
    // Remove socketId from Redis

    const { data } = await handleGetUserByIdAction(userId);

    const [userStorageResponse, socketStorageResponse, allUserStorageResponse] =
      await Promise.all([
        handleRemoveDataFromRedisAction(`user:${userId}:socketId`),
        handleRemoveDataFromRedisAction(`user:${userId}`),
        handleGetAllDataFromRedis(),
      ]);

    if (
      userStorageResponse?.error ||
      socketStorageResponse?.error ||
      allUserStorageResponse?.error
    ) {
      return (
        userStorageResponse || socketStorageResponse || allUserStorageResponse
      );
    }

    handleBrodcastToAllExceptSenderAction(socket, "user_disconnected", {
      success: true,
      message: `${data?.username} disconnected`,
      data: { username: data?.username },
    });

    handleBroadcastToAllUsersAction(io, "online_users", {
      success: true,
      message: "Online users",
      data: allUserStorageResponse?.data,
    });

    return {
      success: true,
      message: "Successfully notified the users!",
    };
  
  }
};
