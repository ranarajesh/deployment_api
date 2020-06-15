import express, { Application, Response, Request, NextFunction } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import connectDb from './config/db';
import errorHandler from './middleware/errorHandler';

// Load env vars
dotenv.config({ path: __dirname + '/config/config.env' });
//connect to mongodb server
connectDb(process.env.MONGO_URI || '');

//import routers files
import deployments from './routes/deployments';

const app: Application = express();
// Body parser
app.use(express.json());

// Set static path
app.use(express.static(path.resolve('public/')));

// Mount routers
app.use('/api/v1/deployments', deployments);

//Error handler middleware
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, (): void => {
  console.log(`Server is running on port ${PORT}`);
});

// Handle UnhandledPromiseRejection error
process.on('unhandledRejection', (err) => {
  console.log(`${err}`);
  server.close(() => {
    process.exit(1);
  });
});
