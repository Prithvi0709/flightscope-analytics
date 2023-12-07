import { useState } from "react";
import { ClipLoader } from "react-spinners";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import CustomTick, { formatDate, formatTime } from "../helper/format";
import useExplainability from "../hooks/useExplainability";

interface Props {
  limeData: any;
  shapData: any;
  igData: any;
  lrpData: any;
}

const FeatureChart = ({ limeData, shapData, igData, lrpData }: Props) => {
  const temp = [...limeData, ...shapData, ...igData, ...lrpData];
  const uniqueFeatures = [...new Set(temp)];
  const features = uniqueFeatures.filter((item) => item !== "E1 %Pwr");
  const [currFeature, setCurrFeature] = useState(features[0]);

  const {
    data: feature,
    error,
    isLoading,
  } = useExplainability("2022-09-05 22:45:36", features.join(","));

  console.log(feature?.data_value?.integrated_gradients[currFeature]);

  const data =
    feature?.data_value &&
    Object.entries(feature?.data_value?.integrated_gradients[currFeature]).map(
      ([timestamp, trueVal]) => ({
        timestamp,
        trueVal: trueVal,
      })
    );

  console.log(data);

  const handleFeatureChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrFeature(e.target.value);
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const formattedTime = formatTime(label);
      const formattedDate = formatDate(label);
      return (
        <div
          className="custom-tooltip"
          style={{
            backgroundColor: "#fff",
            padding: "10px",
            border: "1px solid #ccc",
          }}
        >
          <p>{`${formattedDate} ${formattedTime}`}</p>
          <p>Value: {payload[0].value}</p>
        </div>
      );
    }

    return null;
  };

  return (
    <>
      <div className="">
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
          Feature Graph
        </label>
        <select
          className="block m-4 w-fit bg-white border border-gray-400 hover:border-gray-500 pl-3 py-2 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
          value={currFeature}
          onChange={handleFeatureChange}
        >
          {features.map((val, index) => (
            <option value={val} key={index}>
              {val}
            </option>
          ))}
        </select>
        <div className="overflow-x-scroll mb-4">
          {error && <p className="text-red-600">{error.message}</p>}
          {isLoading ? (
            <div className="w-full h-[100px] flex justify-center items-center">
              <ClipLoader />
            </div>
          ) : (
            <>
              <AreaChart
                width={8000}
                height={300}
                className="mt-3 mb-3"
                data={data}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                    {/* <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0} /> */}
                    <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="timestamp" tick={<CustomTick />} />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="trueVal"
                  stroke="#82ca9d"
                  fillOpacity={1}
                  fill="url(#colorUv)"
                />
              </AreaChart>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default FeatureChart;
