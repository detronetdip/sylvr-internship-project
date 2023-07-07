import { compare, genSalt, hash } from "bcryptjs";
import { AUTH_RESPONSES } from "./auth.responses";
import { ICredential } from "./auth.types";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyToken,
} from "../../utility/token/token";
import { IUser } from "../user/user.types";
import userService from "../user/user.service";

const encryptPassword = async (user: IUser) => {
  const salt = await genSalt(10);
  const encryptedPassword = await hash(user.password, salt);
  user.password = encryptedPassword;
};

const register = async (user: IUser) => {
  try {
    await encryptPassword(user);
    const oldUser = await userService.findOne({ email: user.email });
    if (oldUser) throw AUTH_RESPONSES.ALREADY_EXISTS;
    const { _id, email, firstName, lastName } = await userService.createUser(
      user
    );
    return { _id, email, firstName, lastName };
  } catch (error: any) {
    if (error.code === 11000) throw AUTH_RESPONSES.ALREADY_EXISTS;
    else throw error;
  }
};

const login = async (credential: ICredential) => {
  const user = await userService.findOne({ email: credential.email });
  if (!user) throw AUTH_RESPONSES.INVALID_CREDENTIALS;
  const isPasswordValid = await compare(credential.password, user.password);
  if (!isPasswordValid) throw AUTH_RESPONSES.INVALID_CREDENTIALS;
  const accessToken = generateAccessToken({
    id: user._id,
    name: user.firstName + " " + user.lastName,
    email: user.email,
  });
  const refreshToken = generateRefreshToken({
    id: user._id,
    name: user.firstName + " " + user.lastName,
    email: user.email,
  });
  return {
    accessToken,
    refreshToken,
  };
};

const refreshToken = (token: string) => {
  const payload = verifyToken(token);
  if (!payload) throw AUTH_RESPONSES.INVALID_TOKEN;
  const accessToken = generateAccessToken({
    id: payload.id,
    name: payload.name,
    email: payload.email,
  });
  return { accessToken };
};

export default {
  login,
  refreshToken,
  register,
};
