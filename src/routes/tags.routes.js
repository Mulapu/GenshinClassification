import BaseRouter from './BaseRouter.js';
import tagsManager from '../dao/managers/tagsManager.js'
import multer from '../services/multer.js'
import fs from 'fs'

class tagsRouter extends BaseRouter {
    init () {
        this.get ( '/', async function ( req, res, next ) {
            let data = await tagsManager.getTags()
            res.sendSuccess( data )
        })
        this.post ( '/', multer.single( 'image' ), async function( req, res, next ) {
            const { tagName, tagDescription, imagePath, group } = { ...req.body, imagePath: req.file?.path }; // Get the data

            if ( !tagName || !tagDescription || !group ) return res.sendError( 'Name, Description or Group is required to create' ) // Check if it exists
            
            const response = await tagsManager.createTag( tagName, imagePath, tagDescription, group ) // group contains the name of the group

            if ( typeof response !== 'object' ) return res.sendError( response ) // Responses
            res.sendSuccess( response )
        })
        this.delete( '/', async function ( req, res, next ) {
            const { tagName } = req.body // Get the tag name
            const imgPath = await tagsManager.findTag( tagName ) // This returns the entire object

            if ( !tagName ) return res.sendError( 'Name is required to remove' ) // Check if it exists
            
            const response = await tagsManager.removeTag( tagName )
            if ( typeof response !== 'object' ) return res.sendError( response ) // Error response

            // Response
            if ( imgPath?.image ) fs.rm( imgPath.image, ( err ) => err && console.log( err ) ) // Remove the image
            res.sendSuccess( response )
        })
    }
}

export default new tagsRouter().getRouter()