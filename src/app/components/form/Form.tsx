"use client";
import { withLoginForm } from "@/app/components/form/hocs/withLoginForm";

import { Form } from "@heroui/react";
import { FormHTMLAttributes, ReactNode } from "react";
import { withRegisterForm } from "@/app/components/form/hocs/withRegisterForm";
import { withRegisterConfirmForm } from "@/app/components/form/hocs/withRegisterConfirmForm";
import { withSteperEditInfo } from "@/app/components/form/hocs/withSteperEditInfo";

interface ILoginForm extends FormHTMLAttributes<HTMLFormElement> {
  children?: ReactNode;
}
function CustomForm({ children, action, onSubmit, className }: ILoginForm) {
  return (
    <Form
      className={`background-container p-10 rounded-lg ${className}`}
      action={action}
      onSubmit={onSubmit}
    >
      {children}
    </Form>
  );
}

export const LoginForm = withLoginForm(CustomForm);
export const RegisterForm = withRegisterForm(CustomForm);
export const ConfirmRegisterForm = withRegisterConfirmForm(CustomForm);
export const StepsEditInfo = withSteperEditInfo(CustomForm);
