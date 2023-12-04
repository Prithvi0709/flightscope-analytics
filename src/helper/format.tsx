export const formatTime = (timestamp: string) => {
  const date = new Date(timestamp.replace(" ", "T"));
  return new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  }).format(date);
};

export const formatDate = (timestamp: string) => {
  const date = new Date(timestamp.replace(" ", "T"));
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
};

const CustomTick = ({ x, y, payload }: any) => {
  const displayLabel = formatTime(payload.value);

  return (
    <g transform={`translate(${x},${y})`}>
      <text x={0} y={0} dy={16} textAnchor="middle" fill="#666">
        {displayLabel}
      </text>
    </g>
  );
};

export default CustomTick;
