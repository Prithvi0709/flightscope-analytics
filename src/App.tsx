import { useState } from "react";
import "./App.css";
import Layout from "./Layout";
import Form from "./components/Form";
import PredictionChart from "./components/PredictionChart";

import useAuth from "./hooks/useAuth";
import Summary from "./components/Summary";

function App() {
  const [timestamp, setTimestamp] = useState<string>("");
  const [flightId, setFlightId] = useState<string>(
    "2077_6196975_odd_egt_reading" // Set as default value for now
  );
  const [viewResults, setViewResults] = useState(false); // Viewing the Graph and Explainability Summary

  const { data: key } = useAuth(); // Performing User Authorization
  console.log(key);

  return (
    <>
      <Layout>
        <Form
          handleTimestamp={setTimestamp}
          handleViewResults={(value) => setViewResults(value)}
          handleFlightId={(value) => setFlightId(value)}
        />

        {viewResults && (
          <>
            <PredictionChart
              handleOnClick={(timestamp) => setTimestamp(timestamp)}
            />

            {timestamp != "" && (
              <Summary flightId={flightId} timestamp={timestamp} />
            )}
          </>
        )}
      </Layout>
    </>
  );
}

export default App;
