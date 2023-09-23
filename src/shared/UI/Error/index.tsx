import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import styles from "./styles.module.scss";
import { SerializedError } from "@reduxjs/toolkit";

interface IError {
  error: FetchBaseQueryError | SerializedError;
}

const Error: React.FC<IError> = ({ error }) => {
  return (
    <p className={styles.error}>
      {"status" in error
        ? `Ошибка ${error?.status}`
        : "Упс что-то пошло не так"}
    </p>
  );
};

export default Error;
