import BaseRouter from './BaseRouter.js'
import charactersManager from '../dao/managers/charactersManager.js'
import tagsManager from '../dao/managers/tagsManager.js'

class homeRouter extends BaseRouter {
    init () {
        this.get( '/', async function ( req, res, next ) {
            const tags = await tagsManager.getTags()
            const characters = await charactersManager.getCharacters()

            res.sendSuccess( { tags, characters } )
        })
        this.get( '/code', function ( req, res, next ) {
            res.render( 'mainPage/index.ejs' )
        })
    }
}

export default new homeRouter().getRouter()