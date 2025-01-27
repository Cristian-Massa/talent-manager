"use client";

import Link from "next/link";
import styles from "./loginform.module.css";

import { Form, Input } from "@heroui/react";
import { ChangeEvent, useState } from "react";
import { login } from "@/app/services/login";

export function LoginForm() {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setUserData({
      ...userData,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  }

  return (
    <>
      <Form className={styles.form}>
        <Input
          isRequired
          label="Email"
          labelPlacement="outside"
          name="email"
          placeholder="Enter your email"
          onChange={handleChange}
        />
        <Input
          isRequired
          label="Password"
          labelPlacement="outside"
          name="password"
          placeholder="Enter your password"
          onChange={handleChange}
        />
        <button onClick={(e) => login(e, userData)}>log in</button>
      </Form>
      <Link href={"/candidate"}>
        <button>Im candidate</button>
      </Link>
    </>
  );
}
