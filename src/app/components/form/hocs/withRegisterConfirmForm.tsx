"use client";
import { confirmRegisterAction } from "@/app/actions/confirmRegisterAction";
import { Button, Input } from "@heroui/react";
import { ComponentType, useState } from "react";
import { useForm } from "react-hook-form";
export function withRegisterConfirmForm<T extends object>(
  Component: ComponentType<T>
) {
  return function WrappedComponent(props: T & { token: string }) {
    const { token: userInfoToken, ...restProps } = props;
    const [status, setStatus] = useState<string | null>(null);
    const {
      register,
      handleSubmit,
      formState: { errors, isSubmitting },
      setError,
    } = useForm({
      mode: "onBlur",
      defaultValues: {
        confirm_registration_token: "",
      },
    });
    async function onSubmit(data: { confirm_registration_token: string }) {
      try {
        const formData = new FormData();
        formData.append(
          "registerConfirmToken",
          data.confirm_registration_token
        );
        formData.append("userInfoToken", userInfoToken);

        const result = await confirmRegisterAction(formData);
        if (result?.error) {
          setError("root", { message: result.error });
        } else {
          setStatus(result.success);
        }
      } catch (error) {
        setError("root", { message: (error as Error).message });
      }
    }

    return (
      <Component {...(restProps as T)} onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Input
            {...register("confirm_registration_token", {
              required: "Token is required",
            })}
            isRequired
            label="Token"
            labelPlacement="outside"
            placeholder="Enter your token"
            errorMessage={errors.confirm_registration_token?.message}
            isInvalid={!!errors.confirm_registration_token}
          />
        </div>
        <div className="w-full">
          <Button
            className="flex justify-self-center"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Loading..." : "Confirm"}
          </Button>
        </div>
        {errors.root?.message && (
          <p className="text-red-500">{errors.root.message}</p>
        )}
        {status && <p className="text-green-500">{status}</p>}
      </Component>
    );
  };
}
