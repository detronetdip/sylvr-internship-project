import { FilterQuery, UpdateQuery } from "mongoose";
import { UserModel } from "./user.schema";
import { IUser } from "./user.types";

const create = (user: IUser) => UserModel.create(user);

const findOne = (filter: FilterQuery<IUser>) => UserModel.findOne(filter);

const findOneAndUpdate = (
  filter: FilterQuery<IUser>,
  updateQuery: UpdateQuery<IUser>
) => UserModel.findOneAndUpdate(filter, updateQuery);


export default {
  create,
  findOne,
  findOneAndUpdate,
};