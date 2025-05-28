import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()

export class ConnectMongo {
    private databaseUrl: string
    constructor() {
        if (process.env.MONGODB) {
            this.databaseUrl = process.env.MONGODB
        } else {
            throw new Error("No mongodb url found")
        }
    }
    connectDb() {
        mongoose.connect(this.databaseUrl).then(() => console.log('DB Connected')).catch((err) => console.log(err))
    }
}