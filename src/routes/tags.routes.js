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
            const imageBuffer = req?.file?.buffer || null
            const doesExist = await tagsManager.findTag( tagName )

            if ( !tagName || !tagDescription || !group ) return res.sendError( 'Name, Description and Group is required to create' ) // Check if it exists
            if ( doesExist ) return res.sendError( 'Already exists a tag with the same name' )

            const response = await tagsManager.createTag( {
                name: tagName, 
                imageBuffer, 
                description: tagDescription, 
                group // group contains the name of the group
            } )

            if ( typeof response !== 'object' ) return res.sendError( response ) // Responses
            res.sendSuccess( response )
        })
        this.delete( '/', async function ( req, res, next ) {
            const { tagName } = req.body // Get the tag name

            if ( !tagName ) return res.sendError( 'Name is required to remove' ) // Check if it exists

            const response = await tagsManager.removeTag( tagName )
            if ( typeof response !== 'object' ) return res.sendError( response ) // Error response

            res.sendSuccess( response )
        })
        this.post( '/move', async function ( req, res, next ) {
            const { tagName, group } = req.body // Get the tag name
            
            if ( !tagName || !group ) return res.sendError( 'Tag name and new group name is required to move' )
            
            const request = await tagsManager.moveTag( { tagName, group } )
            if ( typeof request !== 'object' ) return res.sendError( request )

            res.sendSuccess( request )
        })
        this.post( '/rename', async function ( req, res, next ) {
            const { tagName, newTagName } = req.body
            const doesExist = await tagsManager.findTag( tagName )

            if ( !tagName || !newTagName ) return res.sendError( 'Must provide tag name and new tag name to rename' )
            console.log( doesExist )
            if ( doesExist ) return res.sendError( 'Already exists a tag with the same name' )
            
            const request = await tagsManager.renameTag( { tagName, newTagName } )
            if ( typeof request !== 'object' ) return res.sendError( request )

            res.sendSuccess( request )
        } )
    }
}

export default new tagsRouter().getRouter()
