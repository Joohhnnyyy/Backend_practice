import express from 'express';
import authRouter from './routes/auth.routes.js';
import handleErrors from './middleware/errorHandler.middleware.js';

const app = express();
app.use(express.json());
app.use('/api/auth', authRouter);

app.use(handleErrors);
export default app;