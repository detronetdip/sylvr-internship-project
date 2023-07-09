import { body } from "express-validator";
import { validate } from "../../utility/validator/validate.errors";

export const USER_UPDATE_VALIDATOR = [
  body("firstName")
    .optional()
    .isString()
    .withMessage("firstName should be string type."),
  body("lastName")
    .optional()
    .isString()
    .withMessage("lastName should be string type."),
  body("email").optional().isEmail().withMessage("Email should be valid."),
  body("password")
    .optional()
    .isString()
    .withMessage("password should be string type."),
  validate,
];
