import multer from 'multer'
import __dirname from '../utils.js'

const storage = multer.diskStorage( {
    destination: function ( req, file, cb ) {
        cb ( null, __dirname + '/img/tags' )
    },
    filename: function ( req, file, cb ) {
        cb ( null, file.originalname )
    }
})

const uploader = multer( { storage } )
export default uploader