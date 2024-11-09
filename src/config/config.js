import dotenv from 'dotenv'

dotenv.config( {
    path: './.env'
})

export default {
    persistence: process.env.persistence,
    PORT: process.env.PORT,
    mongoURL: process.env.MONGO_URL
}
