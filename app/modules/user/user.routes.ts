import { Router, Request, Response, NextFunction } from "express";
import { ResponseHandler } from "../../utility/responseHandler";
import userService from "./user.service";
import { PARAM_ID_VALIDATOR } from "../../utility/validator/validator.global";
import { USER_UPDATE_VALIDATOR } from "./user.validation";
import { Route } from "../../routes/route.types";

const route = Router();

route.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = res.locals.user.id;
    const result = await userService.getUserDetails(userId);
    res.send(new ResponseHandler(result));
  } catch (error) {
    console.log(error);
    next(error);
  }
});

route.patch(
  "/",
  USER_UPDATE_VALIDATOR,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req.body;
      const userId = res.locals.user.id;
      const result = await userService.updateUserDetails({
        ...user,
        _id: userId,
      });
      res.send(new ResponseHandler(result));
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
);


export default new Route("/user", route);
