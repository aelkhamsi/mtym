import classNames from "classnames";
import styles from "./loading-dots.module.css";

export default function LoadingDots({ color = "#000", className }: { color?: string, className?: string }) {
  return (
    <div className={className}>
      <span className={styles.loading}>
        <span style={{ backgroundColor: color }} />
        <span style={{ backgroundColor: color }} />
        <span style={{ backgroundColor: color }} />
      </span>
    </div>
  );
};
