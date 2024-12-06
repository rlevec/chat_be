
import { Router } from "express";


import { handlePrivacyPolicyGetRequestAction } from "../../controllers/privacy_policy/index.js";

// Create a new router instance
const router = Router();

// Example GET request
router.get('/', (req, res, next) => handlePrivacyPolicyGetRequestAction(req, res, next));


// Export the router
export default router;
