import { useEffect, useState } from "react";
import axiosInstance from "../hooks/baseUrl";
import LimeExp from "./LimeExp";
import { ClipLoader } from "react-spinners";
import ShapExp from "./ShapExp";
import IgExp from "./IgExp";
import getTopLimeFeatures, {
  getTopIgFeatures,
  getTopShapFeatures,
} from "../helper/getTopFeatures";

interface Props {
  flightId: string;
  timestamp: string;
}

interface ResultsType {
  [key: string]: any; // Replace 'any' with a more specific type if known
}
type Tab = "lime" | "shap" | "integrated_gradients";

const Summary = ({ flightId, timestamp }: Props) => {
  const [methodIndex, setMethodIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<Tab>("lime");
  const [results, setResults] = useState<ResultsType>({});
  const [viewResults, setViewResults] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const methods = ["lime", "shap", "integrated_gradients"];

  useEffect(() => {
    setIsLoading(true);

    const processMethod = async () => {
      if (methodIndex < methods.length) {
        if (methodIndex === 0 || results[methods[methodIndex - 1]]) {
          console.log("Submitting Form");
          try {
            const submitResponse = await axiosInstance.get("/submit_form", {
              params: {
                flightId: flightId,
                method: methods[methodIndex],
              },
              headers: { "ngrok-skip-browser-warning": "69420" },
            });

            console.log(submitResponse.status);
            if (submitResponse.status === 200) {
              setTimeout(async () => {
                try {
                  console.log("Getting Data");
                  const explainResponse = await axiosInstance.get(
                    "/get_explainability",
                    {
                      params: {
                        timestamp: timestamp,
                      },
                      headers: { "ngrok-skip-browser-warning": "69420" },
                    }
                  );

                  console.log("Explanation Data ", explainResponse.data);
                  setResults((prevResults) => ({
                    ...prevResults,
                    [methods[methodIndex]]: explainResponse.data,
                  }));

                  // Move to the next method after getting the explainability data
                  setMethodIndex(methodIndex + 1);
                } catch (error) {
                  console.error("Error Retrieving Data:", error);
                }
              }, 500); // 5000 milliseconds delay for get_explainability
            }
          } catch (error) {
            console.error("Error Submitting Form:", error);
          }
        }
      } else {
        setIsLoading(false);
        setActiveTab("lime");
        setViewResults(true);
      }
    };

    processMethod();
  }, [methodIndex]);

  useEffect(() => {
    // Reset methodIndex to 0 when timestamp changes
    setMethodIndex(0);
    setViewResults(false);
    setResults({}); // Also reset viewResults to start the process over
  }, [timestamp]); // Dependency array includes timestamp

  const limeData =
    results["lime"]?.data_value[2] &&
    getTopLimeFeatures(results["lime"]?.data_value[2], 5);

  const shapData =
    results["shap"]?.data_value[0] &&
    getTopShapFeatures(
      results["shap"]?.data_value[0]?.data,
      results["shap"]?.data_value[0]?.values,
      5
    );

  const igData =
    results["integrated_gradients"]?.data_value &&
    getTopIgFeatures(results["integrated_gradients"]?.data_value, 5);

  return (
    <div>
      {isLoading && (
        <div className="w-full h-[100px] flex justify-center items-center">
          <ClipLoader />
        </div>
      )}
      {viewResults && (
        <>
          <div className="overflow-x-auto relative shadow-md sm:rounded-lg mb-6">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Explainability Summary (Highest to Lowest)
            </label>
            <table className="w-full text-sm text-center text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                <tr>
                  <th scope="col" className="py-3 px-6">
                    Lime
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Shap
                  </th>
                  <th scope="col" className="py-3 px-6">
                    IG
                  </th>
                </tr>
              </thead>
              <tbody>
                {limeData?.map((_: any, index: number) => (
                  <tr key={index} className="bg-white border-b text-center">
                    <td className="py-4 px-6">{limeData && limeData[index]}</td>
                    <td className="py-4 px-6">{shapData && shapData[index]}</td>
                    <td className="py-4 px-6">{igData && igData[index]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div>
            <div className="flex space-x-1 mb-4">
              <button
                className={`px-4 py-2 text-sm font-medium ${
                  activeTab === "lime"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200"
                }`}
                onClick={() => setActiveTab("lime")}
              >
                Lime
              </button>
              <button
                className={`px-4 py-2 text-sm font-medium ${
                  activeTab === "shap"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200"
                }`}
                onClick={() => setActiveTab("shap")}
              >
                Shap
              </button>
              <button
                className={`px-4 py-2 text-sm font-medium ${
                  activeTab === "integrated_gradients"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200"
                }`}
                onClick={() => setActiveTab("integrated_gradients")}
              >
                IG
              </button>
            </div>

            {activeTab === "lime" && <LimeExp jsonData={results["lime"]} />}
            {activeTab === "shap" && <ShapExp jsonData={results["shap"]} />}
            {activeTab === "integrated_gradients" && (
              <IgExp jsonData={results["integrated_gradients"]} />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Summary;
