import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { EyeExaminationProps } from "../prescription.interface";

export const RightEyeExamination = ({ form }: EyeExaminationProps) => (
  <div>
    <div className="flex items-center gap-2">
      <div className="grid grid-cols-4 gap-x-1 gap-y-4 items-start grow">
        <FormField
          control={form.control}
          name="rightEye.sph"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Right Eye Sph</FormLabel>
              <FormControl>
                <Input placeholder="" type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="rightEye.cyl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Right Eye Cyl</FormLabel>
              <FormControl>
                <Input placeholder="" type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="rightEye.axis"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Right Eye Axis</FormLabel>
              <FormControl>
                <Input placeholder="" type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="rightEye.bcva"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Right Eye BC VA</FormLabel>
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
