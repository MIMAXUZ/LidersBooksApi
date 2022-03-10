import express from "express";
import { getConnection } from "typeorm";

import { User } from "./../../entity/User";
import { validationResult } from "express-validator";
import { generateToken } from "../utils/Index";

//import { SentMessageInfo } from "nodemailer/lib/sendmail-transport";

class UserController {

    /**
     * List all stored User
     * @param req 
     * @param res 
     */

   
    /**
     *  Creating User
     * @param req 
     * @param res 
     */
    create = async (req: express.Request, res: express.Response): Promise<void> => {
        
        // We'll create a new user by taking the information coming from the body.
        const postData: {
            phone: string;
            last_name: string;
            first_name: string;
            gender: string;
            password: string;
        } = {
            phone: req.body.phone,
            last_name: req.body.last_name,
            first_name: req.body.first_name,
            password: req.body.password,
            gender: req.body.gender
        };

        const errors = validationResult(req);

      if (!errors.isEmpty()) {
          res.status( 422 ).json( {
              status: "Error",
              message: "Something went wrong!",
              errors: errors.array() 
          } );
            //res.status(422).json({ errors: errors.array() });
        } else {
          const userRep = getConnection().getRepository( User );
          const user = userRep.create( postData );

          await userRep
          .save(user)
              .then( async (obj: User) => {

                  let userData = await userRep
                      .createQueryBuilder( "user" )
                      .addSelect( 'user.role' )
                      .addSelect( 'user.password' )
                      .where( "user.phone = :phone", { phone: obj.phone } )
                      .getOne()
                  console.log( userData );
                    

                  const token =  generateToken( userData );
                  
                  res.status( 200 ).json( {
                      status: "Success",
                      message: "User registered  successfully",
                      data: obj,
                      token: token
                  } );
                  //res.status(200).json(obj);
              })
              .catch((reason) => {
                  if (reason.code = "ER_DUP_ENTRY") {
                      res.status(500).json({
                          status: "Error",
                          message: "the email or phone already exists. Please use another email for registration",
                          error: reason
                      });
                  }
                  else {
                      res.status(500).json({
                          status: "error",
                          message: "Something went wrong!",
                          error: reason
                      });
                  }
              });
        }
    };
}
export default UserController;