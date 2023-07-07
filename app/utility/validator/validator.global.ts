import { param } from "express-validator";
import { validate } from "./validate.errors";
export const PARAM_ID_VALIDATOR = [
  param("id").isMongoId().withMessage("id should be a valid objectId"),
  validate,
];