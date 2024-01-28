import UserModel, { getPublicFields } from './UserModel.js'
import bcrypt from 'bcrypt'
import MainController from '../../core/BaseController.js'
import { body, validationResult } from 'express-validator'
const rounds = 10

class UserController extends MainController{
    get loginRules() {
        return [
            body('login').isEmail().trim().toLowerCase().notEmpty(),
            body('password').notEmpty().isLength({ min: 5 }),
        ]
    }

    get signupRules() {
        return [
            ...this.loginRules,
            body('username').notEmpty()
        ]
    }
    async login(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json(super.error(errors.array()));
        }

        const { login, password } = req.body
        try{
            const user = await UserModel.findOne({login})

            if(user){
                bcrypt.compare(password, user.password, async (error, match) => {
                    if(error) {
                        return res.status(500).json(super.error(error))
                    } else if(match) {
                        const userPublicFields = await getPublicFields({ _id: user._id })
                        return res.json(super.success({
                            user: userPublicFields,
                            token: super.generateToken(userPublicFields)
                        }))
                    } else {
                        return res.status(40).json(super.error('Password not match'))
                    }
                })
            } else {
                return res.status(404).json(super.error('User not found'))
            }
        } catch (e) {
            return res.status(500).json(super.error(e))
        }
    }

    async create(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json(super.error(errors.array()));
        }

        const { login, password, username } = req.body

        let is_user_exist = await UserModel.exists({login})
        if(is_user_exist){
            return res.json(super.error('email exist'))
        }

        bcrypt.hash(password, rounds, async (error, hash) => {
            if(error){
                return res.status(500).json(super.error(error))
            }else{
                const user = new UserModel({
                    login,
                    password: hash,
                    username
                })

                try{
                    await user.save()
                    const userPublicFields = await getPublicFields({ _id: user._id })
                    return res.json(super.success({
                        user: userPublicFields,
                        token: super.generateToken(userPublicFields)
                    }))
                }catch (e) {
                    return res.status(500).json(super.error(e))
                }
            }
        })
    }

    async fetch(req, res) {
        try{
            return res.json(super.success(req.user))
        }catch (e) {
            return res.status(500).json(super.error(e))
        }
    }
}


export default new UserController()