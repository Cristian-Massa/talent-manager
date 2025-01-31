import { Button } from "@heroui/react";
import { IconCamera } from "@tabler/icons-react";
import Image from "next/image";
import { ChangeEvent, MouseEvent, useRef, useState } from "react";
import {
  Controller,
  ControllerRenderProps,
  FieldValues,
  useFormContext,
} from "react-hook-form";
export function ProfilePictureForm() {
  const { control } = useFormContext();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [image, setImage] = useState<string | undefined>(undefined);

  function handleClick(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    fileInputRef.current?.click();
  }
  function uploadImage(
    e: ChangeEvent<HTMLInputElement>,
    field: ControllerRenderProps<FieldValues, "profile-photo">
  ) {
    const file = e.target.files?.[0];
    if (file) {
      const blob = URL.createObjectURL(file);
      setImage(blob);
      field.onChange(file);
    }
  }
  return (
    <div className="w-full">
      <div className="relative aspect-square object-cover rounded-lg bg-gray-800 flex flex-col justify-center items-center group">
        {image ? (
          <div>
            <div className="z-20 opacity-0 hover:opacity-100 group-hover:opacity-100 absolute rounded-lg inset-0 flex flex-col justify-center items-center bg-black bg-opacity-50 transition-opacity">
              <IconCamera size={100} />
              <p className="text-white">Change your profile photo.</p>
              <Button onClick={handleClick}>Upload</Button>
            </div>
            <Image
              fill
              className="rounded-lg"
              src={image}
              alt="profile-photo"
            />
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center">
            <IconCamera size={100} />
            <p>Upload your profile photo.</p>
            <Button onClick={handleClick}>Upload</Button>
          </div>
        )}
      </div>
      <Controller
        control={control}
        name="profile-photo"
        rules={{
          validate: (field) =>
            field ? true : "Please upload your profile photo.",
        }}
        render={({ field, fieldState }) => (
          <>
            <input
              type="file"
              ref={fileInputRef}
              onChange={(e) => uploadImage(e, field)}
              className="hidden"
            />
            <p className="text-red-500 min-h-8 text-center">
              {fieldState.error?.message ?? ""}
            </p>
          </>
        )}
      />
    </div>
  );
}
