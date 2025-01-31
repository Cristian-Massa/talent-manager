import { customFetch } from "@/app/services/fetchService";
import { useEffect, useState } from "react";

export function useGetData<T>(endpoint: string) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  useEffect(() => {
    if (!endpoint) return;
    async function getInfo() {
      setIsLoading(true);
      const response = await customFetch(endpoint, "GET");
      if (response.error) {
        return setError(response.error);
      }
      setData(response);
      setIsLoading(false);
    }
    getInfo();
  }, [endpoint]);
  return { data, error, isLoading };
}
