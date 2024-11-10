import mongoose from 'mongoose'

const collection = 'characters'

const schema = new mongoose.Schema( {
    name: { type: String },
    tags: [ new mongoose.Schema({
        name: { type: mongoose.Schema.Types.ObjectId, ref: 'tags' },
        value: { type: Number, default: null },
        description: { type: String },
        constellation:  { // Must be 0-6
            type: Number, 
            default: 0, 
            required: true
        } 
    }) ]
})

const charactersModel = mongoose.model( collection, schema )

export default charactersModel
