"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const customErrorResponse_1 = __importDefault(require("../utills/customErrorResponse"));
const errorHandler = (err, req, res, next) => {
    let error = Object.assign({}, err);
    error.message = err.message;
    // Mongoose Cast to bad ObjectId
    if (error.kind === 'ObjectId') {
        const message = `Resource Not Found with provide id ${error.value}`;
        error = new customErrorResponse_1.default(message, 404);
    }
    // Mongoose Duplicate objectId
    if (error.code === 11000) {
        const message = `Duplicate Field value entered`;
        error = new customErrorResponse_1.default(message, 400);
    }
    res.status(error.statusCode || 500).json({
        success: false,
        error: error.message || 'Internal Server Error',
    });
};
exports.default = errorHandler;
