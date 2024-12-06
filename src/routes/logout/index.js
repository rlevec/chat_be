
import { Router } from "express";


import { handleLogoutPostRequestAction } from "../../controllers/logout/index.js";

// Create a new router instance
const router = Router();


// Example POST request
router.post('/', (req, res, next) => handleLogoutPostRequestAction(req, res, next));

// Export the router
export default router;
