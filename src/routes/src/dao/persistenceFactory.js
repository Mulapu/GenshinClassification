import config from '../config/config.js'

const persistence = config.persistence

const persistenceManager = ( async function () {
    if ( persistence === 'mongo' ) {
        const result = ( await import( './persistences/mongoPersistence.js' ) ).default
        return result
    }
})()

export default await persistenceManager