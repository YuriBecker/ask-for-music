import axios from "axios";
import useSWR from "swr";

const fetcher = (url) => axios.get(url).then((res) => res.data);

export function useRequestList() {
  const { data, error, isValidating } = useSWR("/api/requests", fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    refreshInterval: 120000,
  });

  return {
    data,
    isLoading: !error && !data,
    isError: error,
    isValidating,
  };
}

export function useSongsList() {
  const { data, error, isValidating } = useSWR("/api/songs", fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  return {
    data,
    isLoading: !error && !data,
    isError: error,
    isValidating,
  };
}
