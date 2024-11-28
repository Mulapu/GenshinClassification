import __dirname from './utils.js'
import config from './config/config.js'
import express, { application } from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import multer from 'multer'
import cors from 'cors'

import tagsRouter from './routes/tags.routes.js'
import charactersRouter from './routes/characters.routes.js'
import homeRouter from './routes/home.routes.js'
import groupsRouter from './routes/groups.routes.js'


const app = express()

app.use( express.json() );
app.use( bodyParser.text() )
app.use( express.urlencoded( { extended: true } ) )
const corsOptions = {
    origin: '*', // Permite todos los orígenes
    methods: [ 'GET', 'POST', 'PUT', 'DELETE' ],
    allowedHeaders: [ 'Content-Type', 'Authorization' ]
};
app.use( cors( corsOptions ) )


// No express.static() for public files
app.use( express.static( `${ __dirname }/views` ) ) // Set static directory in views for css, js files
app.set( 'views', `${ __dirname }/views` )
app.set( 'view engine', 'ejs' )

const connection = mongoose.connect( config.mongoURL )

app.use( '/tags', tagsRouter )
app.use( '/characters', charactersRouter )
app.use( '/groups', groupsRouter )
app.use( '/', homeRouter )


app.listen( config.PORT, () => {
    console.log( `Server Listened in ${ process.pid }` )
})