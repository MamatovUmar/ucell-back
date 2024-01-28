import jwt from "jsonwebtoken";
const secret = process.env.RANDOM_TOKEN_SECRET || 'secret_token'

export default class BaseController{
    error(message){
        return {
            status: false,
            message: message
        }
    }

    success(data = null){
        return {
            status: true,
            data: data
        }
    }

    generateToken(user){
        return jwt.sign({data: user}, secret, {expiresIn: '24h'})
    }

    verifyToken(token){
        return jwt.verify(token, secret)
    }
}

