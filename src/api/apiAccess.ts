import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const fetchPokeData = async (url: string) => {
  const response = await fetch(url);
  return await response.json();
};

const connectBackend = (url: string, key = "key") => {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: [key],
    queryFn: async () => {
      const result = await axios.get(url);
      return result;
    },
  });
  return { data, isLoading, isFetching };
};

export { fetchPokeData, connectBackend };
