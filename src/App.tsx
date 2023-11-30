import { useState } from "react";
import "./App.css";
import Layout from "./Layout";
import Form from "./components/Form";
import PredictionChart from "./components/PredictionChart";
import Summary from "./components/Summary";
import useAuth from "./hooks/useAuth";

function App() {
  const [timestamp, setTimestamp] = useState<string>("");
  const [flightId, setFlightId] = useState<string>(
    "2077_6196975_odd_egt_reading" // Set as default value for now
  );
  const [viewGraph, setViewGraph] = useState(false);

  const { data: key } = useAuth();
  console.log(key);

  // const { data: jsonData, isLoading } = useExplainability(timestamp);
  // console.log(jsonData?.method);

  // let content;
  // switch (jsonData?.method) {
  //   case "lime":
  //     content = <LimeExp jsonData={jsonData} />;
  //     break;
  //   case "shap":
  //     content = <ShapExp jsonData={jsonData} />;
  //     break;
  //   case "integrated_gradients":
  //     content = <IgExp jsonData={jsonData} />;
  //     break;
  //   default:
  //     content = <></>;
  // }

  return (
    <>
      <Layout>
        <Form
          handleTimestamp={setTimestamp}
          handleViewGraph={(value) => setViewGraph(value)}
          handleFlightId={(value) => setFlightId(value)}
        />

        {viewGraph && (
          <PredictionChart
            handleOnClick={(timestamp) => setTimestamp(timestamp)}
          />
        )}

        {/* {isLoading && (
          <div className="w-full h-[100px] flex justify-center items-center">
            <ClipLoader />
          </div>
        )} */}
        {/* <Summary timestamp={timestamp} flightId={flightId} /> */}
        {timestamp != "" && (
          <Summary flightId={flightId} timestamp={timestamp} />
        )}
      </Layout>
    </>
  );
}

export default App;
