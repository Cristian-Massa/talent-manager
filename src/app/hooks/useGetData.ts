import { customFetch } from "@/app/services/fetchService";
import { useEffect, useState } from "react";

export function useGetData<T>(endpoint: string) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    if (!endpoint) return;
    async function getInfo() {
      const response = await customFetch(endpoint, "GET");
      if (response.error) {
        return setError(response.error);
      }
      setData(response);
    }
    getInfo();
  }, [endpoint]);
  return { data, error };
}
