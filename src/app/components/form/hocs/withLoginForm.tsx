"use client";
import { authAction } from "@/app/actions/authAction";
import { Button, Input } from "@heroui/react";
import { ComponentType, useState } from "react";
import { useForm } from "react-hook-form";

export function withLoginForm<T extends object>(Component: ComponentType<T>) {
  return function WrappedComponent(props: T) {
    const {
      register,
      handleSubmit,
      formState: { errors, isSubmitting },
      setError,
    } = useForm({
      mode: "onBlur",
      defaultValues: {
        email: "",
        password: "",
      },
    });

    const [status, setStatus] = useState<string | null>(null);

    async function onSubmit(data: { email: string; password: string }) {
      try {
        const formData = new FormData();
        formData.append("email", data.email);
        formData.append("password", data.password);

        const result = await authAction(formData, "/api/login");

        if (result?.error) {
          setError("root", { message: result.error });
        } else {
          console.log(result);
          setStatus(result);
        }
      } catch (error) {
        setError("root", { message: (error as Error).message });
      }
    }

    return (
      <Component {...props} onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Input
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Email invalid",
              },
            })}
            isRequired
            label="Email"
            labelPlacement="outside"
            placeholder="Enter your email"
            errorMessage={errors.email?.message}
            isInvalid={!!errors.email}
          />
        </div>

        <div>
          <Input
            {...register("password", {
              required: "Password is requir",
              minLength: {
                value: 8,
                message: "Mínimo 8 caracteres",
              },
            })}
            type="password"
            isRequired
            label="Password"
            labelPlacement="outside"
            placeholder="Enter your password"
            errorMessage={errors.password?.message}
            isInvalid={!!errors.password}
          />
        </div>

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Loading..." : "Log in"}
        </Button>

        {errors.root?.message && (
          <p className="text-red-500">{errors.root.message}</p>
        )}
        {status && <p className="text-green-500">{status}</p>}
      </Component>
    );
  };
}
