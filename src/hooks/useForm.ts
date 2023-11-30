import { useMutation } from "react-query";
import axiosInstance from "../hooks/baseUrl";

const useForm = ({ flightId, method }: any) => {
  const mutation = useMutation(async () => {
    const response = await axiosInstance.get("/submit_form", {
      params: {
        flight_id: flightId,
        method: method,
      },
      headers: {
        "ngrok-skip-browser-warning": "69420",
      },
    });
    console.log(response.status);

    return response.data;
  });

  return mutation;
};

export default useForm;
