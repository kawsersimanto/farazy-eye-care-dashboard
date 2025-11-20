import { Button } from "@/components/ui/button";
import { FormLabel } from "@/components/ui/form";
import { Plus } from "lucide-react";
import { MedicineListProps } from "../prescription.interface";
import { MedicineField } from "./MedicineField";

export const MedicineList = ({
  form,
  fields,
  append,
  remove,
}: MedicineListProps) => (
  <div className="pt-10 pb-16">
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
              id: "",
              name: "",
              timing: "1 + 0 + 1",
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
