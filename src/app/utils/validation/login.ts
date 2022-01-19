import { check } from 'express-validator';

export default [
    //check('email').isEmail(), 
    check('phone').isLength({ min: 7 }),
    check('password').isLength({ min: 8 })
];
