"use client";
import { authAction } from "@/app/actions/authAction";
import { Input } from "@heroui/react";
import { ComponentType, useEffect, useState } from "react";
// import { useFormState } from "react-dom";

export function withLoginForm<T extends object>(Component: ComponentType<T>) {
  return function WrappedComponent(props: T) {
    const [status, setStatus] = useState<string | null>(null);
    async function handleSubmit(formData: FormData) {
      const result = await authAction(formData);
      return setStatus(result);
    }
    useEffect(() => {
      console.log(status);
    });
    return (
      <Component {...props} action={handleSubmit}>
        <Input
          isRequired
          label="Email"
          labelPlacement="outside"
          name="email"
          placeholder="Enter your email"
        />
        <Input
          isRequired
          label="Password"
          labelPlacement="outside"
          name="password"
          placeholder="Enter your password"
        />
        <button type="submit">log in</button>
        <p>{status && status}</p>
      </Component>
    );
  };
}
