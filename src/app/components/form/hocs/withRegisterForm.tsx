import { Input } from "@heroui/react";
import { ComponentType } from "react";

export function withRegisterForm<T extends object>(
  Component: ComponentType<T>
) {
  return function WrappedComponent(props: T) {
    async function handleSubmit(formData: FormData) {
      // const password = form
      formData.delete("confirm_password");
    }
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
        <Input
          isRequired
          label="Confirm Password"
          labelPlacement="outside"
          name="confirm_password"
          placeholder="Confirm your password"
        />
        <button type="submit">Register</button>
      </Component>
    );
  };
}
