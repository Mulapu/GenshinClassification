import mongoose from 'mongoose'

const collection = 'tags'

const schema = new mongoose.Schema( {
    name: { type: String, required: true },
    image: { type: String },
    description: { type: String, required: true },
    group: { type: mongoose.Schema.Types.ObjectId, ref: 'groups', required: true }
})

// Update and remove this tag associated to any character on remove.
schema.pre( 'deleteMany', async function ( next ) {
    const tagName = this.getQuery().name; // Get the tag name 
    const id = ( await mongoose.model( 'tags' ).findOne( { name: tagName } ) )?._id // Get the tag id

    // Remove the character tags
    id && await mongoose.model( 'characters' ).updateMany( 
        { 'tags.info': id }, // Search // tags.info it's the populated property
        { $pull: { tags: { info: id } } } // Operation
    )
    next ()
})




const tagsModel = mongoose.model( collection, schema )

export default tagsModel