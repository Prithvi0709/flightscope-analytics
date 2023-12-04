import { useMutation } from "react-query";
import axiosInstance from "../hooks/baseUrl";

const useSimilarity = ({ features, samples }: any) => {
  const mutation = useMutation(async () => {
    const response = await axiosInstance.get("/get_similarity_plot", {
      params: {
        features: features,
        samples: samples,
      },
      headers: {
        "ngrok-skip-browser-warning": "69420",
      },
    });
    console.log(response);

    return response.data;
  });

  return mutation;
};

export default useSimilarity;
