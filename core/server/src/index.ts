
import * as http from 'http';
import * as net from 'net';
import express, { Express, Request, Response, NextFunction } from 'express';

const createHttpServer = (
  listener: http.RequestListener,
  port?: number
): Promise<http.Server> => {
  const server = http.createServer(listener);
  return new Promise((resolve) => {
    server.listen(port, () => resolve(server));
  });
};

export const createServer = async (port: number) => {
  const app: Express = express();

  // ready middeware
  let isReady = false;
  app.use((req: Request, res: Response, next: NextFunction) => {
    if (isReady) {
      return next();
    }

    const timer = setInterval(() => {
      if (isReady) {
        clearInterval(timer);
        next();
      }
    }, 100);

    req.on("close", () => {
      clearInterval(timer);
    });
  });

  const server = await createHttpServer(app, port);

  return {
    app,
    server,
    isReady: () => isReady,
    static: (root: string) => {
      app.use(express.static(root));
    },
    setReady: (status = true) => {
      isReady = status;
    },
  }
}
