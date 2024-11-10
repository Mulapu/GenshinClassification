import mongoose from 'mongoose'

const collection = 'characters'

const schema = new mongoose.Schema( {
    name: { type: String },
    tags: [ new mongoose.Schema({
        info: { type: mongoose.Schema.Types.ObjectId, ref: 'tags' },
        value: { type: Number, default: null },
        description: { type: String },
        constellation: { type: Number,  default: 0 } // Must be 0-6
    }) ]
})



const charactersModel = mongoose.model( collection, schema )

export default charactersModel