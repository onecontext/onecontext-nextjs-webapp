import { HashLoader } from "react-spinners";

const CSSProperties = {
  display: "flex-col",
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
  width: "100%",
};

const Spinner = ({
  loading,
  loadingText,
  color = "#1c1917",
  className = "",
  size = 20,
}: {
  loading: boolean;
  loadingText?: string;
  color?: string;
  className?: string;
  size?: number;
}) => {
  return (
    <div className="sweet-loading" style={CSSProperties}>
      <HashLoader
        className={className}
        loading={loading}
        color={color}
        size={size}
      />
      {loading && loadingText && <p>{loadingText}</p>}
    </div>
  );
}

export default Spinner;

