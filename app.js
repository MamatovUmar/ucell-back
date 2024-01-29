import app from './config/main.js'
import router from './router.js'

const PORT = process.env?.PORT || 4000;

router(app)

app.listen(PORT, () => {
    console.log(`Server created: http://localhost:${PORT}`)
})