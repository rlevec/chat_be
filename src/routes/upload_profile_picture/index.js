
import { Router } from "express";

import {handleUploadProfilePictureGetRequestAction, handleUploadProfilePicturePostRequestAction} from "../../controllers/upload_profile_picture/index.js"



export default (io) => {
  const router = Router();

  // Example GET request
  router.get('/', (req, res, next) => handleUploadProfilePictureGetRequestAction(req, res, next));

  router.post('/', (req, res, next) => handleUploadProfilePicturePostRequestAction(req, res, next, io));

  // Export the router
  return router;
};
