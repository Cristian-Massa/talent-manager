import { login } from "@/app/services/login";
import { Input } from "@heroui/react";
import { ChangeEvent, ComponentType, useState } from "react";

export function withRegisterForm<T extends object>(
  Component: ComponentType<T>
) {
  return function WrappedComponent(props: T) {
    const [userData, setUserData] = useState({
      email: "",
      password: "",
      confirm_password: "",
    });

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
      setUserData({
        ...userData,
        [e.currentTarget.name]: e.currentTarget.value,
      });
    }
    return (
      <Component {...props}>
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
        <Input
          isRequired
          label="Confirm Password"
          labelPlacement="outside"
          name="confirm_password"
          placeholder="Confirm your password"
          onChange={handleChange}
        />
        <button onClick={(e) => login(e, userData)}>Register</button>
      </Component>
    );
  };
}
