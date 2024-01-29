import app from './config/main.js'
import router from './router.js'

const PORT = process.env.PORT;

router(app)

app.listen(PORT, () => {
    console.log(`Server created: http://localhost:${PORT}`)
})