import { Checkbox } from "@/components/ui/checkbox";
import { FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import { ADVICE_OPTIONS } from "../prescription.constants";
import { PrescriptionSchemaType } from "../prescription.schema";

export const AdviceSection = ({
  form,
}: {
  form: UseFormReturn<PrescriptionSchemaType>;
}) => {
  const advice = form.watch("advice") || [];

  const handleAdviceChange = (option: string, checked: boolean) => {
    const updatedAdvice = checked
      ? [...advice, option]
      : advice.filter((item) => item !== option);

    form.setValue("advice", updatedAdvice);
    form.trigger("advice");
  };

  return (
    <FormItem>
      <FormLabel className="mb-2 mt-4">Advice</FormLabel>
      <FormControl>
        <div className="space-y-3">
          {ADVICE_OPTIONS.map((option) => (
            <div key={option} className="flex items-center gap-3">
              <Checkbox
                id={`advice-${option}`}
                checked={advice.includes(option)}
                onCheckedChange={(checked) =>
                  handleAdviceChange(option, checked as boolean)
                }
              />
              <label
                htmlFor={`advice-${option}`}
                className="text-sm font-medium cursor-pointer"
              >
                {option}
              </label>
            </div>
          ))}
        </div>
      </FormControl>
    </FormItem>
  );
};
