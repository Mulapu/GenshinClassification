import groupsModel from '../models/groups.js'
import persistenceFactory from '../persistenceFactory.js'

let manager = persistenceFactory( groupsModel )

class groupsManager extends manager {
    getGroups () {
        return this.get()
    }
    findGroup ( name ) {
        return this.getBy( { name } )
    }
    createGroup ( name ) {
        return this.create( { name } )
    }
    removeGroup ( name ) {
        return this.delete( { name } )
    }
}

export default new groupsManager()