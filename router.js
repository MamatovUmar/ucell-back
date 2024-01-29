
import userRoutes from './modules/import/import.routes.js'

export default (app) => {
    app.use('/api', userRoutes)
}