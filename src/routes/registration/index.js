
import { Router } from "express";


import { handleRegistrationGetRequestAction, handleRegistrationPostRequestAction } from "../../controllers/registration/index.js";

// Create a new router instance
const router = Router();

// Example GET request
router.get('/', (req, res, next) => handleRegistrationGetRequestAction(req, res, next));

// Example POST request
router.post('/', (req, res, next) => handleRegistrationPostRequestAction(req, res, next));

// Export the router
export default router;
