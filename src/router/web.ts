import bodyParser from "body-parser";
import express from "express";

import cors from "cors";

import multer from "multer";

import { RegValidation, SignValidation } from "./../app/utils/Index";
import { UserCtrl, AuthCtrl, DeptCtrl } from "./../app/controller/Index";
import { AudioUploader, CheckAuth } from "./../app/middleware/Index";

const createRoutes = ( app: express.Express ) => {

    const options: cors.CorsOptions = {
        allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "X-Access-Token"],
        credentials: true,
        methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
        origin: true,
        //origin: "*",
        optionsSuccessStatus: 204, // some legacy browsers (IE11, various SmartTVs) choke on 204
        preflightContinue: false
    };

    // declare controllers
    const UserController = new UserCtrl();
    const Department = new DeptCtrl();

    // AuthCtrl
    const Auth = new AuthCtrl();


    const upload = multer( AudioUploader );
    //Load files via URL
    // app.use( express.static( '/uploads' ) );
    app.use( express.static( __dirname + './../../uploads' ) );

    app.use( cors() );
    //enable pre-flight
    app.options( "*", cors( options ) );

    //Load files via URL
    app.use( express.static( 'public' ) );
    app.use( CheckAuth );
    app.use( bodyParser.json() );

    app.get( "/", ( _: express.Request, res: express.Response ) => {
        res.send( "Hello, World!" );
    } );

    app.post( "/user/register", RegValidation, UserController.create );
    app.post( "/user/login", SignValidation, Auth.login );
    app.post( "/user/change/password/", SignValidation, Auth.changePassword );
    app.post( "/user/logout", SignValidation, Auth.logout );

    // Department
    app.post( "/departments/create", Department.create );
    app.post( "/departments/get", Department.index );
    app.post( "/departments/audio/upload", upload.single( "file" ), Department.uploadAudio );
    app.post( "/audios/get", Department.indexAudio );

};

export default createRoutes;
