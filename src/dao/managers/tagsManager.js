import tagsModel from '../models/tags.js'
import persistenceFactory from '../persistenceFactory.js'
import groupsManager from './groupsManager.js'
import { uploadImage, removeImage } from '../../services/cloudinary.js';

let manager = persistenceFactory( tagsModel )

class tagsManager extends manager {
    getTags () { // Get all tags
        return this.get().populate( 'group' )
    }
    findTag ( name ) { // Find tag by name
        return this.getBy( { name } )
    }
    async createTag ( obj ) { // Create tag
        // Obj contain: name, imageBuffer, description, group
        let groupInfo = await groupsManager.findGroup( obj?.group )

        if ( !obj?.name ) return 'Must provide a tag name to create'
        if ( !groupInfo ) return 'Must provide a valid group name to create. Group not found.'

        const imageUrl = await ( async function () { // Create the image on cloudinary
            if ( !obj?.imageBuffer ) return null
            const imageBuffer = obj?.imageBuffer
            const image = await uploadImage ( imageBuffer )
            return image.secure_url
        })()

        return this.create ( {
            name: obj?.name, 
            image: imageUrl,
            description: obj?.description, 
            group: groupInfo._id 
        } )
    }
    async removeTag ( name ) { // Remove tag by name
        let tagInfo = await this.findTag( name )

        if ( !tagInfo ) return 'Enter a valid tag to remove'

        
        const imageUrl = tagInfo?.image // tagInfo returns the entire object
        if ( imageUrl ) removeImage( imageUrl ) // Remove image if exists
        
        return this.delete( { name } )
    }
    async moveTag ( obj ) {
        // Obj contain: tagName, group
        const tagInfo = await this.findTag( obj?.tagName ) 
        const newGroupInfo = await groupsManager.findGroup( obj?.group )

        if ( !tagInfo ) return 'Must provide a valid tag name to move. Tag not found.'
        if ( !newGroupInfo ) return 'Must provide a valid group name to move. Group not found.'

        
        const request = await this.update( tagInfo._id, { $set: { group: newGroupInfo._id } } )
        return request
    }
    async renameTag( obj ) { // Obj contain: tagName, newTagName
        const tagInfo = await this.findTag( obj?.tagName )

        if ( !tagInfo ) return 'Must provide a valid tag name to rename. Tag not found.'

        const request = await this.update( tagInfo._id, { $set: { name: obj?.newTagName } } )
        return request
    }
}

export default new tagsManager()