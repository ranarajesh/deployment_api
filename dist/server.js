"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const db_1 = __importDefault(require("./config/db"));
const errorHandler_1 = __importDefault(require("./middleware/errorHandler"));
// Load env vars
dotenv_1.default.config({ path: __dirname + '/config/config.env' });
//connect to mongodb server
db_1.default(process.env.MONGO_URI || '');
//import routers files
const deployments_1 = __importDefault(require("./routes/deployments"));
const app = express_1.default();
// Body parser
app.use(express_1.default.json());
// Set static path
app.use(express_1.default.static(path_1.default.resolve('public/')));
// Mount routers
app.use('/api/v1/deployments', deployments_1.default);
//Error handler middleware
app.use(errorHandler_1.default);
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
// Handle UnhandledPromiseRejection error
process.on('unhandledRejection', (err) => {
    console.log(`${err}`);
    server.close(() => {
        process.exit(1);
    });
});
