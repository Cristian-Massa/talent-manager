"use client";

import { useGetData } from "@/app/hooks/useGetData";
import { Listbox, ListboxItem, Chip, Spinner } from "@heroui/react";
import { useEffect, useMemo, useState } from "react";
import { useFormContext } from "react-hook-form";

interface ITechnologies {
  technologies: {
    technologies_id: number;
    name: string;
  }[];
}

export function TechnologiesForm() {
  const { data, isLoading } = useGetData<ITechnologies>("/api/technologies");
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set([]));
  const { register, setValue, formState, trigger } = useFormContext();

  const selectedValue = useMemo(
    () =>
      Array.from(selectedKeys).map((key) => {
        if (!data) return null;
        console.log(key);
        return data.technologies.find(
          (technology) => technology.technologies_id === Number(key)
        );
      }),
    [selectedKeys, data]
  );
  useEffect(() => {
    setValue("technologies", selectedValue);
    trigger();
  }, [selectedValue, setValue, trigger]);
  return (
    <div className="w-full">
      <div className="h-[350px] w-full flex flex-col justify-center items-center">
        {isLoading ? (
          <Spinner color="default" label="Loading" labelColor="primary" />
        ) : (
          <Listbox
            className="h-[350px] overflow-y-auto"
            disallowEmptySelection={false}
            selectedKeys={selectedKeys}
            selectionMode="multiple"
            variant="light"
            onSelectionChange={(keys) => {
              setSelectedKeys(new Set(keys as unknown as string[]));
            }}
          >
            {data &&
              data.technologies.map((technology) => {
                return (
                  <ListboxItem
                    className="w-full"
                    key={technology.technologies_id}
                  >
                    {technology.name}
                  </ListboxItem>
                );
              })}
          </Listbox>
        )}
      </div>
      <div className="min-h-10 flex overflow-x-auto gap-2">
        {selectedValue.map((chips) => {
          return <Chip key={chips?.technologies_id}>{chips?.name}</Chip>;
        })}
      </div>
      <input
        type="hidden"
        {...register("technologies", {
          validate: (value) =>
            value?.length > 0 || "Please select at least one technology",
        })}
      />
      <div className="min-h-10">
        {!isLoading && (
          <p className="text-red-500 text-sm mt-4">
            {(formState.errors.technologies?.message as string) ?? ""}
          </p>
        )}
      </div>
    </div>
  );
}
