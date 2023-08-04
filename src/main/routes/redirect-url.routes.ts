import { Router } from 'express';
import { makeRedirectToOriginalUrlController } from '../factories/redirect-url.factory';
import { adaptRoute } from '../adapters/express/express-routes-redirect.adapter';

export default (router: Router): void => {
  const controller = makeRedirectToOriginalUrlController();
  router.get('/:code', adaptRoute(controller));
};
