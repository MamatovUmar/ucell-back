import { getPublicFields } from '../modules/user/UserModel.js'
import BaseController from "../core/BaseController.js";

class Access extends BaseController {

    async authRequired(req, res, next) {
        try {
            const token = req.headers.authorization.split(' ')[1];
            const decodedData = super.verifyToken(token);
            req['user'] = await getPublicFields({_id: decodedData.data?.id})
            next()
        } catch (e) {
            return res.status(403).json(super.error(e))
        }
    }

    adminAccess = async (req, res, next) => {
        if (req?.user.role === 'admin') {
            next()
        } else {
            return res.status(403).json(super.error('permission denied'))
        }
    }

    moderatorAccess = async (req, res, next) => {
        if (['moderator', 'admin'].includes(req.user.role)) {
            next()
        } else {
            return res.status(403).json(super.error('permission denied'))
        }
    }
}

export default new Access()