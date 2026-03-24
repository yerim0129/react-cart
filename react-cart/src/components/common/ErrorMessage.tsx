import styles from "./ErrorMessage.module.css";

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage = ({message}: ErrorMessageProps) => {
  return (
    <div className={styles.container} role="alert">
      <span className={styles.icon}>!</span>
      <p className={styles.message}>{message}</p>
    </div>
  );
};

export default ErrorMessage;
