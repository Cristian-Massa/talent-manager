"use client";

import { withLoginForm } from "@/app/components/form/hocs/withLoginForm";
import styles from "./loginform.module.css";

import { Form } from "@heroui/react";
import { ReactNode } from "react";
import { withRegisterForm } from "@/app/components/form/hocs/withRegisterForm";

interface ILoginForm {
  children?: ReactNode;
}
function CustomForm({ children }: ILoginForm) {
  return <Form className={styles.form}>{children}</Form>;
}

export const LoginForm = withLoginForm(CustomForm);
export const RegisterForm = withRegisterForm(CustomForm);
