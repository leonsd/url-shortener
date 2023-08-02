import app from './config/app.config';
import { env } from './config/env.config';

app.listen(env.port, () => console.log(`Server started in port ${env.port}`));
