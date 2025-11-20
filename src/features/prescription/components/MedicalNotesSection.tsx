/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { UseFormReturn } from "react-hook-form";
import { MEDICAL_FIELDS } from "../prescription.constants";
import { PrescriptionSchemaType } from "../prescription.schema";

interface MedicalNotesSectionProps {
  form: UseFormReturn<PrescriptionSchemaType>;
}

export const MedicalNotesSection = ({ form }: MedicalNotesSectionProps) => (
  <div className="border-r border-border pe-10 space-y-5 py-10">
    {MEDICAL_FIELDS.map(({ name, label }) => (
      <FormField
        key={name}
        control={form.control}
        name={name as any}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{label}</FormLabel>
            <FormControl>
              <Textarea placeholder="" className="resize-none" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    ))}
  </div>
);
