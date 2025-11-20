/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { FormLabel } from "@/components/ui/form";
import { Plus } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { PrescriptionSchemaType } from "../prescription.schema";
import { MedicineField } from "./MedicineField";

interface MedicineListProps {
  form: UseFormReturn<PrescriptionSchemaType>;
  fields: any[];
  append: (value: any) => void;
  remove: (index: number) => void;
}

export const MedicineList = ({
  form,
  fields,
  append,
  remove,
}: MedicineListProps) => (
  <div className="py-10">
    <div className="flex flex-col gap-2">
      <FormLabel className="mb-4">Rx</FormLabel>
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-6">
          {fields.map((field, index) => (
            <MedicineField
              key={field.id}
              form={form}
              index={index}
              fieldId={field.id}
              onRemove={() => remove(index)}
              canRemove={fields.length > 1}
            />
          ))}
        </div>

        <Button
          type="button"
          variant="link"
          className="!p-0 !m-0 self-start"
          onClick={() =>
            append({
              name: "",
              timing: "",
              mealTiming: "",
              duration: "",
              instruction: "",
            })
          }
        >
          <Plus /> Add Medicine
        </Button>
      </div>
    </div>
  </div>
);
