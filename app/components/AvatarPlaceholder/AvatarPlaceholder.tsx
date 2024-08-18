import React, { FC } from "react";
import styles from "./styles.module.css";

interface AvatarPlaceholderProps {
  size: "sm" | "big";
  name?: string;
}

const AvatarPlaceholder: FC<AvatarPlaceholderProps> = ({ size, name }) => {
  const firstLetter = name ? name[0] : "";
  const sizeClassname =
    size === "sm"
      ? styles.avatarPlaceholder__container_small
      : styles.avatarPlaceholder__container_big;

  return (
    <div className={`${styles.avatarPlaceholder__container} ${sizeClassname}`}>
      <p>{firstLetter}</p>
    </div>
  );
};

export default AvatarPlaceholder;
