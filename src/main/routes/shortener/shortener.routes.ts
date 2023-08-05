import { Router } from 'express';
import { makeShortenerController } from '../../factories/shortener.factory';
import { adaptRoute } from '../../adapters/express/express-routes-json.adapter';

export default (router: Router): void => {
  const controller = makeShortenerController();
  router.post('/shortener', adaptRoute(controller));
};
