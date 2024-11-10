import mongoose from 'mongoose'
import { removeImage } from '../../services/cloudinary.js'

const collection = 'groups'

const schema = new mongoose.Schema( {
    name: {
        type: String,
        required: true
    }
})

// Remove every tag associated to this group on remove.
schema.pre( 'deleteMany', async function ( next ) { 
    const groupName = this.getQuery().name; // Get the group name 
    const id = ( await mongoose.model( 'groups' ).findOne( { name: groupName } ) )?._id // Get the group id
    if ( !id ) return

    // Remove Cloudinary images
    const toRemove = await mongoose.model ( 'tags' ).find( { group: id } )
    toRemove.forEach( tag => tag?.image && removeImage( tag.image ) )
    
    // Notes: Mongoose hooks can't chain other models hooks. You have to do it manually
    // Remove those associated tags from the characters
    const tagsIds = toRemove.map( tag => tag._id )
    await mongoose.model( 'characters' ).updateMany( 
        { 'tags.name': { $in: tagsIds } },
        { $pull: { tags: { name: { $in: tagsIds } } } }
    )

    // Remove the associated tags
    await mongoose.model( 'tags' ).deleteMany( { group: id } )
    next()
})


const groupsModel = mongoose.model( collection, schema )

export default groupsModel