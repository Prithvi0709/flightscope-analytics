import React, { useEffect, useState } from "react";
import useForm from "../hooks/useForm";
import { BarLoader } from "react-spinners";

interface Props {
  handleTimestamp: (value: string) => void;
  handleViewResults: (value: boolean) => void;
  handleFlightId: (value: string) => void;
}

const FlightForm = ({
  handleTimestamp,
  handleViewResults,
  handleFlightId,
}: Props) => {
  const [flightId, setFlightId] = useState<string>(
    "2077_6196975_odd_egt_reading" // Set as default value for now
  );
  const method = "lime";
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const { mutate, isLoading, isSuccess, isError } = useForm({
    flightId,
    method,
  });

  const description: Record<string, string> = {
    "2077_6196975_odd_egt_reading":
      "Last flight one of the EGT's was out of line with the others. Typically, they all tend to cluster together pretty well, especially flying lean of peak. This was not the case on my last flight.",
    "3120_5110271_fluctuating_cht":
      "CHT fluctuated on recent flights. Note that the flights before and after these flights did not have the fluctuation.",
    "13765_6386310_flap_overspeed":
      "I'm concerned that I might have accidentally deployed full flaps at an airspeed above the limit of 110 KIAS near the end of this flight.  Is there any way to tell what the flap configuration was by looking at the recorded data?  The flap extension occured somewhere between 30:31 and 31:43 in this data set when the KIAS varied from 143KIAS to 86KIAS.",
    "5284_5437787_roughness_during_runup_and_flight_event":
      "My Trend Report is saying I am starting to run hotter than normal. I just replaced a sparkplug a couple of months ago but want to make sure I don't have any significant events. On the flight I am asking to review: Around the 1:29:00 point, I experienced roughness but I believe it was due to an increasing OAT. I fixed it with FF.",
    "13530_4885817_abnormal_rise_in_egt":
      "At 2:31:43 EGT #6 increased from 1426° to 1549° (+123°) over a period of about 1 minute and remained there for about 1m 57s at which point I went full rich on the mixture to cool the EGTs. The EGT responded to the full rich mixture (cooling to the high 1200s), however the delta (in relation to the other EGTs) didn't recover back to normal until after an additional 2m30s. Possible injector problem or something more extensive.",
  };

  const handleFlightIdChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    handleViewResults(false);
    setFlightId(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate();
    handleFlightId(flightId);
    if (isSuccess) {
      handleTimestamp("");
    }
    setTimeout(() => {
      handleViewResults(true);
    }, 3000);
  };

  useEffect(() => {
    if (isSuccess) {
      setShowSuccessMessage(true);
      const timer = setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000); // Adjust the time as needed

      return () => clearTimeout(timer); // Clean up the timer
    }
  }, [isSuccess]);

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className=" mx-auto p-6 mb-6  bg-white shadow-md rounded-lg"
      >
        <div className="flex justify-between">
          <div>
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Pilot's Comments
            </label>
            <div className="w-[500px] mx-auto">
              <p className="text-xs">{description[flightId]}</p>
            </div>
          </div>
          <div>
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Flight ID:
            </label>
            <div className="flex items-center justify-center -mx-3 mb-3">
              <div className="w-fit px-3">
                <select
                  className="block w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                  value={flightId}
                  onChange={handleFlightIdChange}
                >
                  <option value="2077_6196975_odd_egt_reading">
                    2077_6196975_odd_egt_reading
                  </option>
                  <option value="3120_5110271_fluctuating_cht">
                    3120_5110271_fluctuating_cht
                  </option>
                  <option value="13765_6386310_flap_overspeed">
                    13765_6386310_flap_overspeed
                  </option>
                  <option value="5284_5437787_roughness_during_runup_and_flight_event">
                    5284_5437787_roughness_during_runup_and_flight_event
                  </option>
                  <option value="13530_4885817_abnormal_rise_in_egt">
                    13530_4885817_abnormal_rise_in_egt
                  </option>
                </select>
              </div>

              <button
                type="submit"
                className="w-[100px] h-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Submit
              </button>
            </div>
            {isError && (
              <label className="block uppercase tracking-wide text-red-600 text-xs font-bold mb-2">
                Error Submitting Data
              </label>
            )}
            {showSuccessMessage && (
              <label className="block uppercase tracking-wide text-green-600 text-xs font-bold mb-2">
                Data Uploaded
              </label>
            )}
            {isLoading && (
              <div className="w-full h-[20px] flex justify-center items-center">
                <BarLoader />
              </div>
            )}
          </div>
        </div>
      </form>
    </>
  );
};

export default FlightForm;
