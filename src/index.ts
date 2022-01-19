import "reflect-metadata";
import express from 'express';
import dotenv from 'dotenv';
import { createServer } from 'http';

dotenv.config();

import './database/Connection';
import createRoutes from './router/web';

const app = express();
const http = createServer( app );
createRoutes( app );

app.use( express.urlencoded( { extended: false } ) );
//Serves all the request which includes /images in the url from Images folder
app.use( '/static/uploads', express.static( __dirname + './../uploads' ) );


const PORT: number = process.env.PORT ? Number( process.env.PORT ) : 3003;

http.listen( PORT, function () {
    console.log( `Server: http://localhost:${PORT} , ${process.env.PORT}` );
} );