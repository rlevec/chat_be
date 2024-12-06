
import { Router } from "express";

import { handleDeleteAccountGetRequestAction, handleDeleteAccountDeleteRequestAction } from "../../controllers/delete_account/index.js";



export default (io) => {
    const router = Router();

    // Example GET request
    router.get('/', (req, res, next) => handleDeleteAccountGetRequestAction(req, res, next));
    
    
    router.delete('/', (req, res, next) => handleDeleteAccountDeleteRequestAction(req, res, next, io));
    
    // Export the router
  return router;
};
