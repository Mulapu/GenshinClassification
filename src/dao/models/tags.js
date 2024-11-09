import mongoose from 'mongoose'

const collection = 'tags'

const schema = new mongoose.Schema( {
    name: { type: String, required: true },
    image: { data: Buffer, contentType: String },
    description: { type: String, required: true },
    group: { type: mongoose.Schema.Types.ObjectId, ref: 'groups', required: true }
})

const tagsModel = mongoose.model( collection, schema )

export default tagsModel