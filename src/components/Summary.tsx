import { useState } from "react";
import { ClipLoader } from "react-spinners";
import getTopLimeFeatures, {
  getTopIgFeatures,
  getTopShapFeatures,
} from "../helper/getTopFeatures";
import useExplainability from "../hooks/useExplainability";
import IgExp from "./IgExp";
import LimeExp from "./LimeExp";
import ShapExp from "./ShapExp";
import ImageDisplay from "../helper/ImageDisplay";
import SimilarityForm from "./SimilarityForm";
import LrpExp from "./LrpExp";
import FeatureChart from "./FeatureChart";

interface Props {
  flightId: string;
  timestamp: string;
}

type Tab = "lime" | "shap" | "integrated_gradients/lrp";

const Summary = ({ timestamp }: Props) => {
  const [activeTab, setActiveTab] = useState<Tab>("lime");

  const { data: jsonData, isLoading } = useExplainability(timestamp, "");

  const limeData =
    jsonData?.data_value["lime"][2] &&
    getTopLimeFeatures(jsonData?.data_value["lime"][2], 5);

  const shapData =
    jsonData?.data_value["shap"] &&
    getTopShapFeatures(
      jsonData?.data_value["shap"][0]?.data,
      jsonData?.data_value["shap"][0]?.values,
      5
    );

  const igData =
    jsonData?.data_value["integrated_gradients"] &&
    getTopIgFeatures(jsonData?.data_value["integrated_gradients"], 5);

  const lrpData =
    jsonData?.data_value["lrp"] &&
    getTopIgFeatures(jsonData?.data_value["lrp"], 5);

  return (
    <div>
      {isLoading ? (
        <div className="w-full h-[100px] flex justify-center items-center">
          <ClipLoader />
        </div>
      ) : (
        <>
          <div className="overflow-x-auto relative shadow-md sm:rounded-lg mb-6">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Explainability Summary (Highest to Lowest)
            </label>
            <div className="w-full flex">
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
                    <th scope="col" className="py-3 px-6">
                      LRP
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {limeData?.map((_: any, index: number) => (
                    <tr key={index} className="bg-white border-b text-center">
                      <td className="py-4 px-6">
                        {limeData && limeData[index]}
                      </td>
                      <td className="py-4 px-6">
                        {shapData && shapData[index]}
                      </td>
                      <td className="py-4 px-6">{igData && igData[index]}</td>
                      <td className="py-4 px-6">{lrpData && lrpData[index]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <ImageDisplay base64={jsonData?.similarity_matrix} />
            </div>
            <div>
              <FeatureChart
                limeData={limeData}
                shapData={shapData}
                igData={igData}
                lrpData={lrpData}
              />
            </div>
          </div>
          <div className="overflow-x-auto relative shadow-md sm:rounded-lg mb-6">
            <div className="flex space-x-1 m-4">
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
                  activeTab === "integrated_gradients/lrp"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200"
                }`}
                onClick={() => setActiveTab("integrated_gradients/lrp")}
              >
                IG & LRP
              </button>
            </div>

            {activeTab === "lime" && (
              <LimeExp limeData={jsonData?.data_value["lime"]} />
            )}
            {activeTab === "shap" && (
              <ShapExp
                shapData={jsonData?.data_value["shap"]}
                plot1={jsonData?.plot1}
                plot2={jsonData?.plot2}
              />
            )}
            {activeTab === "integrated_gradients/lrp" && (
              <>
                <div className="flex w-full justify-around">
                  <IgExp
                    igData={jsonData?.data_value["integrated_gradients"]}
                  />
                  <LrpExp lrpData={jsonData?.data_value["lrp"]} />
                </div>
              </>
            )}
          </div>
          <div>
            <SimilarityForm />
          </div>
        </>
      )}
    </div>
  );
};

export default Summary;

// Logic to send multiple API calls back and forth

// const [methodIndex, setMethodIndex] = useState(0);
// const [results, setResults] = useState<ResultsType>({});
// const [viewResults, setViewResults] = useState(false);
// const [isLoading, setIsLoading] = useState(false);
// const methods = ["lime", "shap", "integrated_gradients"];

// useEffect(() => {
//   setIsLoading(true);

//   const processMethod = async () => {
//     if (methodIndex < methods.length) {
//       if (methodIndex === 0 || results[methods[methodIndex - 1]]) {
//         console.log("Submitting Form");
//         try {
//           const submitResponse = await axiosInstance.get("/submit_form", {
//             params: {
//               flightId: flightId,
//               method: methods[methodIndex],
//             },
//             headers: { "ngrok-skip-browser-warning": "69420" },
//           });

//           console.log(submitResponse.status);
//           if (submitResponse.status === 200) {
//             setTimeout(async () => {
//               try {
//                 console.log("Getting Data");
//                 const explainResponse = await axiosInstance.get(
//                   "/get_explainability",
//                   {
//                     params: {
//                       timestamp: timestamp,
//                     },
//                     headers: { "ngrok-skip-browser-warning": "69420" },
//                   }
//                 );

//                 console.log("Explanation Data ", explainResponse.data);
//                 setResults((prevResults) => ({
//                   ...prevResults,
//                   [methods[methodIndex]]: explainResponse.data,
//                 }));

//                 // Move to the next method after getting the explainability data
//                 setMethodIndex(methodIndex + 1);
//               } catch (error) {
//                 console.error("Error Retrieving Data:", error);
//               }
//             }, 500); // 5000 milliseconds delay for get_explainability
//           }
//         } catch (error) {
//           console.error("Error Submitting Form:", error);
//         }
//       }
//     } else {
//       setIsLoading(false);
//       setActiveTab("lime");
//       setViewResults(true);
//     }
//   };

//   processMethod();
// }, [methodIndex]);

// useEffect(() => {
//   // Reset methodIndex to 0 when timestamp changes
//   setMethodIndex(0);
//   setViewResults(false);
//   setResults({}); // Also reset viewResults to start the process over
// }, [timestamp]); // Dependency array includes timestamp
