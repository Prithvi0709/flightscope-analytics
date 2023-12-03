interface Props {
  limeData: any;
}

interface CustomIframeWindow extends Window {
  updatePredictProba: (newData: any) => void;
  updateExplanation: (newData: any) => void;
  updateRawTabular: (newData: any) => void;
}

const LimeExp = ({ limeData }: Props) => {
  const dataValue = limeData;
  console.log(limeData);

  // Function to update the iframe displaying the LIME Dashboard
  function updateIframeContent() {
    const iframe = document.getElementById("myIframe") as HTMLIFrameElement;

    if (!iframe || !iframe.contentWindow) {
      console.error("Iframe or its contentWindow not found");
      return;
    }

    const iframeWindow = iframe.contentWindow as CustomIframeWindow;

    const newProbaData: any = [dataValue[0], 1 - dataValue[0]];

    const newExplanationData: any = dataValue[1];
    const newRawData: any = dataValue[2];

    iframeWindow.updatePredictProba(newProbaData);
    iframeWindow.updateExplanation(newExplanationData);
    iframeWindow.updateRawTabular(newRawData);
  }

  return (
    dataValue && (
      <>
        <div className="mb-6 bg-white pt-6 pb-6 shadow-lg rounded-lg">
          <label className="block uppercase tracking-wide text-gray-700 text-xl font-bold mb-6">
            Lime
          </label>
          <div className="w-full pl-24">
            <iframe
              id="myIframe"
              src="src/meta_data/lime_exp.html"
              title="External Content"
              style={{ width: "100%", height: "700px", border: "none" }}
              onLoad={updateIframeContent}
            ></iframe>
          </div>
        </div>
      </>
    )
  );
};

export default LimeExp;
