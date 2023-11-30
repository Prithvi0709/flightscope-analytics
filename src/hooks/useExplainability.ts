import { useQuery } from "react-query";
import axiosInstance from "./baseUrl";

const useExplainability = (timestamp: string) => {
  const getExplainability = () => {
    return axiosInstance
      .get("/get_explainability", {
        params: { timestamp: timestamp },
        headers: { "ngrok-skip-browser-warning": "69420" },
      })
      .then((res) => res.data);
  };

  return useQuery<any, Error>({
    queryKey: ["explainability", timestamp],
    queryFn: getExplainability,
    refetchOnWindowFocus: false,
    enabled: timestamp !== "",
  });
};

export default useExplainability;
