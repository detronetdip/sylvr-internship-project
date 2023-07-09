import authRoutes from "../modules/auth/auth.routes";
import userRoutes from "../modules/user/user.routes";
import { ExcludedPath, ExcludedPaths } from "./route.types";
import { Routes } from "./route.types";

export const routes: Routes = [authRoutes, userRoutes];

export const excludedPaths: ExcludedPaths = [
  new ExcludedPath("/auth/register", "POST"),
  new ExcludedPath("/auth/login", "POST"),
  new ExcludedPath("/auth/refresh", "POST"),
  new ExcludedPath("/healthcheck", "GET"),
];
