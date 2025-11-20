import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { EyeExaminationProps } from "../prescription.interface";

export const EyeExamination = ({ form }: EyeExaminationProps) => {
  return (
    <div className="flex flex-col gap-4">
      <FormField
        control={form.control}
        name="add"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Add</FormLabel>
            <FormControl>
              <Input placeholder="" type="text" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="ipd"
        render={({ field }) => (
          <FormItem>
            <FormLabel>I.P.D</FormLabel>
            <FormControl>
              <Input placeholder="" type="text" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="mm"
        render={({ field }) => (
          <FormItem>
            <FormLabel>MM</FormLabel>
            <FormControl>
              <Input placeholder="" type="text" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
