import { HttpMethods } from "@/app/types/httpMethods";

export async function customFetch(
  endpoint: string,
  method: HttpMethods,
  body?: object | FormData
) {
  try {
    const data = await fetch(endpoint, {
      method: method,
      headers:
        body instanceof FormData
          ? undefined
          : { "Content-Type": "application/json" },
      body:
        method === "GET"
          ? undefined
          : body instanceof FormData
          ? body
          : JSON.stringify(body),
      // credentials: process.env.NODE_ENV === "production" ? "include" : "omit",
    });

    const response = await data.json();
    if (!data.ok) {
      throw new Error(response.error);
    }
    return response;
  } catch (err) {
    return { error: (err as Error).message };
  }
}
