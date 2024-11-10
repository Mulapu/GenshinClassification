import BaseRouter from "./BaseRouter.js";
import groupsManager from "../dao/managers/groupsManager.js";

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
            if ( doesExist ) return res.sendError( 'Already exist a group with the same name' )

            const response = await groupsManager.createGroup( groupName )
            res.sendSuccess( response )
        })
        this.delete( '/', async function ( req, res, next ) {
            const { groupName } = req.body;
        
            if ( !groupName ) return res.sendError( 'name is required to delete' )

            const response = await groupsManager.removeGroup( groupName )
            res.sendSuccess( response )
        })
    }
}

export default new groupsRouter().getRouter()