"use server";
import { customFetch } from "@/app/services/fetchService";
import { redirect } from "next/navigation";
export async function confirmRegisterAction(formData: FormData) {
  const token = formData.get("registerConfirmToken");
  const userInfo = formData.get("userInfoToken");
  const result = await customFetch(
    process.env.BASE_URL + "/api/confirm-register",
    "POST",
    {
      token,
      userInfo,
    }
  );
  if (result.redirectTo) {
    redirect(result.redirectTo);
  }
  return result;
}
