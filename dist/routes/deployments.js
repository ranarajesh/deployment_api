"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const deployments = express_1.default.Router();
//Import deployments controller files
const deployments_1 = require("../controllers/deployments");
deployments.route('/').get(deployments_1.getDeployments).post(deployments_1.createDeployment);
deployments
    .route('/:id')
    .get(deployments_1.getDeployment)
    .delete(deployments_1.deleteDeployment)
    .put(deployments_1.updateDeployment);
exports.default = deployments;
