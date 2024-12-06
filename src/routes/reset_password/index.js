
import { Router } from "express";

import { handleResetPasswordGetRequestAction, handleResetPasswordPutRequestAction } from "../../controllers/reset_password/index.js";

// Create a new router instance
const router = Router();

// Example GET request
router.get('/', (req, res, next) => handleResetPasswordGetRequestAction(req, res, next));

// Example POST request
router.put('/', (req, res, next) => handleResetPasswordPutRequestAction(req, res, next));

// Export the router
export default router;
