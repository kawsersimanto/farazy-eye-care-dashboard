"use client";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { useGetUserByIdQuery } from "@/features/user/user.api";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import { useGetPrescriptionByIdQuery } from "../prescription.api";
import {
  PrescriptionSchema,
  PrescriptionSchemaType,
} from "../prescription.schema";
import { getInitialFormValues } from "../prescription.utils";
import { setSelectedMedicine } from "../store/prescription.slice";
import { MedicalNotesSection } from "./MedicalNotesSection";
import { MedicineList } from "./MedicineList";
import { PatientInfoSection } from "./PatientInfoSection";
import { PrescriptionConsultant } from "./PrescriptionConsultant";
import { PrescriptionHeader } from "./PrescriptionHeader";

interface PrescriptionEditFormProps {
  prescriptionId: string;
}

export const PrescriptionEditForm = ({
  prescriptionId,
}: PrescriptionEditFormProps) => {
  const selectedMedicine = useAppSelector(
    (state) => state.prescription.selectedMedicine
  );
  const dispatch = useAppDispatch();
  const selectedPatient = useAppSelector((state) => state.prescription.patient);
  const { data: patientData } = useGetUserByIdQuery("6917665d84030b43c9ed6a36");
  const patient = patientData?.data;
  const { data: prescriptionData } = useGetPrescriptionByIdQuery(
    prescriptionId || ""
  );
  const prescription = prescriptionData?.data;

  const form = useForm<PrescriptionSchemaType>({
    resolver: zodResolver(PrescriptionSchema),
    defaultValues: getInitialFormValues(),
  });

  const { fields, append, remove, update } = useFieldArray({
    control: form.control,
    name: "medicine",
  });

  useEffect(() => {
    if (selectedMedicine) {
      const medicineData = {
        name: selectedMedicine.name,
        timing: "",
        mealTiming: "",
        duration: "",
        instruction: "",
      };

      const firstEmptyIndex = fields.findIndex(
        (field) => !field.name || field.name === ""
      );

      if (firstEmptyIndex !== -1) {
        update(firstEmptyIndex, medicineData);
      } else {
        append(medicineData);
      }
      dispatch(setSelectedMedicine(null));
    }
  }, [selectedMedicine, append, update, fields, dispatch]);

  useEffect(() => {
    form.reset(getInitialFormValues(selectedPatient, patient));
  }, [selectedPatient, patient, form]);

  useEffect(() => {
    if (prescription && prescriptionId) {
      form.reset({
        name: prescription?.name,
        age: prescription?.age,
        gender: prescription?.gender,
        phone: prescription?.phone,
        prescribeDate: new Date(prescription.prescribeDate),
        cc: prescription?.cc || "",
        oe: prescription?.oe || "",
        var: prescription?.var || "",
        antSegment: prescription?.antSegment || "",
        postSegment: prescription?.postSegment || "",
        medicine: prescription?.medicine || [
          {
            name: "",
            timing: "",
            mealTiming: "",
            duration: "",
            instruction: "",
          },
        ],
      });
    }
  }, [prescription, prescriptionId, form]);

  function onSubmit(values: PrescriptionSchemaType) {
    try {
      console.log(values);
      toast(
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>
      );
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  }

  return (
    <>
      <div>
        <PrescriptionHeader />
        <Separator className="my-5" />
        <PrescriptionConsultant />
        <Separator className="my-5" />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <PatientInfoSection form={form} />

            <Separator className="mt-5" />
            <div className="grid grid-cols-[1fr_3fr] gap-10">
              <MedicalNotesSection form={form} />
              <MedicineList
                form={form}
                fields={fields}
                append={append}
                remove={remove}
              />
            </div>

            <Button type="submit">
              {prescriptionId ? "Update Prescription" : "Submit"}
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
};
