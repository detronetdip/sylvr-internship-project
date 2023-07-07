import { body } from "express-validator";
import { validate } from "../../utility/validator/validate.errors";

export const REGISTRATION_VALIDATOR = [
  body("firstName")
    .notEmpty()
    .withMessage("firstName is required")
    .isString()
    .withMessage("firstName should be string"),
    body("lastName")
    .notEmpty()
    .withMessage("lastName is required")
    .isString()
    .withMessage("lastName should be string"),
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("email should be valid"),
  body("password")
    .notEmpty()
    .withMessage("password is required")
    .isString()
    .withMessage("password should be string"),
  validate,
];

export const LOGIN_VALIDATOR = [
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("email should be valid"),
  body("password")
    .notEmpty()
    .withMessage("password is required")
    .isString()
    .withMessage("password should be string"),
  validate,
];

export const REFRESH_VALIDATOR = [
  body("token").isString().withMessage("token is required"),
  validate,
];