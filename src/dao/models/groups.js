import mongoose from 'mongoose'

const collection = 'groups'

const schema = new mongoose.Schema( {
    name: {
        type: String,
        required: true
    }
})

schema.pre( 'remove', async function ( next ) { // Remove every tag associated to this group on remove.
    await mongoose.model( 'tag' ).deleteMany( { group: this._id } )
    next()
})



const groupsModel = mongoose.model( collection, schema )

export default groupsModel