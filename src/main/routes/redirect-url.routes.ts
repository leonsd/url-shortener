import { Router } from 'express';
import { makeRedirectController } from '../factories/redirect-url.factory';
import { adaptRoute } from '../adapters/express/express-routes-redirect.adapter';

export default (router: Router): void => {
  const controller = makeRedirectController();
  router.get('/:code', adaptRoute(controller));
};
