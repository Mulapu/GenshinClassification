let create = document.getElementsByClassName( 'create' )[0]
let image = document.getElementsByClassName( 'image' )[0]
let remove = document.getElementsByClassName( 'remove' )[0]

create.addEventListener( 'click', async function ( e ) {
    e.preventDefault()

    async function apiFetch ( method, endpoint, data ) {
        return await fetch( `/${ endpoint }`, {
            method,
            headers: {
                ...( data instanceof FormData ? {} : { 'Content-Type': 'application/json' } ) // Remove application/json if its FormData
            },
            body: data
        })
        .then( response => response.json() )
        .then( data => {
            console.log( data )
        } )
    }

    const json = JSON.stringify( { tagName: 'aa', newTagName: 'aaa' } )

    const data = await apiFetch( 'POST', 'tags/rename', json )

    console.log( data )

    // Insertar los datos directamente en el FormData
    // const dataForm = new FormData()
    // dataForm.append( 'tagName', 'asdfasd' )

    // const obj = { 'groupName': 'test3' }
    // await apiFetch( 'POST', 'groups', JSON.stringify( obj ) )

    // const obj1 = { 'tagName': 'lll', 'tagDescription': 'aaa', 'group': 'test3' }
    // await apiFetch( 'POST', 'tags', JSON.stringify( obj1 ) )

    // const obj2 = { 'character': 'Arlecchino', 'tag': 'ccc' }
    // await apiFetch( 'POST', 'characters', JSON.stringify( obj2 ) )

    // const obj = { 'groupName': 'test' }
    // apiFetch( 'DELETE', 'groups', JSON.stringify( obj ) )
})