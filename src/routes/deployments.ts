import express, { Router } from 'express';
const deployments: Router = express.Router();

//Import deployments controller files
import {
  getDeployments,
  createDeployment,
  deleteDeployment,
  getDeployment,
  updateDeployment,
} from '../controllers/deployments';

deployments.route('/').get(getDeployments).post(createDeployment);
deployments
  .route('/:id')
  .get(getDeployment)
  .delete(deleteDeployment)
  .put(updateDeployment);

export default deployments;
