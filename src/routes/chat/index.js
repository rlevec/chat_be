
import { Router } from "express";


import { handleChatGetRequestAction } from "../../controllers/chat/index.js";

// Create a new router instance
const router = Router();

// Example GET request
router.get('/', (req, res, next) => handleChatGetRequestAction(req, res, next));


// Export the router
export default router;
