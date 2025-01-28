"use client";
import { withLoginForm } from "@/app/components/form/hocs/withLoginForm";
import styles from "./loginform.module.css";

import { Form } from "@heroui/react";
import { FormHTMLAttributes, ReactNode } from "react";
// import { withRegisterForm } from "@/app/components/form/hocs/withRegisterForm";

interface ILoginForm extends FormHTMLAttributes<HTMLFormElement> {
  children?: ReactNode;
}
function CustomForm({ children, action }: ILoginForm) {
  return (
    <Form className={styles.form} action={action}>
      {children}
    </Form>
  );
}

export const LoginForm = withLoginForm(CustomForm);
// export const RegisterForm = withRegisterForm(CustomForm);
