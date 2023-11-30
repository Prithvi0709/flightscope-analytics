import { useState } from "react";
import "./App.css";
import Layout from "./Layout";
import LimeExp from "./components/LimeExp";
import PredictionChart from "./components/PredictionChart";
import Form from "./components/Form";
import ShapExp from "./components/ShapExp";
import IgExp from "./components/IgExp";
import useExplainability from "./hooks/useExplainability";
import { ClipLoader } from "react-spinners";
import useAuth from "./hooks/useAuth";

function App() {
  const [timestamp, setTimestamp] = useState<string>("");
  const [viewGraph, setViewGraph] = useState(false);

  const { data: key } = useAuth();
  console.log(key);

  const { data: jsonData, isLoading } = useExplainability(timestamp);
  console.log(jsonData?.method);

  let content;
  switch (jsonData?.method) {
    case "lime":
      content = <LimeExp jsonData={jsonData} />;
      break;
    case "shap":
      content = <ShapExp jsonData={jsonData} />;
      break;
    case "integrated_gradients":
      content = <IgExp jsonData={jsonData} />;
      break;
    default:
      content = <></>;
  }

  return (
    <>
      <Layout>
        <Form
          handleTimestamp={setTimestamp}
          handleViewGraph={(value) => setViewGraph(value)}
        />

        {viewGraph && (
          <PredictionChart
            handleOnClick={(timestamp) => setTimestamp(timestamp)}
          />
        )}

        {isLoading && (
          <div className="w-full h-[100px] flex justify-center items-center">
            <ClipLoader />
          </div>
        )}
        {content}
      </Layout>
    </>
  );
}

export default App;
