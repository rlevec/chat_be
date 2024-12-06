
import { Router } from "express";


import { handleTermsOfUseGetRequestAction } from "../../controllers/terms_of_use/index.js";

// Create a new router instance
const router = Router();

// Example GET request
router.get('/', (req, res, next) => handleTermsOfUseGetRequestAction(req, res, next));


// Export the router
export default router;
