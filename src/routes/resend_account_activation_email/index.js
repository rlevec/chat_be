
import { Router } from "express";


import { handleResendAccountActivationEmailPostRequestAction, handleResendAccountActivationEmailGetRequestAction } from "../../controllers/resend_account_activation_email/index.js";

// Create a new router instance
const router = Router();

// Example GET request
router.get('/', (req, res, next) => handleResendAccountActivationEmailGetRequestAction(req, res, next));

// Example POST request
router.post('/', (req, res, next) => handleResendAccountActivationEmailPostRequestAction(req, res, next));

// Export the router
export default router;
