import axios from "axios";
import useSWR from "swr";

const fetcher = (url) => axios.get(url).then((res) => res.data);

export function useRequestList() {
  const { data, error } = useSWR("/api/requests", fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: true,
    revalidateOnReconnect: false,
    refreshInterval: 120000,
  });

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
}

export function useSongsList() {
  const { data, error } = useSWR("/api/songs", fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
}
