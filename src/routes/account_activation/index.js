import express from "express";

import { handleAccountActivationPutRequestAction, handleAccountActivationGetRequestAction } from "../../controllers/account_activation/index.js";


const router = express.Router();

router.get('/', (req, res, next) => handleAccountActivationGetRequestAction(req, res, next));

router.put("/", (req, res, next) => handleAccountActivationPutRequestAction(req, res, next));

export default router;