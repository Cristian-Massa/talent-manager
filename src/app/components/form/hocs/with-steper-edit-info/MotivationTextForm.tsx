"use client";

import { Textarea } from "@heroui/react";
import { useFormContext } from "react-hook-form";
export function MotivationTextForm() {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <Textarea
      {...register("motivation_text", {
        required: "Motivation text is required",
      })}
      isInvalid={!!errors.motivation_text}
      isRequired
      className="w-full"
      label="Description"
      labelPlacement="outside"
      placeholder="Enter your description"
    />
  );
}
