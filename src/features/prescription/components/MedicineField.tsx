import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Trash } from "lucide-react";
import { MEAL_TIMING_OPTIONS, TIMING_OPTIONS } from "../prescription.constants";
import { MedicineFieldProps } from "../prescription.interface";

export const MedicineField = ({
  form,
  index,
  onRemove,
  canRemove,
}: MedicineFieldProps) => (
  <div className="">
    <div className="flex items-center gap-2">
      <div className="grid grid-cols-4 gap-x-1 gap-y-4 items-start">
        <FormField
          control={form.control}
          name={`medicine.${index}.name`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Medicine Name</FormLabel>
              <FormControl>
                <Input placeholder="ex. Paracetamol" type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name={`medicine.${index}.timing`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Timing</FormLabel>
              <Select
                onValueChange={(value) => {
                  if (value) field.onChange(value);
                }}
                value={String(field.value || "")}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="ex. 1 + 0 + 1" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {TIMING_OPTIONS.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name={`medicine.${index}.mealTiming`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Meal Timing</FormLabel>
              <Select
                onValueChange={(value) => {
                  if (value) field.onChange(value);
                }}
                value={String(field.value || "")}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="ex. খাবার আগে" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {MEAL_TIMING_OPTIONS.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name={`medicine.${index}.duration`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Duration</FormLabel>
              <FormControl>
                <Input placeholder="ex. 5 days" type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="col-span-4">
          <FormField
            control={form.control}
            name={`medicine.${index}.instruction`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Instruction</FormLabel>
                <FormControl>
                  <Input
                    placeholder="ex. Take 1 tablet twice daily"
                    type="text"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>

      {canRemove && (
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={onRemove}
          className="!p-0 h-auto bg-transparent border-0 mt-7.5 ml-2.5 text-danger hover:text-danger"
        >
          <Trash className="h-4 w-4 !text-inherit" />
        </Button>
      )}
    </div>
  </div>
);
