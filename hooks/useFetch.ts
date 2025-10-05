"use client";
import { useState, useEffect, useCallback } from "react";
type HTTPMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
type ApiResponse = {
  success: boolean;
  message: string;
};
const useFetch = <T>(
  url: string | null,
  options?: RequestInit,
  disableFetch = false,
  defaultToArray = false
) => {
  const [data, setData] = useState<T | T[]>(
    defaultToArray ? ([] as T[]) : (null as T)
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    if (!url || disableFetch) return;

    try {
      setLoading(true);
      setError(null);
      console.info(`🔄 Fetching data from: ${url}`);

      const response = await fetch(url, options);
      if (!response.ok)
        throw new Error(`Error ${response.status}: ${response.statusText}`);

      const result: T | T[] = await response.json();
      setData(result);

      return result;
    } catch (error) {
      setError(error instanceof Error ? error.message : "Unknown error");
      console.error("❌ Fetch error:", error);
      return null;
    } finally {
      setLoading(false);
    }
  }, [url, disableFetch, options]);

  useEffect(() => {
    fetchData();
  }, [url, disableFetch, fetchData]);

  const sendRequest = useCallback(
    async <R extends ApiResponse>(
      method: HTTPMethod,
      requestUrl: string,
      body?: object,
      headers: Record<string, string> = {}
    ): Promise<R> => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(requestUrl, {
          method,
          headers: { "Content-Type": "application/json", ...headers },
          body: body ? JSON.stringify(body) : undefined,
        });

        const result = await response.json();
        console.log(`📩 Status API: ${response.status}`, result);

        if (!response.ok) {
          setError(result.message || `Error ${response.status}`);
          return result;
        }

        return result;
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Unknown error";
        console.error("❌ Błąd:", errorMessage);
        setError(errorMessage);
        return { success: false, message: errorMessage } as R;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return {
    data,
    loading,
    error,
    setError,
    fetchData,
    postData: (
      url: string,
      body: object,
      headers: Record<string, string> = {}
    ) => sendRequest<ApiResponse>("POST", url, body, headers),

    deleteData: (
      url: string,
      body?: object,
      headers: Record<string, string> = {}
    ) => sendRequest("DELETE", url, body, headers),
    patchData: (
      url: string,
      body: object,
      headers: Record<string, string> = {}
    ) => sendRequest("PATCH", url, body, headers),
    putData: (
      url: string,
      body: object,
      headers: Record<string, string> = {}
    ) => sendRequest("PUT", url, body, headers),
  };
};

export default useFetch;
