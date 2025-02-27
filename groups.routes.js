import BaseRouter from "./BaseRouter.js";
import groupsManager from "../dao/managers/groupsManager.js";
import tagsModel from "../dao/models/tags.js";

class groupsRouter extends BaseRouter {
    init () {
        this.get( '/', async function ( req, res, next ) {
            let response = await groupsManager.getGroups()
            res.sendSuccess( response )
        })
        this.post( '/', async function ( req, res, next ) {
            const { groupName } = req.body; // Get the data
            const doesExist = await groupsManager.findGroup( groupName )

            if ( !groupName ) return res.sendError( 'Name is required to create' ) // Check if it exists
            if ( doesExist ) return res.sendError( 'Already exists a group with the same name' )

            const response = await groupsManager.createGroup( groupName )
            res.sendSuccess( response )
        })
        this.delete( '/', async function ( req, res, next ) {
            // const { groupName } = req.body 
            // const id = ( await mongoose.model( 'groups' ).findOne( { name: groupName } ) )?._id // Get the group id
            // await tagsModel.deleteMany( { group: id } ) // This does trigger the character's schema.pre
            const { groupName } = req.body;
        
            if ( !groupName ) return res.sendError( 'name is required to delete' )

            const response = await groupsManager.removeGroup( groupName )
            res.sendSuccess( response )
        })
        this.post( '/rename', async function ( req, res, next ) {
            const { groupName, newGroupName } = req.body
            const doesExist = await groupsManager.findGroup( groupName )

            if( !groupName || !newGroupName ) return res.sendError( 'Must provide group name and new group name to rename' )
            if ( !doesExist ) return res.sendError( 'Already exists a group with the same name' )
            
            const response = await groupsManager.renameGroup( { groupName, newGroupName } )
            res.sendSuccess( response )
        })
    }
}

export default new groupsRouter().getRouter()