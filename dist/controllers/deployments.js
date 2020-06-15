"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDeployment = exports.updateDeployment = exports.getDeployment = exports.createDeployment = exports.getDeployments = void 0;
const Deployment_1 = __importDefault(require("../models/Deployment"));
const asyncHandler_1 = __importDefault(require("../middleware/asyncHandler"));
const customErrorResponse_1 = __importDefault(require("../utills/customErrorResponse"));
/**
 * * getDeployments
 * * @desc    Get all Deployment list
 * * @route   GET /api/v1/deployments
 * * @access  Public
 */
exports.getDeployments = asyncHandler_1.default((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let deployments = yield Deployment_1.default.find();
    res.status(200).send({
        success: true,
        data: deployments,
    });
}));
/**
 * * createDeployment
 * * @desc    Create  Deployment
 * * @route   POST /api/v1/deployments
 * * @access  Public
 */
exports.createDeployment = asyncHandler_1.default((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    let deployment = yield Deployment_1.default.create(body);
    res.status(201).send({
        success: true,
        data: deployment,
    });
}));
/**
 * * getDeployment
 * * @desc    Get single Deployment list
 * * @route   GET /api/v1/deployments/:id
 * * @access  Public
 */
exports.getDeployment = asyncHandler_1.default((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    let deployment = yield Deployment_1.default.findById(id);
    if (!deployment) {
        return next(new customErrorResponse_1.default(`Deployment id is not found with id : ${id}`, 404));
    }
    return res.status(200).send({
        success: true,
        data: deployment,
    });
}));
/**
 * * updateDeployment
 * * @desc    Update  Deployment
 * * @route   PUT  /api/v1/deployments/:id
 * * @access
 * @param id
 */
exports.updateDeployment = asyncHandler_1.default((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    let deployment = yield Deployment_1.default.findById(id);
    if (!deployment) {
        return next(new customErrorResponse_1.default(`Deployment id is not found with id : ${id}`, 404));
    }
    let versions = deployment === null || deployment === void 0 ? void 0 : deployment.version;
    let newVersion = body.version;
    let _isVersionExists = versions.includes(newVersion);
    // check for version already exists
    if (_isVersionExists) {
        return next(new customErrorResponse_1.default(`This version of Deployment is already exists `, 404));
    }
    body.version = versions === null || versions === void 0 ? void 0 : versions.concat([body.version]);
    deployment = yield Deployment_1.default.findByIdAndUpdate(id, body, {
        new: true,
        runValidators: true,
    });
    res.status(200).json({
        success: true,
        data: deployment,
    });
}));
/**
 * * deleteDeployment
 * * @desc    Delete  Deployment
 * * @route   Delete /api/v1/deployments
 * * @access
 * @param id
 */
exports.deleteDeployment = asyncHandler_1.default((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    let deployment = yield Deployment_1.default.deleteOne({ _id: id });
    res.status(200).json({
        success: true,
        data: {},
    });
}));
