import { useEffect, useState } from "react";
import useSimilarity from "../hooks/useSimilarity";
import BarLoader from "react-spinners/BarLoader";
import ImageDisplay from "../helper/ImageDisplay";

const SimilarityForm = () => {
  const [features, setFeaturesValue] = useState<number>();
  const [samples, setSampleValue] = useState<number>();
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const {
    data: simData,
    mutate,
    isLoading,
    isSuccess,
    isError,
  } = useSimilarity({
    features,
    samples,
  });

  const handleFeaturesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFeaturesValue(Number(e.target.value));
  };

  const handleSamplesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSampleValue(Number(e.target.value));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate();
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
    <div className="mx-auto p-6 mb-6  bg-white shadow-md rounded-lg">
      <form
        className=" mx-auto p-6 mb-6  bg-white shadow-md rounded-lg"
        onSubmit={handleSubmit}
      >
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-4">
          Similarity Plot
        </label>

        <div className="flex items-center justify-center -mx-3 mb-3">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0 flex space-x-4 items-center">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Features:
            </label>
            <input
              type="number"
              id="features"
              min={1}
              onChange={handleFeaturesChange}
              className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
            />
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Samples:
            </label>
            <input
              type="number"
              id="samples"
              min={1}
              onChange={handleSamplesChange}
              className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2  rounded shadow leading-tight focus:outline-none focus:shadow-outline"
            />
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
      </form>
      <div className="flex w-full h-[500px] justify-center">
        {isSuccess && (
          <ImageDisplay base64={simData?.data?.similarity_matrix} />
        )}
      </div>
    </div>
  );
};

export default SimilarityForm;
