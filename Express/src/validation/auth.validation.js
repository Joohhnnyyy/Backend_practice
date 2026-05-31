import { body , validationResult } from "express-validator";


const validate =  (req,res,next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }

export const registerValidationRules = () => [
  body('username').isString().isLength({ min: 3 }).withMessage('Username must be at least 3 characters long'),
  body('email').isEmail().normalizeEmail().withMessage('Invalid email address'),
  body('password').custom((value) =>{
    if( value.length < 6 || value.length > 12){
        throw new Error('Password must be between 6 and 12 characters long');
    }
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,12}$/;
    if (!passwordRegex.test(value)) {
      throw new Error('Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character');
    }
  }).isLength({ min: 6 , max  : 12}).withMessage('Password must be at least 6 characters long'),
  validate
];