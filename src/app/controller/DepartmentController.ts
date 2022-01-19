"use-strict"
import express from "express";
import { getRepository, In, MoreThan } from "typeorm";

// import { User } from "../entity/User";
import { validationResult, Result, ValidationError } from "express-validator";
import { Department } from "../../entity/Department";
import { Audio } from "../../entity/Audio";

class DepartmentController {

    /**
     * List all stored Department
     * @param req 
     * @param res 
     */


    /**
     *  Creating a new Department
     * @param req 
     * @param res 
     */
    create = async ( req: express.Request, res: express.Response ): Promise<void> => {
        
        const UserRole = res.locals.user.role;
        
        // We'll create a new user by taking the information coming from the body.
        const data: {
            name_uz: string;
            description: string;
        } = {
            name_uz: req.body.name_uz,
            description: req.body.description,
        };

        const errors: Result<ValidationError> = validationResult( req );

        if ( !errors.isEmpty() ) {
            res.status( 422 ).json( {
                status: "Error",
                message: "Something went wrong!",
                errors: errors.array()
            } );
        }
        else if ( UserRole != "Admin") {
            res.status( 419 ).json( {
                status: "Error",
                message: "Only Admin can add and edit department",
            } );
        }
        else  {
            try {
                //let Department: Department;
                const DepartmentRepository = getRepository( Department );

                // let Department = await DepartmentRepository.findOne( {
                //     select: ["id"],
                //     order: { id: "DESC" }
                // } );
                // if ( Department ) {
                //     const dataID = {
                //         id: Department.id
                //     }
                //     Object.assign( data, dataID );
                // }

                await DepartmentRepository
                    .save( data )
                    .then( async ( obj: Department ) => {
                        //obj: Department
                        // Return response
                        res.status( 200 ).json( {
                            status: "Success",
                            message: "Data saved successfully",
                            data: obj
                        } );
                    } )
                    .catch( ( reason ) => {
                        res.status( 500 ).json( {
                            status: "error",
                            message: "Something went wrong",
                            error: reason
                        } );
                    } );
            } catch ( error ) {
                res.status( 401 ).json( {
                    status: "Error", 
                    message: "Something went wrong",
                    error: error
                } );
            }
        }
    };

    /**
     * Get current Department
     * @param req 
     * @param res 
     */
    index = async ( req: express.Request, res: express.Response ): Promise<void> => {

        const DataSelect: Array<number> = req.body.select;
        
        let options = {
            id: MoreThan(0)
        }
        if ( DataSelect.length >= 1 ) {
            options = {
                id: In( DataSelect )
            }
        }

        //let Department: Department;
        const DepartmentRepository = getRepository( Department );

        try {
            let Department = await DepartmentRepository.find( {
                //select: ["look_straight", "look_right", "look_left", "updated_at"],
                where: options,
                order: { id: "ASC" }
            } );
          

            res.status( 200 ).json( {
                status: "Success",
                data: Department
            } );
        } catch ( error ) {
            res.status( 401 ).json( {
                status: "Error",
                message: error,
            } );
        }
    };

    /**
     * Send message for a Department
     * @param req 
     * @param res 
     */


    /**
     * Remove current Department
     * @param req 
     * @param res 
     */


    /**
     *  Creating a new Audio file
     * @param req 
     * @param res 
     */
    uploadAudio = async ( req: express.Request, res: express.Response ): Promise<void> => {

        const UserRole = res.locals.user.role;

        // Starts upload
        const getPath: string = req.file.path;
        const rpl: string = getPath.replace( "\\", "/" );
        //console.log( rpl);
        if ( !rpl ) {
            // after all send a 204 - no content but accepted response
            res.status( 404 ).json( {
                status: "Error",
                code: 10004,
                message: "No information found"
            } );
        }

        // We'll create a new user by taking the information coming from the body.
        const data: {
            url: string;
            title: string;
            department: any;
        } = {
            url: rpl,
            title: req.body.title,
            department: req.body.department_id
        };

        const errors: Result<ValidationError> = validationResult( req );

        if ( !errors.isEmpty() ) {
            res.status( 422 ).json( {
                status: "Error",
                message: "Something went wrong!",
                errors: errors.array()
            } );
        }
        else if ( UserRole != "Admin" ) {
            res.status( 419 ).json( {
                status: "Error",
                message: "Only Admin can add and edit department",
            } );
        }
        else {
            try {
                //let Department: Department;
                const AudioRepository = getRepository( Audio );

                // let Department = await AudioRepository.findOne( {
                //     select: ["id"],
                //     order: { id: "DESC" }
                // } );
                // if ( Department ) {
                //     const dataID = {
                //         id: Department.id
                //     }
                //     Object.assign( data, dataID );
                // }

                await AudioRepository
                    .save( data )
                    .then( async ( obj: Audio ) => {
                        //obj: Department
                        // Return response
                        res.status( 200 ).json( {
                            status: "Success",
                            message: "Data saved successfully",
                            data: obj
                        } );
                    } )
                    .catch( ( reason ) => {
                        res.status( 500 ).json( {
                            status: "error",
                            message: "Something went wrong",
                            error: reason
                        } );
                    } );
            } catch ( error ) {
                res.status( 401 ).json( {
                    status: "Error",
                    message: "Something went wrong",
                    error: error
                } );
            }
        }
    };


    /**
    * Get current Department
    * @param req 
    * @param res 
    */
    indexAudio = async ( req: express.Request, res: express.Response ): Promise<void> => {

        const DataSelect: Array<number> = req.body.select;

        let options = {
            department: MoreThan( 0 )
        }
        if ( DataSelect.length >= 1 ) {
            options = {
                department: In( DataSelect )
            }
        }

        //let Department: Department;
        const AudioRepository = getRepository( Audio );

        try {
            let AudioData = await AudioRepository.find( {
                select: ["id", "title", "url", "department"],
                where: options,
                order: { id: "ASC" }
            } );


            res.status( 200 ).json( {
                status: "Success",
                data: AudioData
            } );
        } catch ( error ) {
            res.status( 401 ).json( {
                status: "Error",
                message: error,
            } );
        }
    };
}
export default DepartmentController;
