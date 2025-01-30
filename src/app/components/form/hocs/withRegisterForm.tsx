import { authAction } from "@/app/actions/authAction";
import { Button, Input } from "@heroui/react";
import { ComponentType } from "react";
import { useForm } from "react-hook-form";

export function withRegisterForm<T extends object>(
  Component: ComponentType<T>
) {
  return function WrappedComponent(props: T) {
    const {
      register,
      handleSubmit,
      formState: { errors, isSubmitting },
      setError,
      watch,
    } = useForm({
      mode: "onBlur",
    });

    const password = watch("password");

    async function onSubmit(data: Record<string, string>) {
      try {
        const formData = new FormData();
        formData.append("email", data.email);
        formData.append("password", data.password);

        const result = await authAction(formData, "/api/register");

        if (result?.error) {
          setError("root", { message: result.error });
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
                message: "Email inválido",
              },
            })}
            isRequired
            label="Email"
            labelPlacement="outside"
            placeholder="Enter your email"
            errorMessage={errors.email?.message as string | undefined}
            isInvalid={!!errors.email}
          />
        </div>

        <div>
          <Input
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "8 character minimun",
              },
            })}
            type="password"
            isRequired
            label="Password"
            labelPlacement="outside"
            placeholder="Enter your password"
            errorMessage={errors.password?.message as string | undefined}
            isInvalid={!!errors.password}
          />
        </div>

        <div>
          <Input
            {...register("confirm_password", {
              required: "Confirm your password",
              validate: (value) => value === password || "Password dont match",
            })}
            type="password"
            isRequired
            label="Confirm Password"
            labelPlacement="outside"
            placeholder="Confirm your password"
            errorMessage={
              errors.confirm_password?.message as string | undefined
            }
            isInvalid={!!errors.confirm_password}
          />
        </div>

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Registering..." : "Register"}
        </Button>

        {errors.root?.message && (
          <p className="text-red-500">{errors.root.message}</p>
        )}
      </Component>
    );
  };
}
