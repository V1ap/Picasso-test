import styles from "./styles.module.scss";

interface ILoaderProps {
  color?: string;
}

const Loader: React.FC<ILoaderProps> = ({ color = "#000000" }) => {
  return (
    <div className={styles.loader}>
      <svg
        style={{
          margin: "auto",
          background: "none",
          display: "block",
          shapeRendering: "auto",
        }}
        width="200px"
        height="200px"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid"
      >
        <circle
          cx="50"
          cy="50"
          fill="none"
          stroke={color}
          strokeWidth="10"
          r="34"
          strokeDasharray="160.22122533307947 55.40707511102649"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            repeatCount="indefinite"
            dur="1s"
            values="0 50 50;360 50 50"
            keyTimes="0;1"
          ></animateTransform>
        </circle>
      </svg>
    </div>
  );
};

export default Loader;
