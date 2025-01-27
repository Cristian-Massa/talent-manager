import { HttpMethods } from "@/app/types/httpMethods";

export async function customFetch(
  endpoint: string,
  method: HttpMethods,
  body?: object | FormData // Permitir tanto FormData como objetos normales
) {
  try {
    const data = await fetch(endpoint, {
      method: method,
      headers:
        body instanceof FormData
          ? undefined // No se necesita encabezado adicional para FormData
          : { "Content-Type": "application/json" }, // Solo agrega esto para objetos JSON
      body:
        method === "GET"
          ? undefined
          : body instanceof FormData
          ? body
          : JSON.stringify(body),
      // credentials: process.env.NODE_ENV === "production" ? "include" : "omit",
    });

    if (!data.ok) {
      throw new Error("Fetch cannot be done");
    }
    const response = await data.json();
    return response;
  } catch (err) {
    return (err as Error).message;
  }
}
