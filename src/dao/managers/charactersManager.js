import charactersModel from '../models/characters.js'
import persistenceFactory from '../persistenceFactory.js'
import tagsManager from '../managers/tagsManager.js'

let manager = persistenceFactory( charactersModel )

class charactersManager extends manager {
    getCharacters () {
        return this.get().populate( 'tags.info' ).lean() // The property inside the object you want to populate, in this case the name
    }
    findCharacter ( name ) { // internal function
        return this.getBy( { name } ).populate( 'tags.info' )
    }
    createCharacter ( name ) { // internal function
        return this.create( { name } )
    }
    async insertTag ( character, tag, value, description, constellation ) { // Insert a tag to a character, if the character doesn't exist, creates it
        const tagInfo = await tagsManager.findTag( tag )
        let characterQuery = await this.findCharacter( character )

        if ( !tagInfo ) return 'Enter a valid tag'
        if ( !characterQuery ) {
            await this.createCharacter( character )
            characterQuery = await this.findCharacter( character )
        }

        characterQuery.tags.push( { info: tagInfo._id, value, description, constellation } )
        return await characterQuery.save();
    }
    async removeTag ( character, tag ) { // Remove a tag of a character // This deletes all tags with the same name
        const tagInfo = await tagsManager.findTag( tag )
        let characterQuery = await this.findCharacter( character )

        if ( !tagInfo ) return 'Tag not found'
        if ( !characterQuery ) return 'Character not found'
        if ( !characterQuery?.tags.some( tagObj => tagObj.info.name == tag ) ) return 'Tag not found in the character' // tagObj.info is populated

        // Remove the tag
        characterQuery.tags = characterQuery.tags.filter( tag => tag.info?._id.toString() !== tagInfo._id.toString() ) // Both are ObjectId
        return await characterQuery.save()
    }
}

export default new charactersManager()