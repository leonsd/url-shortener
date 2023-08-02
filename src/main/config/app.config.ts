import express from 'express';
import setupMiddlewares from './middleware.config';

const app = express();
setupMiddlewares(app);

export default app;
