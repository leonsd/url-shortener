import { Application, Router } from 'express';
import fg from 'fast-glob';

export default (app: Application) => {
  const router = Router();
  app.use(router);

  fg.sync('**/src/main/routes/**.routes.ts').map(async (filePath) => {
    (await import(`../../../${filePath}`)).default(router);
  });
};
