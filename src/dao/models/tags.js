import mongoose from 'mongoose'

const collection = 'tags'

const schema = new mongoose.Schema( {
    name: { type: String, required: true },
    image: { type: String },
    description: { type: String, required: true },
    group: { type: mongoose.Schema.Types.ObjectId, ref: 'groups', required: true }
})

schema.pre( 'deleteOne', async function ( next ) { // Update and remove this tag associated to any character on remove.
    const tagName = this.getQuery().name; // Get the tag name 
    const id = ( await mongoose.model( 'tags' ).findOne( { name: tagName } ) )?._id // Get the tag id

    id && await mongoose.model( 'characters' ).updateMany( 
        { 'tags.name': id }, // Search
        { $pull: { tags: { name: id } } } // Operation
    )
    next ()
})




const tagsModel = mongoose.model( collection, schema )

export default tagsModel