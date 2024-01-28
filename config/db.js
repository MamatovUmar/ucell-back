import mongoose from 'mongoose'
const DB_URL = process.env.DB_URL

mongoose.connect(DB_URL)
    .then(() => console.log('MongoDB connected...'))
    .catch(error => console.log(error));

export default mongoose.connection;