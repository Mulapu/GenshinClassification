import mongoose from 'mongoose'

const collection = 'groups'

const schema = new mongoose.Schema( {
    name: {
        type: String,
        required: true
    }
})

schema.pre( 'deleteOne', async function ( next ) { // Remove every tag associated to this group on remove.
    const groupName = this.getQuery().name; // Get the group name 
    const id = ( await mongoose.model( 'groups' ).findOne( { name: groupName } ) )?._id // Get the group id
    
    id && await mongoose.model( 'tags' ).deleteMany( { group: id } )
    next()
})



const groupsModel = mongoose.model( collection, schema )

export default groupsModel