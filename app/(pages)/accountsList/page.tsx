"use client";

import Image from "next/image";
import React from "react";
import useSWR from "swr";
import { useRouter } from "next/navigation";
import AvatarPlaceholder from "@/app/components/AvatarPlaceholder/AvatarPlaceholder";
import { UserData } from "@/app/types";
import { fetcher } from "@/app/utils/fetcher";
import { formatEmail } from "@/app/utils/formatEmail";

import styles from "./styles.module.css";

const AccountList = () => {
  const router = useRouter();
  const { data } = useSWR("/api/accounts", fetcher);
  if (!data) {
    return null;
  }

  const handleClickUser = (email: string) => {
    router.push(`/account/${formatEmail(email)}`);
  };

  return (
    <main className={styles.accountsPage__container}>
      <h1 className={styles.accountsList__title}>Список аккаунтов</h1>
      <ul className={styles.accountsList__list}>
        {data.map(({ name, email, image, slug }: UserData) => (
          <li
            key={email}
            className={styles.accountsList__userContainer}
            onClick={() => handleClickUser(slug)}
          >
            <div className={styles.accountsList__avatarContainer}>
              {!!image && !!image.url.match(/^\/|^(https?:\/\/)/) && (
                <Image
                  src={image.url}
                  alt="imageOfUser"
                  fill
                  objectFit="cover"
                />
              )}
              {!image?.url && <AvatarPlaceholder name={name} size={"sm"} />}
            </div>
            <div className={styles.accountsList__textInfo}>
              <p className={styles.accountsList__name}>{name}</p>
              <p className={styles.accountsList__email}>{email}</p>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default AccountList;
