import tagsModel from '../models/tags.js'
import persistenceFactory from '../persistenceFactory.js'
import groupsManager from './groupsManager.js'

let manager = persistenceFactory( tagsModel )

class tagsManager extends manager {
    getTags () { // Get all tags
        return this.get().populate( 'group' )
    }
    findTag ( name ) { // Find tag by name
        return this.getBy( { name } )
    }
    async createTag ( name, image, description, group ) { // Create tag
        let groupInfo = await groupsManager.findGroup( group )

        if ( !groupInfo ) return 'Enter a valid group'

        return this.create ( { name, image, description, group: groupInfo._id } )
    }
    async removeTag ( name ) { // Remove tag by name
        let tagInfo = await this.findTag( name )

        if ( !tagInfo ) return 'Enter a valid tag'

        return this.delete( { name } )
    }
}

export default new tagsManager()