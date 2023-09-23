import LinkApp from "src/shared/UI/LinkApp";
import styles from "./styles.module.scss";

const LinkToMain: React.FC = () => {
  return (
    <LinkApp className={styles.linkToMain} to="/">
      Назад
    </LinkApp>
  );
};

export default LinkToMain;
