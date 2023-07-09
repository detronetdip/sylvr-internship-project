import { FilterQuery, UpdateQuery } from "mongoose";
import userRepo from "./user.repo";
import { IUser } from "./user.types";

const createUser = (user: IUser) => userRepo.create(user);

const findOne = (filter: FilterQuery<IUser>) => userRepo.findOne(filter);

const update = (filter: FilterQuery<IUser>, updateQuery: UpdateQuery<IUser>) =>
  userRepo.findOneAndUpdate(filter, updateQuery);

const updateUserDetails = (user: IUser) =>
  update({ _id: user._id }, { $set: user });

const getUserDetails = async (userId: string) => {
  const user = await findOne({ _id: userId });
  if (!user) throw { statusCode: 404, msg: "User not found" };
  const { _id, firstName, lastName, email } = user;
  return { _id, firstName, lastName, email };
};

export default {
  createUser,
  findOne,
  updateUserDetails,
  getUserDetails
};
