type ImageDisplayProps = {
  base64: string;
};

const ImageDisplay = ({ base64 }: ImageDisplayProps) => {
  const imageDataUrl = `data:image/jpeg;base64,${base64}`;

  return (
    <div>
      <img src={imageDataUrl} alt="Base64 Image" />
    </div>
  );
};

export default ImageDisplay;
