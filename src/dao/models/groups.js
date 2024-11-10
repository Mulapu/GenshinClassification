import mongoose from 'mongoose'

const collection = 'groups'

const schema = new mongoose.Schema( {
    name: {
        type: String,
        required: true
    }
})

const groupsModel = mongoose.model( collection, schema )

export default groupsModel