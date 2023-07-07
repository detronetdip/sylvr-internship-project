import { sign, SignOptions, verify } from "jsonwebtoken";
import { getPrivateKey, getPublicKey } from "./key";
import { Payload } from "./token.types";
const config: SignOptions = {
  algorithm: "RS256",
};

const generateToken = (payload: Payload, tokenConfig: SignOptions) => {
  const privatekey = getPrivateKey();
  const token = sign(payload, privatekey, tokenConfig);
  return token;
};

export const generateAccessToken = (payload: Payload) => {
  return generateToken(payload, {
    ...config,
    expiresIn: `${process.env.ACCESS_TOKEN_EXPIRY_TIME}s`,
  });
};

export const generateRefreshToken = (payload: Payload) => {
  return generateToken(payload, {
    ...config,
    expiresIn: `${process.env.REFRESH_TOKEN_EXPIRY_TIME}s`,
  });
};

export const verifyToken = (token: string): Payload => {
  const publicKey = getPublicKey();

  return verify(token, publicKey) as Payload;
};
