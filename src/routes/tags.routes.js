import BaseRouter from './BaseRouter.js';
import tagsManager from '../dao/managers/tagsManager.js'
import multer from '../services/multer.js'
import { uploadImage, removeImage } from '../services/cloudinary.js';


class tagsRouter extends BaseRouter {
    init () {
        this.get ( '/', async function ( req, res, next ) {
            let data = await tagsManager.getTags()
            res.sendSuccess( data )
        })
        this.post ( '/', multer.single( 'image' ), async function( req, res, next ) {
            const { tagName, tagDescription, group } = { ...req.body }; // Get the data

            if ( !tagName || !tagDescription || !group ) return res.sendError( 'Name, Description or Group is required to create' ) // Check if it exists
            
            const imageUrl = await ( async function () {
                if ( !req?.file?.buffer ) return null
                const imageBuffer = req?.file?.buffer
                const image = await uploadImage ( imageBuffer )
                return image.secure_url
            })()

            const response = await tagsManager.createTag( tagName, imageUrl, tagDescription, group ) // group contains the name of the group

            if ( typeof response !== 'object' ) return res.sendError( response ) // Responses
            res.sendSuccess( response )
        })
        this.delete( '/', async function ( req, res, next ) {
            const { tagName } = req.body // Get the tag name
            const imageUrl = ( await tagsManager.findTag( tagName ) ).image // This returns the entire object

            if ( !tagName ) return res.sendError( 'Name is required to remove' ) // Check if it exists
            
            const response = await tagsManager.removeTag( tagName )
            if ( typeof response !== 'object' ) return res.sendError( response ) // Error response

            if ( imageUrl ) { // Remove the image if it exists
                const regex = /([^/]+)(?=\.png$)/
                const imageId = imageUrl.match ( regex )[0]
                const response = await removeImage( imageId )
            }
            res.sendSuccess( response )
        })
    }
}

export default new tagsRouter().getRouter()