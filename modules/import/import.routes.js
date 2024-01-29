import { Router } from 'express'
import Controller from './ImportController.js'
import multer from "multer";

const upload = multer({ dest: 'uploads/' });


const router = Router()

router.post('/load', upload.single('file'), Controller.load)
router.get('/summary', Controller.summary)

export default router