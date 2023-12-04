import { useState } from "react";
import "./App.css";
import Layout from "./Layout";
import PredictionChart from "./components/PredictionChart";
import FlightForm from "./components/FlightForm";
import Summary from "./components/Summary";
import useAuth from "./hooks/useAuth";

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
        <FlightForm
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
