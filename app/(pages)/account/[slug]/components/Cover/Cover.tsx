import React, { FC, useRef, useState } from "react";

import Image from "next/image";
import { mutate } from "swr";

import { formatEmail } from "@/app/utils/formatEmail";
import Button from "@/app/components/Button";

import styles from "./styles.module.css";

interface CoverType {
  url: string;
}

interface CoverProps {
  cover: CoverType;
  slug: string;
  canEdit?: boolean;
}

const Cover: FC<CoverProps> = ({ cover, slug, canEdit = false }) => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const inputFileRef = useRef<HTMLInputElement | null>(null);

  const handleUploadClick = () => {
    if (inputFileRef.current) {
      inputFileRef.current.click();
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setUploadedFile(file);

      const formData = new FormData();
      formData.append("cover", file);

      const res = await fetch("/api/profile", {
        method: "PATCH",
        body: formData,
      });

      if (res.ok) {
        mutate(`api/account/${formatEmail(slug)}`);
        const updatedCover = await res.json();
        setUploadedFile(null);
      } else {
        console.error("Ошибка при обновлении изображения");
      }
    }
  };

  const handleDeleteClick = async () => {
    const res = await fetch("/api/profile", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cover: null }),
    });

    if (res.ok) {
      mutate(`api/account/${formatEmail(slug)}`);
      setUploadedFile(null);
    } else {
      console.error("Ошибка при удалении изображения");
    }
  };

  return (
    <div className={styles.cover__container}>
      {canEdit && (
        <div className={styles.cover__imageUpload}>
          <input
            type="file"
            id="imageUpload"
            className={styles.cover__imageUploadInput}
            ref={inputFileRef}
            onChange={handleFileChange}
          />
          <label htmlFor="imageUpload">
            {!cover && (
              <Button
                type="button"
                text="Загрузить"
                size="sm"
                iconType={["upload", "image"]}
                action={handleUploadClick}
              />
            )}
            {!!cover && (
              <Button
                type="button"
                text="Удалить"
                size="sm"
                iconType={["trash", "image"]}
                action={handleDeleteClick}
              />
            )}
          </label>
        </div>
      )}
      {!!cover && !!cover.url.match(/^\/|^(https?:\/\/)/) && (
        <Image src={cover.url} alt="imageOfUser" fill objectFit="cover" />
      )}
    </div>
  );
};

export default Cover;
