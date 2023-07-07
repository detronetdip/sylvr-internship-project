import { model } from 'mongoose';
import { BaseSchema } from '../../utility/baseSchema';
import { IUser } from './user.types';

const userSchema = new BaseSchema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
});

type UserDocument = Document & IUser;

export const UserModel = model<UserDocument>('user', userSchema);
