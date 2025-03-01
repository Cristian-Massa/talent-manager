"use client";

import { useGetData } from "@/app/hooks/useGetData";
import { Listbox, ListboxItem, Chip, Spinner } from "@heroui/react";
import { useEffect, useMemo, useState } from "react";
import { useFormContext } from "react-hook-form";

interface ILanguages {
  languages: {
    languages_id: number;
    name: string;
  }[];
}

export function LanguagesForm() {
  const { data, isLoading } = useGetData<ILanguages>("/api/languages");
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set([]));
  const { register, setValue, formState, trigger } = useFormContext();

  const selectedValue = useMemo(
    () =>
      Array.from(selectedKeys).map((key) => {
        const index = key.split(".").at(-1);

        return data?.languages.find(
          (language) => language.languages_id === Number(index)
        );
      }),
    [selectedKeys, data]
  );
  useEffect(() => {
    setValue("languages", selectedValue);
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
            variant="flat"
            onSelectionChange={(keys) => {
              setSelectedKeys(new Set(keys as unknown as string[]));
            }}
          >
            {data?.languages && data.languages.length > 0 ? (
              data.languages.map((language) => {
                return (
                  <ListboxItem className="w-full" key={language.languages_id}>
                    {language.name}
                  </ListboxItem>
                );
              })
            ) : (
              <></>
            )}
          </Listbox>
        )}
      </div>
      <div className="min-h-10 flex overflow-x-auto gap-2">
        {selectedValue.map((chips) => {
          return <Chip key={chips?.languages_id}>{chips?.name}</Chip>;
        })}
      </div>
      <input
        type="hidden"
        {...register("languages", {
          validate: (value) =>
            value?.length > 0 || "Please select at least one language",
        })}
      />
      <div className="min-h-10">
        {!isLoading && (
          <p className="text-red-500 text-sm mt-4">
            {(formState.errors.languages?.message as string) ?? ""}
          </p>
        )}
      </div>
    </div>
  );
}
