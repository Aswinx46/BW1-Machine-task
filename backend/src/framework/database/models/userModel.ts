import { Document, model, ObjectId } from "mongoose";
import { UserType } from "../../../domain/entities/userEntity";
import { userSchema } from "../schemas/userSchema";

export interface IuserModel extends Omit<UserType, '_id'>, Document {
    _id: ObjectId
}

export const userModel=model<UserType>('users',userSchema)