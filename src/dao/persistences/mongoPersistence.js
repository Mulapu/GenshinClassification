export default function mongoManager ( model ) {
    return class {
        get () {
            return model.find().lean()
        }
        getBy( data ) {
            return model.findOne( data )
        }
        create( data ) {
            return model.create( data )
        }
        delete ( query ) {
            return model.deleteOne( query )
        }
    }
}