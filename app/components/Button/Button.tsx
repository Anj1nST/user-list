import React, { ReactNode } from "react";

import styles from "./styles.module.css";
import Icon, { IconType } from "../Icon/Icon";

interface ButtonProps {
  text: string;
  iconType?: IconType;
  isDisabled?: boolean;
  size?: "sm" | "md";
  fullWidth?: boolean;
  variant?: "common" | "form";
  type?: "button" | "submit" | "reset" | undefined;
  action?: () => void;
}

const Button: React.FC<ButtonProps> = ({
  text,
  iconType,
  isDisabled = false,
  size = "md",
  fullWidth = false,
  variant = "common",
  type = "button",
  action,
}) => {
  const sizeClassName =
    size === "sm" ? styles.button_smallSize : styles.button_normalSize;
  const variantClassName =
    variant === "common" ? styles.button : styles.formButton;
  const formTextClassName =
    variant === "form" &&
    (isDisabled ? styles.button__formText_disabled : styles.button__formText);
  const disabledClassName = isDisabled ? styles.button_disabled : "";
  const fullWidthClassName = fullWidth && styles.button_fullWidth;

  return (
    <button
      type={type}
      className={`${variantClassName} ${disabledClassName} ${sizeClassName} ${fullWidthClassName}`}
      onClick={action}
      disabled={isDisabled}
    >
      {!!iconType && (
        <div className={styles.button__iconContainer}>
          <Icon type={iconType} />
        </div>
      )}
      <p className={`${formTextClassName} ${styles.button__text}`}>{text}</p>
    </button>
  );
};

export default Button;
