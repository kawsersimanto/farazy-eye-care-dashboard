import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { EyeExaminationProps } from "../prescription.interface";

export const LeftEyeExamination = ({ form }: EyeExaminationProps) => (
  <div>
    <div className="flex items-center gap-2">
      <div className="grid grid-cols-4 gap-x-1 gap-y-4 items-start">
        <FormField
          control={form.control}
          name="leftEye.sph"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Left Eye Sph</FormLabel>
              <FormControl>
                <Input placeholder="" type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="leftEye.cyl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Left Eye Cyl</FormLabel>
              <FormControl>
                <Input placeholder="" type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="leftEye.axis"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Left Eye Axis</FormLabel>
              <FormControl>
                <Input placeholder="" type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="leftEye.bcva"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Left Eye BC VA</FormLabel>
              <FormControl>
                <Input placeholder="" type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  </div>
);
