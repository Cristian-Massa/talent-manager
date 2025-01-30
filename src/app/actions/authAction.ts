"use server";
import { customFetch } from "@/app/services/fetchService";
import { redirect } from "next/navigation";
export async function authAction(formData: FormData, endpoint: string) {
  const email = formData.get("email");
  const password = formData.get("password");
  const result = await customFetch(process.env.BASE_URL + endpoint, "POST", {
    email,
    password,
  });
  if (result.redirectTo) {
    redirect(result.redirectTo);
  }
  return result;
}
