import { useEffect, useState } from "react";
import axiosInstance from "../hooks/baseUrl";
import LimeExp from "./LimeExp";

interface Props {
  flightId: string;
  timestamp: string;
}

interface ResultsType {
  [key: string]: any; // Replace 'any' with a more specific type if known
}

interface LimeDataItem {
  feature: string;
  rawValue: number;
  attributionValue: number;
}

type DataDictionary = { [key: string]: number };

const Summary = ({ flightId, timestamp }: Props) => {
  const [methodIndex, setMethodIndex] = useState(0);
  const [results, setResults] = useState<ResultsType>({});
  const [viewResults, setViewResults] = useState(false);
  const methods = ["lime", "shap", "integrated_gradients"];

  useEffect(() => {
    if (methodIndex < methods.length) {
      const method = methods[methodIndex];
      console.log(method);

      // Delay the submit_form API call by 5 seconds
      setTimeout(() => {
        console.log("Submitting Form");

        // Submit Form API
        axiosInstance
          .get("/submit_form", {
            params: {
              flightId: flightId,
              method: method,
            },
            headers: { "ngrok-skip-browser-warning": "69420" },
          })
          .then((submitResponse) => {
            console.log(submitResponse.status);

            if (submitResponse.status === 200) {
              // Delay the get_explainability API call by 5 seconds
              setTimeout(() => {
                console.log("Getting Data");

                axiosInstance
                  .get("/get_explainability", {
                    params: {
                      timestamp: timestamp,
                    },
                    headers: { "ngrok-skip-browser-warning": "69420" },
                  })
                  .then((explainResponse) => {
                    console.log("Explanation Data ", explainResponse.data);

                    setResults((prevResults) => ({
                      ...prevResults,
                      [method]: explainResponse.data,
                    }));
                  })
                  .catch((error) => {
                    console.error("Error Retrieving Data:", error);
                  });

                // Move to the next method
                setMethodIndex(methodIndex + 1);
              }, 5000); // 5000 milliseconds delay for get_explainability
            }
          });
      }, 10000); // 5000 milliseconds delay for submit_form
    } else {
      setViewResults(true);
    }
  }, [methodIndex]);

  useEffect(() => {
    // Reset methodIndex to 0 when timestamp changes
    setMethodIndex(0);
    setViewResults(false);
    setResults({}); // Also reset viewResults to start the process over
  }, [timestamp]); // Dependency array includes timestamp

  function getTopLimeFeatures(data: any, n: number): string[] {
    const transformedData = data?.map(
      ([feature, rawValue, attributionValue]: LimeDataItem[]) => ({
        feature,
        rawValue,
        attributionValue,
      })
    );
    // Sort the data based on attribution values (ascending order)
    const sortedData = transformedData?.sort(
      (a: any, b: any) => b?.attributionValue - a?.attributionValue
    );

    // Filter out positive attributions and slice the first n elements
    return sortedData
      ?.filter((item: any) => item.attributionValue > 0)
      ?.slice(0, n)
      ?.map((item: any) => item.feature as string);
  }

  const limeData =
    results["lime"]?.data_value[2] &&
    getTopLimeFeatures(results["lime"]?.data_value[2], 5);
  console.log(limeData);

  function getTopShapFeatures(
    dictionary: DataDictionary,
    array: number[],
    n: number
  ): string[] {
    // Step 1: Combine the data
    const combinedData =
      dictionary &&
      Object.keys(dictionary).map((key, index) => ({
        label: key,
        value: dictionary[key],
        sortBy: array[index],
      }));

    // Step 2: Sort the combined data
    combinedData?.sort((a, b) => a.sortBy - b.sortBy);

    // Step 3: Extract the top N labels
    return combinedData?.slice(0, n)?.map((item) => item.label);
  }

  const shapData =
    results["shap"]?.data_value[0] &&
    getTopShapFeatures(
      results["shap"]?.data_value[0]?.data,
      results["shap"]?.data_value[0]?.values,
      5
    );
  console.log(shapData);

  function getTopIgFeatures(dictionary: DataDictionary, n: number): string[] {
    // Step 1: Filter negative values
    const negativeValues =
      dictionary &&
      Object.keys(dictionary)
        .filter((key) => dictionary[key] < 0)
        .map((key) => ({ label: key, value: dictionary[key] }));

    // Step 2: Sort the filtered data
    negativeValues?.sort((a, b) => a.value - b.value);

    // Step 3: Extract the top N labels
    return negativeValues?.slice(0, n)?.map((item) => item.label);
  }

  const igData =
    results["integrated_gradients"]?.data_value &&
    getTopIgFeatures(results["integrated_gradients"]?.data_value, 5);
  console.log(igData);

  const rows = limeData?.map((_: any, index: number) => (
    <tr key={index}>
      <td>{limeData && limeData[index]}</td>
      <td>{shapData && shapData[index]}</td>
      <td>{igData && igData[index]}</td>
    </tr>
  ));

  // Render component with results
  return (
    <div>
      {viewResults && (
        <>
          <table>
            <thead>
              <tr>
                <th>Lime</th>
                <th>Shap</th>
                <th>IG</th>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </table>
          <LimeExp jsonData={results["lime"]} />
        </>
      )}
    </div>
  );
};

export default Summary;
