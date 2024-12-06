
import { Router } from "express";


import { handleForgotPasswordGetRequestAction, handleForgotPasswordPostRequestAction } from "../../controllers/forgot_password/index.js";

// Create a new router instance
const router = Router();

// Example GET request
router.get('/', (req, res, next) => handleForgotPasswordGetRequestAction(req, res, next));

// Example POST request
router.post('/', (req, res, next) => handleForgotPasswordPostRequestAction(req, res, next));

// Export the router
export default router;
