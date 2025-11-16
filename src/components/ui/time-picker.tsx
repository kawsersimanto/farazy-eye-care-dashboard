import { Input } from "@/components/ui/input";
import { Clock8Icon } from "lucide-react";
import { ControllerRenderProps, FieldPath, FieldValues } from "react-hook-form";

interface TimePickerProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> {
  field: ControllerRenderProps<TFieldValues, TName>;
}

export const TimePicker = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  field,
}: TimePickerProps<TFieldValues, TName>) => {
  return (
    <div className="w-full">
      <div className="relative">
        <div className="text-muted-foreground pointer-events-none absolute inset-y-0 left-0 flex items-center justify-center pl-3 peer-disabled:opacity-50">
          <Clock8Icon className="size-4" />
          <span className="sr-only">Clock</span>
        </div>
        <Input
          type="time"
          step="1"
          {...field}
          className="peer appearance-none pl-9 [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
        />
      </div>
    </div>
  );
};
