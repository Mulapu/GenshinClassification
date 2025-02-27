import { Router } from 'express'
import multer from 'multer'

export default class BaseRouter {
    constructor () {
        this.router = Router()
        this.init()
    }

    init () {}

    getRouter () {
        return this.router
    }

    get ( path, ...callbacks ) {
        this.router.get( path, this.generateCustomResponses, this.applyCallbacks( callbacks ) )
    }
    post ( path, ...callbacks ) {
        this.router.post( path, this.generateCustomResponses, this.applyCallbacks( callbacks ) )
    }
    put ( path, ...callbacks ) {
        this.router.put( path, this.generateCustomResponses, this.applyCallbacks( callbacks ) )
    }
    delete ( path, ...callbacks ) {
        this.router.delete( path, this.generateCustomResponses, this.applyCallbacks( callbacks ) )
    }
    
    generateCustomResponses ( req, res, next ) {
        res.sendSuccess = message => res.send( { status: 'success', message } )
        res.sendError = error => res.send( { status: 'error', error } )
        next()
    }

    applyCallbacks ( callbacks ) {
        return callbacks.map( callback => async ( ...params ) => {
            try {
                await callback.apply( this, params )
            } catch ( err ) {
                console.log( 'Internal Base Router Error: \n' + err )
                params[1].status( 500 ).send( { error: 'Internal Base Router Error' } ) 
            }
        })
    }
}