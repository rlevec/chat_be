
import { Router } from "express";


import { handleLoginGetRequestAction, handleLoginPostRequestAction } from "../../controllers/login/index.js";

// Create a new router instance
const router = Router();

// Example GET request
router.get('/', (req, res, next) => handleLoginGetRequestAction(req, res, next));

// Example POST request
router.post('/', (req, res, next) => handleLoginPostRequestAction(req, res, next));

// Export the router
export default router;
