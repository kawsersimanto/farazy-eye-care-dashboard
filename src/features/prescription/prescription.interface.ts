/* eslint-disable @typescript-eslint/no-explicit-any */
import { UseFormReturn } from "react-hook-form";
import { PrescriptionSchemaType } from "./prescription.schema";

export interface IPrescriptionMedicine {
  name: string;
  timing: string;
  mealTiming: string;
  duration: string;
  instruction: string;
}

export interface IPrescription {
  name: string;
  phone: string;
  gender: string;
  age: number;
  prescribeDate: string;
  cc: string;
  oe: string;
  var: string;
  antSegment: string;
  postSegment: string;
  medicine: IPrescriptionMedicine[];
  eyeExamination: boolean;
}

export interface MedicalNotesSectionProps {
  form: UseFormReturn<PrescriptionSchemaType>;
}

export interface MedicineFieldProps {
  form: UseFormReturn<PrescriptionSchemaType>;
  index: number;
  fieldId: string;
  onRemove: () => void;
  canRemove: boolean;
}

export interface MedicineListProps {
  form: UseFormReturn<PrescriptionSchemaType>;
  fields: any[];
  append: (value: any) => void;
  remove: (index: number) => void;
}

export interface PatientInfoSectionProps {
  form: UseFormReturn<PrescriptionSchemaType>;
}

export interface EyeExaminationProps {
  form: UseFormReturn<PrescriptionSchemaType>;
}

export interface PrescriptionEditFormProps {
  prescriptionId: string;
}
