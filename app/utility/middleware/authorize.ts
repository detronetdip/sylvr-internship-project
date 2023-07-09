import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../token/token";
import { ExcludedPaths } from "../../routes/route.types";

export const authorize = (excludedPaths: ExcludedPaths) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      if (
        excludedPaths.find((e) => e.path == req.path && e.method == req.method)
      ) {
        return next();
      }
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) return next({ message: "UNAUTHORIZED", statusCode: 401 });

      const data = verifyToken(token || "");
      if (data) res.locals.user = data;
      next();
    } catch (e) {
      console.log(e);
      next({ message: "UNAUTHORIZED", statusCode: 401,code: 3000});
    }
  };
};
