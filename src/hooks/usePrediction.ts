import { useQuery } from "react-query";
import axiosInstance from "./baseUrl";

const usePrediction = (type: string) => {
  const getPredictions = () => {
    return axiosInstance
      .get("/get_predictions", {
        headers: {
          "ngrok-skip-browser-warning": "69420",
        },
        params: {
          value: type,
        },
      })
      .then((res) => res.data);
  };

  return useQuery<any, Error>({
    queryKey: ["predictions", type],
    queryFn: getPredictions,
    refetchOnWindowFocus: false,
  });
};

export default usePrediction;
