import { useFieldArray, useFormContext } from "react-hook-form";

export function useHandleMultiplesForms(field: string, fieldStructure: object) {
  const { control } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: field,
  });

  const handleAddField = () => {
    append(fieldStructure);
  };

  return { control, handleAddField, fields, remove };
}
