import { Router } from 'express';
import { makeShortenerController } from '../factories/shortener.factory';
import { adaptRoute } from '../adapters/express-routes.adapter';

export default (router: Router): void => {
  const controller = makeShortenerController();
  router.post('/shortener', adaptRoute(controller));
};
