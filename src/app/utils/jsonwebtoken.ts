import jsonwebtoken, { JwtPayload } from "jsonwebtoken";

export function readToken(token: string) {
  return jsonwebtoken.decode(token) as JwtPayload;
}

export function signToken(payload: object) {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("You need init JWT_SECRET in .env to use this function");
  }
  return jsonwebtoken.sign(payload, secret);
}
