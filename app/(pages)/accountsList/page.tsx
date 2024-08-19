"use client";

import Image from "next/image";
import React from "react";
import useSWR from "swr";
import { useRouter } from "next/navigation";
import AvatarPlaceholder from "@/app/components/AvatarPlaceholder/AvatarPlaceholder";
import { UserData } from "@/app/types";
import { fetcher } from "@/app/utils/fetcher";

import styles from "./styles.module.css";

const AccountList = () => {
  const router = useRouter();
  const { data } = useSWR("/api/accounts", fetcher);
  if (!data) {
    return null;
  }

  const handleClickUser = (email: string) => {
    router.push(`/account/${email}`);
  };

  return (
    <main className={styles.accountsPage__container}>
      <h1 className={styles.accountsList__title}>Список аккаунтов</h1>
      <ul className={styles.accountsList__list}>
        {data.map(({ name, email, image }: UserData) => (
          <li
            key={email}
            className={styles.accountsList__userContainer}
            onClick={() => handleClickUser(email)}
          >
            <div className={styles.accountsList__avatarContainer}>
              {!!image && !!image.url.match(/^\/|^(https?:\/\/)/) && (
                <Image
                  src={image.url}
                  alt="imageOfUser"
                  width={52}
                  height={52}
                  objectFit="cover"
                />
              )}
              {!image?.url && <AvatarPlaceholder name={name} size={"sm"} />}
            </div>
            <div>
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
