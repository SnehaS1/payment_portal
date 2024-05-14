import jwt from "jsonwebtoken";
import { jwtVerify } from "jose";
import { get } from "http";

export function getJwtSecretKey() {
  const secret = process.env.TOKEN_SECRET;
  if (!secret) {
    throw new Error("JWT Secret key is not matched");
  }
  return new TextEncoder().encode(secret);
}

export async function verifyJwtToken(token) {
  try {
    const tokensecret = getJwtSecretKey();
    const { payload } = await jwt.verify(token, tokensecret);

    return payload;
  } catch (error) {
    return null;
  }
}
