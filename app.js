import app from './config/main.js'
import db from './config/db.js'
import router from './router.js'

const PORT = process.env.PORT;

router(app)

db.on('error', console.error.bind(console, 'connection error:'))
    .once('open', function () {
        app.listen(PORT, () => console.log(`Server created: http://localhost:${PORT}`));
    });