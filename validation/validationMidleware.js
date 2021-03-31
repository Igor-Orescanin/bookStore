const { check } = require('express-validator');

const user = () => {
    return [
        check('fName').notEmpty().withMessage('First name is required').trim().escape(),
        check('lName').notEmpty().withMessage('Last name is required').trim().escape(),
        check('email','Email is required').isEmail().normalizeEmail(),
        check('zipCode').isNumeric().notEmpty().withMessage('Zip Code is required').trim().escape(),
        check('city').notEmpty().withMessage('City is required').trim().escape(),
        check('street').notEmpty().withMessage('Street is required').trim().escape(),
        check('number').isNumeric().notEmpty().withMessage('Number is required').trim().escape(),
        check('password', 'Password is required').isLength({min:4}).custom((val, {req}) => {
            if(val !== req.body.confirm_password) {
                throw new Error('Password is not matching')
            } else {
                return val;
            }
        })
    ]
}

module.exports = { user }