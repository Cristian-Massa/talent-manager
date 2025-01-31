"use client";
import { useHandleMultiplesForms } from "@/app/hooks/useHandleMultiplesForms";
import { Button, Divider, Input, Textarea } from "@heroui/react";
import { IconX } from "@tabler/icons-react";
import { Controller } from "react-hook-form";

export function EducationalProjects() {
  const { control, handleAddField, fields, remove } = useHandleMultiplesForms(
    "educational_projects",
    {
      institute: "",
      project_title: "",
      description: "",
    }
  );
  return (
    <>
      <div className="grid place-content-center w-full">
        <Button onClick={handleAddField}>Add Project</Button>
      </div>
      <div className="h-[350px] overflow-y-auto w-full p-4 flex flex-col gap-10">
        {fields.map((project, index) => {
          return (
            <div
              className="relative pt-10 flex flex-col gap-2 p-2 rounded-lg"
              key={project.id}
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
                name={`educational_projects[${index}].institute`}
                rules={{ required: "Institute name is required" }}
                render={({ field, fieldState }) => (
                  <Input
                    {...field}
                    label="Institute name"
                    labelPlacement="outside"
                    isInvalid={!!fieldState.error}
                  />
                )}
              />
              <Controller
                control={control}
                name={`educational_projects[${index}].project_title`}
                rules={{ required: "Project title is required" }}
                render={({ field, fieldState }) => (
                  <Input
                    {...field}
                    label="Project title"
                    labelPlacement="outside"
                    isInvalid={!!fieldState.error}
                  />
                )}
              />
              <Controller
                control={control}
                name={`educational_projects[${index}].description`}
                rules={{ required: "Description is required" }}
                render={({ field, fieldState }) => (
                  <Textarea
                    {...field}
                    label="Position"
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
