import mongoose from 'mongoose'

const collection = 'tags'

const schema = new mongoose.Schema( {
    name: { type: String, required: true },
    image: { type: String },
    description: { type: String, required: true },
    group: { type: mongoose.Schema.Types.ObjectId, ref: 'groups', required: true }
})

schema.pre( 'remove', async function ( next ) { // Update and remove this tag associated to any character on remove.
    await mongoose.model( 'character' ).updateMany( 
        { 'tags.name': this._id }, // Search
        { $pull: { tags: { name: this._id } } } // Operation
    )
    next ()
})




const tagsModel = mongoose.model( collection, schema )

export default tagsModel