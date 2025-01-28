"use server";
import { customFetch } from "@/app/services/fetch";
// e: MouseEvent<HTMLButtonElement>,

export async function authAction(formData: FormData) {
  const email = formData.get("email");
  const password = formData.get("password");
  const result = await customFetch("http://localhost:3000/api/login", "POST", {
    email,
    password,
  });
  return result;
}
