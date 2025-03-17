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
    async renameGroup( obj ) { // Obj contain: groupName, newGroupName
        const group = await this.findGroup( obj.groupName );

        if ( !group ) return 'Must provide a valid group name to rename. Group not found'

        const request = await this.update( group._id, { $set: { name: obj.newGroupName } } )
        return request
    }
}

export default new groupsManager()