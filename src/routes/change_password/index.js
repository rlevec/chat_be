
import { Router } from "express";

import { handleChangePasswordGetRequestAction, handleChangePasswordPutRequestAction } from "../../controllers/change_password/index.js";


// Create a new router instance
const router = Router();

// Example GET request
router.get('/', (req, res, next) => handleChangePasswordGetRequestAction(req, res, next));

router.put('/', (req, res, next) => handleChangePasswordPutRequestAction(req, res, next));

// Export the router
export default router;
