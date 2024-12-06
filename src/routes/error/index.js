
import { Router } from "express";


import { handleErrorGetRequestAction } from "../../controllers/error/index.js";

// Create a new router instance
const router = Router();

// Example GET request
router.get('/', (req, res, next) => handleErrorGetRequestAction(req, res, next));


// Export the router
export default router;
