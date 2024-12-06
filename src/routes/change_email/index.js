
import { Router } from "express";

import { handleChangeEmailGetRequestAction, handleChangeEmailPutRequestAction } from "../../controllers/change_email/index.js";

// Create a new router instance
const router = Router();

// Example GET request
router.get('/', (req, res, next) => handleChangeEmailGetRequestAction(req, res, next));

router.put('/', (req, res, next) => handleChangeEmailPutRequestAction(req, res, next));

// Export the router
export default router;
