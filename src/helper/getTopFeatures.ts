interface LimeDataItem {
  feature: string;
  rawValue: number;
  attributionValue: number;
}

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

export default getTopLimeFeatures;

type DataDictionary = { [key: string]: number };

export function getTopShapFeatures(
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

export function getTopIgFeatures(
  dictionary: DataDictionary,
  n: number
): string[] {
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
