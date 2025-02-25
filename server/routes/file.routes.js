

import { Router } from "express";
import authMidlleware from "../middleware/auth.middleware.js";
import fileController from "../controllers/file.controller.js";
const router = new Router()


router.post('', authMidlleware, fileController.createDir)
router.post('/upload', authMidlleware, fileController.uploadFile)

router.get('', authMidlleware, fileController.fetchFile)

export default router