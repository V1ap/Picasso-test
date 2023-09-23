import { Link } from "react-router-dom";
import styles from "./styles.module.scss";

interface ILinkApp {
  className?: string;
  to: string;
  children?: React.ReactNode;
}

const LinkApp: React.FC<ILinkApp> = ({ className, to, children }) => {
  return (
    <Link className={`${styles.link} ${className ? className : ""}`} to={to}>
      {children}
    </Link>
  );
};

export default LinkApp;
