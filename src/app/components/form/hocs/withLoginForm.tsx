import { login } from "@/app/services/login";
import { Input } from "@heroui/react";
import { ChangeEvent, ComponentType, useState } from "react";

export function withLoginForm<T extends object>(Component: ComponentType<T>) {
  return function WrappedComponent(props: T) {
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
        <button onClick={(e) => login(e, userData)}>log in</button>
      </Component>
    );
  };
}
