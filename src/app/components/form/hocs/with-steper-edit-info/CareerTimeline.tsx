"use client";
import { useHandleMultiplesForms } from "@/app/hooks/useHandleMultiplesForms";
import { Button, DatePicker, Divider, Input, Textarea } from "@heroui/react";
import { IconX } from "@tabler/icons-react";
import { Controller } from "react-hook-form";

export function CareerTimeline() {
  const { control, handleAddField, fields, remove } = useHandleMultiplesForms(
    "experiences",
    {
      companyName: "",
      timeInPosition: null,
      position: "",
      jobDescription: "",
    }
  );
  return (
    <>
      <div className="grid place-content-center w-full">
        <Button onClick={handleAddField}>Add Experience</Button>
      </div>
      <div className="h-[350px] overflow-y-auto w-full p-4 flex flex-col gap-10">
        {fields.map((experience, index) => {
          return (
            <div
              className="relative pt-10 flex flex-col gap-2 p-2 rounded-lg"
              key={experience.id}
            >
              <Button
                variant="light"
                size="sm"
                className="absolute top-2 right-2 aspect-square"
                onClick={() => remove(index)}
              >
                <IconX color="white" />
              </Button>
              <Controller
                control={control}
                name={`experiences[${index}].companyName`}
                rules={{ required: "Company Name is required" }}
                render={({ field, fieldState }) => (
                  <Input
                    {...field}
                    label="Company Name"
                    labelPlacement="outside"
                    isInvalid={!!fieldState.error}
                  />
                )}
              />
              <Controller
                control={control}
                name={`experiences[${index}].timeInPosition`}
                rules={{ required: "Time in Position is required" }}
                render={({ field, fieldState }) => (
                  <DatePicker
                    {...field}
                    label="Time in Position"
                    labelPlacement="outside"
                    isInvalid={!!fieldState.error}
                  />
                )}
              />
              <Controller
                control={control}
                name={`experiences[${index}].position`}
                rules={{ required: "Position is required" }}
                render={({ field, fieldState }) => (
                  <Input
                    {...field}
                    label="Position"
                    labelPlacement="outside"
                    isInvalid={!!fieldState.error}
                  />
                )}
              />
              <Controller
                control={control}
                name={`experiences[${index}].jobDescription`}
                rules={{ required: "Job Description is required" }}
                render={({ field, fieldState }) => (
                  <Textarea
                    {...field}
                    label="Job Description"
                    labelPlacement="outside"
                    isInvalid={!!fieldState.error}
                  />
                )}
              />
              <Divider />
            </div>
          );
        })}
      </div>
    </>
  );
}
