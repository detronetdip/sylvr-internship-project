import { Application, json, NextFunction, Request, Response } from 'express';
import { authorize } from '../utility/middleware/authorize';
import { excludedPaths, routes } from './route.data';
import { ResponseHandler } from '../utility/responseHandler';
import helmet from 'helmet';
import cors from 'cors';

export const registerRoutes = (app: Application) => {
  app.use(cors());
  app.use(helmet());
  app.use(json());
  app.use(authorize(excludedPaths));

  app.get('/healthcheck', (req: Request, res: Response, next: NextFunction) => {
    try {
      res.send({
        status: 'ok',
        uptime: process.uptime(),
        timestamp: Date.now(),
        memoryUsage: process.memoryUsage(),
        cpuUsage: process.cpuUsage(),
      });
    } catch (error) {
      next(error);
    }
  });

  for (let route of routes) {
    app.use(route.path, route.router);
  }

  app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    res.status(err.statusCode || 500).send(new ResponseHandler(null, err));
  });
};
