import { useQuery } from "react-query";
import axiosInstance from "./baseUrl";

const useAuth = () => {
  const getAuth = () => {
    return axiosInstance
      .get("/auth", {
        params: {
          username: "6IIXU",
          password: "Qw2OHNk4QQ55",
        },
        headers: {
          "ngrok-skip-browser-warning": "69420",
        },
      })
      .then((res) => res.data)
      .catch((error) => console.log(error));
  };

  return useQuery({
    queryKey: ["auth"],
    queryFn: getAuth,
    refetchOnWindowFocus: false,
  });
};

export default useAuth;
