import React from "react";

import styles from "./styles.module.css";

interface ButtonProps {
  text: string;
  isDisabled?: boolean;
  variant?: "common" | "form";
  type?: "button" | "submit" | "reset" | undefined;
  action?: () => void;
}

const Button: React.FC<ButtonProps> = ({
  text,
  isDisabled = false,
  variant = "common",
  type,
  action,
}) => {
  return (
    <button
      type={type}
      className={`${variant === 'common' ? styles.button : styles.formButton} ${isDisabled ? styles.button_disabled : ""}`}
      onClick={action}
      disabled={isDisabled}
    >
      {text}
    </button>
  );
};

export default Button;
