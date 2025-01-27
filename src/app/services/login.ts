import { customFetch } from "@/app/services/fetch";
import { MouseEvent } from "react";

export function login(e: MouseEvent<HTMLButtonElement>, userData: object) {
  e.preventDefault();
  customFetch("/api/login", "POST", userData);
}
