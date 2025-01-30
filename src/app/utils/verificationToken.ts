import { verifyTokenExpiration } from "@/app/config/tokenExpirations";
import { randomUUID } from "crypto";
export function verificationToken() {
  const uuid = randomUUID();
  const data = {
    token: uuid,
    verifyTokenExpiration,
  };
  return data;
}
