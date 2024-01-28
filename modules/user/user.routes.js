import { Router } from 'express'
import Controller from './UserController.js'
import Access from '../../middleware/Access.js'


const router = Router()

router.post('/signup', Controller.signupRules, Controller.create)
router.post('/login', Controller.loginRules, Controller.login)
router.get('/', Access.authRequired, Controller.fetch)

export default router