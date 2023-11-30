import React, { useEffect, useState } from "react";
import useForm from "../hooks/useForm";
import { BarLoader } from "react-spinners";

interface Props {
  handleTimestamp: (value: string) => void;
  handleViewGraph: (value: boolean) => void;
}

const Form = ({ handleTimestamp, handleViewGraph }: Props) => {
  const [flightId, setFlightId] = useState<string>(
    "2077_6196975_odd_egt_reading" // Set as default value for now
  );
  const [method, setTempMethod] = useState<string>("lime");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const { mutate, isLoading, isSuccess, isError } = useForm({
    flightId,
    method,
  });

  const handleFlightIdChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    handleViewGraph(false);
    setFlightId(e.target.value);
  };

  const handleMethodChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTempMethod(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate();
    if (isSuccess) {
      handleTimestamp("");
    }
    setTimeout(() => {
      handleViewGraph(true);
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
    <form
      onSubmit={handleSubmit}
      className=" mx-auto p-6 mb-6  bg-white shadow-md rounded-lg"
    >
      <div className="flex items-center -mx-3 mb-3">
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            Flight ID:
          </label>
          <select
            className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
            value={flightId}
            onChange={handleFlightIdChange}
          >
            <option value="2077_6196975_odd_egt_reading">
              2077_6196975_odd_egt_reading
            </option>
            <option value="3120_5499835_cht_3_oscillation">
              3120_5499835_cht_3_oscillation
            </option>
            <option value="4406_5078863_brief_rhythmic_pattern_on_egt5_toward_end_of_flight">
              4406_5078863_brief_rhythmic_pattern_on_egt5_toward_end_of_flight
            </option>
            <option value="13530_4885817_abnormal_rise_in_egt">
              13530_4885817_abnormal_rise_in_egt
            </option>
            <option value="3120_4614122_slight_engine_roughness">
              3120_4614122_slight_engine_roughness
            </option>
            <option value="3120_5110271_fluctuating_cht">
              3120_5110271_fluctuating_cht
            </option>
            <option value="5284_5437787_roughness_during_runup_and_flight_event">
              5284_5437787_roughness_during_runup_and_flight_event
            </option>
            <option value="13759_4883673_cht_#3">13759_4883673_cht_#3</option>
            <option value="13765_6386310_flap_overspeed">
              13765_6386310_flap_overspeed
            </option>
            <option value="21462_4725731_engine_analysis">
              21462_4725731_engine_analysis
            </option>
            <option value="25435_5317124_n478km_engine_data_analysis_06-30-2022.">
              25435_5317124_n478km_engine_data_analysis_06-30-2022.
            </option>
          </select>
        </div>

        <div className="w-full md:w-1/2 px-3">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            Method:
          </label>
          <select
            className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
            value={method}
            onChange={handleMethodChange}
          >
            <option value="lime">Lime</option>
            <option value="shap">Shap</option>
            <option value="integrated_gradients">IG</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-[100px] h-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Submit
        </button>
      </div>
      {isError && <p>Error Submitting Data</p>}
      {showSuccessMessage && (
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
          Data Uploaded
        </label>
      )}
      {isLoading && (
        <div className="w-full h-[20px] flex justify-center items-center">
          <BarLoader />
        </div>
      )}
    </form>
  );
};

export default Form;
