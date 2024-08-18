import React, { Fragment, ReactNode } from "react";

import styles from "./styles.module.css";

const FormCard = ({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) => {
  return (
    <div className={styles.formCard}>
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
