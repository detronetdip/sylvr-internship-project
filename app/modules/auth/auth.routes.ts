import { NextFunction, Router, Request, Response } from "express";
import authService from "./auth.service";
import { ResponseHandler } from "../../utility/responseHandler";
import { LOGIN_VALIDATOR, REGISTRATION_VALIDATOR } from "./auth.validation";
import { Route } from "../../routes/route.types";

const route = Router();

route.post(
  "/register",
  REGISTRATION_VALIDATOR,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req.body;
      const result = await authService.register(user);
      res.send(new ResponseHandler(result));
    } catch (error) {
      next(error);
    }
  }
);

route.post(
  "/login",
  LOGIN_VALIDATOR,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const credential = req.body;
      const result = await authService.login(credential);
      res.send(new ResponseHandler(result));
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
);
route.post("/refresh", (req: Request, res: Response, next: NextFunction) => {
  try {
    const { refreshToken } = req.body;
    const result = authService.refreshToken(refreshToken);
    res.send(new ResponseHandler(result));
  } catch (error) {
    console.log(error);
    next(error);
  }
});

export default new Route("/auth", route);
