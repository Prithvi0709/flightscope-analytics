import { useQuery } from "react-query";
import axiosInstance from "./baseUrl";

const useExplainability = (timestamp: string, true_value: string) => {
  const getExplainability = () => {
    return axiosInstance
      .get("/get_explainability", {
        params: {
          timestamp: timestamp,
          true_value: true_value === "" ? null : true_value,
        },
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
