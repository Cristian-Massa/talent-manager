"use client";

import { useGetData } from "@/app/hooks/useGetData";
import { Listbox, ListboxItem, Chip } from "@heroui/react";
import { useMemo, useState } from "react";

interface ILanguages {
  languages: {
    language_id: number;
    name: string;
  }[];
}

export function LanguagesForm() {
  const { data } = useGetData<ILanguages>("/api/languages");
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set([]));

  const selectedValue = useMemo(
    () =>
      Array.from(selectedKeys).map((key) => {
        const index = key.split(".").at(-1);
        return data?.languages[Number(index)];
      }),
    [selectedKeys, data?.languages]
  );

  return (
    <div className="w-full">
      <Listbox
        disallowEmptySelection={false}
        aria-label="Multiple selection example"
        selectedKeys={selectedKeys}
        selectionMode="multiple"
        variant="flat"
        onSelectionChange={(keys) => {
          setSelectedKeys(new Set(keys as unknown as string[]));
        }}
      >
        {data &&
          data.languages.map((langauge) => {
            return (
              <ListboxItem key={langauge.language_id}>
                {langauge.name}
              </ListboxItem>
            );
          })}
      </Listbox>
      <div className="min-h-8 flex overflow-x-auto gap-2">
        {selectedValue.map((chips) => {
          return <Chip key={chips?.language_id}>{chips?.name}</Chip>;
        })}
      </div>
    </div>
  );
}
