interface Props {
  jsonData: any;
}

const IgExp = ({ jsonData }: Props) => {
  function sortData(data: Record<string, number>): Record<string, number> {
    // Convert the data object into an array of objects
    const dataArray = Object.entries(data).map(([key, value]) => ({
      key,
      value,
    }));

    // Sort the array in ascending order based on the 'value' property
    dataArray.sort((a, b) => a.value - b.value);

    // Convert the sorted array back to the original format
    const sortedData: Record<string, number> = {};
    dataArray.forEach((item) => {
      sortedData[item.key] = item.value;
    });

    return sortedData;
  }

  return (
    <>
      <div className="mb-6 bg-white pt-6 pb-6 shadow-lg rounded-lg">
        <label className="block uppercase tracking-wide text-gray-700 text-xl font-bold mb-6">
          Integrated Gradients
        </label>
        {jsonData && (
          <>
            <div className="overflow-x-auto w-full">
              <table className="w-[400px] mx-auto leading-normal">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-5 py-3 border-b-2 border-gray-200 text-gray-800  text-center text-sm uppercase font-semibold">
                      Parameter
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 text-gray-800  text-center text-sm uppercase font-semibold">
                      IG Value
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(sortData(jsonData?.data_value)).map(
                    ([key, value]) => (
                      <tr key={key} className="hover:bg-gray-200">
                        <td className="px-5 py-3 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {key}
                          </p>
                        </td>
                        <td className="px-5 py-3 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {value.toFixed(3)}
                          </p>
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default IgExp;
