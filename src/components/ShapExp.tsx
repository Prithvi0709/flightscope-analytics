import ImageDisplay from "../helper/ImageDisplay";

interface Props {
  jsonData: any;
}

function sortDictionaryAndArray(
  data: Record<string, number>,
  dataArray: number[]
): { sortedData: Record<string, number>; sortedArray: number[] } {
  // Create an array of objects that includes the key and value from the dictionary
  const dataArrayWithKeys = Object.keys(data).map((key) => ({
    key,
    value: data[key],
  }));

  // Sort the array based on the values in the dataArray
  dataArrayWithKeys.sort(
    (a, b) =>
      dataArray[dataArrayWithKeys.indexOf(a)] -
      dataArray[dataArrayWithKeys.indexOf(b)]
  );

  // Create a new sorted dictionary
  const sortedData: Record<string, number> = {};
  dataArrayWithKeys.forEach((item) => {
    sortedData[item.key] = item.value;
  });

  // Sort the dataArray
  const sortedArray = [...dataArray];
  sortedArray.sort((a, b) => a - b);

  return { sortedData, sortedArray };
}

const ShapExp = ({ jsonData }: Props) => {
  const shap_raw_data = jsonData?.data_value[0].data;
  const shapley_values = jsonData?.data_value[0].values;

  const {
    sortedData: sorted_shap_raw_data,
    sortedArray: sorted_shapley_values,
  } = sortDictionaryAndArray(shap_raw_data, shapley_values);

  return (
    <>
      <div className="mb-6 bg-white pt-6 pb-6 shadow-lg rounded-lg">
        <label className="block uppercase tracking-wide text-gray-700 text-xl font-bold mb-6">
          SHAP
        </label>
        {jsonData && (
          <>
            <div className="flex">
              <div className="overflow-x-auto w-[600px]">
                <table className="w-[400px] mx-auto leading-normal">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="px-5 py-3 border-b-2 border-gray-200 text-gray-800  text-center text-sm uppercase font-semibold">
                        Parameter
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 text-gray-800  text-center text-sm uppercase font-semibold">
                        Raw
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 text-gray-800  text-center text-sm uppercase font-semibold">
                        SHap Value
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(sorted_shap_raw_data).map(
                      ([key, value], index) => (
                        <tr key={key} className="hover:bg-gray-200">
                          <td className="px-5 py-3 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {key}
                            </p>
                          </td>
                          <td className="px-5 py-3 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {value}
                            </p>
                          </td>
                          <td className="px-5 py-3 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {sorted_shapley_values[index].toFixed(3)}
                            </p>
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
              <div className="flex flex-col">
                <ImageDisplay base64={jsonData?.plot1} />
                <ImageDisplay base64={jsonData?.plot2} />
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ShapExp;
