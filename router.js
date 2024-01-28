
import userRoutes from './modules/user/user.routes.js'

export default (app) => {
    app.use('/api/user', userRoutes)
}