"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const DeploymentSchema = new mongoose_1.Schema({
    templateName: {
        type: String,
        required: [true, 'Please enter template name field'],
        unique: true,
        trim: true,
        maxlength: [70, 'Template Name  should not more than 70 character'],
    },
    version: {
        type: [String],
        // validate: {
        //   validator: (v: any) => {
        //     return v.length && /^([0-9]+)\.([0-9]+)\.([0-9]+)?$/.test(v);
        //   },
        //   message: () => `Please provide valid version for deployment`,
        // },
        required: [true, 'Please provide version for deployment'],
        trim: true,
    },
    url: {
        type: String,
        match: [
            /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
            'Please add a valid deployment url',
        ],
    },
    deployedAt: {
        type: Date,
        default: new Date(),
    },
});
const Deployment = mongoose_1.default.model('Deployment', DeploymentSchema);
exports.default = Deployment;
