import React, { FC, Fragment, ReactNode } from "react";

import styles from "./styles.module.css";

interface FormCardProps {
  title: string;
  width?: "400" | "600";
  fullHeight?: boolean;
  children: ReactNode;
}

const FormCard: FC<FormCardProps> = ({
  title,
  width = "400",
  fullHeight = false,
  children,
}) => {
  const widthClassName =
    width === "400" ? styles.formCard_width400 : styles.formCard_width600;
    const fullHeightClassName = fullHeight ? styles.formCard_fullHeight : '';

  return (
    <div className={`${styles.formCard} ${widthClassName} ${fullHeightClassName}`}>
      <div>
        <h1 className={styles.formCard__title}>
          {title.split("\n").map((substring, index) => (
            <Fragment key={index}>
              {substring}
              {index !== title.split("\n").length - 1 ? <br /> : null}
            </Fragment>
          ))}
        </h1>
      </div>
      {children}
    </div>
  );
};

export default FormCard;
