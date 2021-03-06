import { check } from "express-validator";

export default [
    //check("email").isEmail(),
    check( "last_name" ).isLength( { min: 3 } ),
    check( "phone" ).isLength( { min: 6 } ),
    check("first_name").isLength({ min: 3 }),
    check("password").isLength({ min: 8 })
];
