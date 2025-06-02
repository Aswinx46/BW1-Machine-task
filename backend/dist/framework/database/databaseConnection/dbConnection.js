"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectMongo = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class ConnectMongo {
    constructor() {
        if (process.env.MONGODB) {
            this.databaseUrl = process.env.MONGODB;
        }
        else {
            throw new Error("No mongodb url found");
        }
    }
    connectDb() {
        mongoose_1.default.connect(this.databaseUrl).then(() => console.log('DB Connected')).catch((err) => console.log(err));
    }
}
exports.ConnectMongo = ConnectMongo;
