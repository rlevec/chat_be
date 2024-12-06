import { Router } from "express";

import {
  handleChangeUsernameGetRequestAction,
  handleChangeUsernamePutRequestAction,
} from "../../controllers/change_username/index.js";

export default (io) => {
  const router = Router();

  // Example GET request
  // Example GET request
  router.get("/", (req, res, next) =>
    handleChangeUsernameGetRequestAction(req, res, next)
  );

  router.put("/", (req, res, next) =>
    handleChangeUsernamePutRequestAction(req, res, next, io)
  );

  // Export the router
  return router;
};
