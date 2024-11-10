let create = document.getElementsByClassName( 'create' )[0]
let image = document.getElementsByClassName( 'image' )[0]
let remove = document.getElementsByClassName( 'remove' )[0]

create.addEventListener( 'click', function ( e ) {
    e.preventDefault()

    const formData = new FormData();
    formData.append( 'tagName', 'aaa' );
    formData.append( 'tagDescription', 'bbb' );
    formData.append( 'image', image.files[0] )

    fetch( '/tags', {
        method: 'POST',
        body: formData // Convierte el objeto a una cadena JSON
    }).then( e => e.json() )
    .then( e => console.log( e ) );
})

remove.addEventListener( 'click', function ( e ) {
    e.preventDefault()

    fetch( '/tags', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify( { tagName: 'aaa' } )
    }).then( e => e.json() )
    .then( e => console.log( e ) )
})

let characterCreate = document.getElementsByClassName( 'characterCreate' )[0]

characterCreate.addEventListener( 'click', async function ( e ) {
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


    // Insertar los datos directamente en el FormData
    // const dataForm = new FormData()
    // dataForm.append( 'tagName', 'asdfasd' )

    // const obj = { 'groupName': 'test' }
    // await apiFetch( 'POST', 'groups', JSON.stringify( obj ) )

    // const obj1 = { 'tagName': 'ccc', 'tagDescription': 'ccc', 'group': 'test' }
    // await apiFetch( 'POST', 'tags', JSON.stringify( obj1 ) )

    const obj2 = { 'character': 'Arlecchino', tag: 'bbb' }
    await apiFetch( 'POST', 'characters', JSON.stringify( obj2 ) )

    // const obj = { 'groupName': 'test' }
    // apiFetch( 'DELETE', 'groups', JSON.stringify( obj ) )
})