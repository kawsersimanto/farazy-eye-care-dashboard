"use client";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { IBranch } from "@/features/branch/branch.interface";
import { IDoctor } from "@/features/doctor/doctor.interface";
import { PrescriptionPdf } from "@/features/prescription-pdf/components/PrescriptionPdf";
import { useGetDoctorScheduleByIdQuery } from "@/features/schedule/schedule.api";
import { useGetUserByIdQuery } from "@/features/user/user.api";
import { IUser } from "@/features/user/user.interface";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { zodResolver } from "@hookform/resolvers/zod";
import { pdf } from "@react-pdf/renderer";
import { useEffect, useMemo } from "react";
import { useFieldArray, useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";
import {
  PrescriptionSchema,
  PrescriptionSchemaType,
} from "../prescription.schema";
import { getInitialFormValues } from "../prescription.utils";
import { setSelectedMedicine } from "../store/prescription.slice";
import { EyeExamination } from "./EyeExamination";
import { LeftEyeExamination } from "./LeftEyeExamination";
import { MedicalNotesSection } from "./MedicalNotesSection";
import { MedicineList } from "./MedicineList";
import { PatientInfoSection } from "./PatientInfoSection";
import { PrescriptionConsultant } from "./PrescriptionConsultant";
import { PrescriptionHeader } from "./PrescriptionHeader";
import { RightEyeExamination } from "./RightEyeExamination";

export const PrescriptionForm = () => {
  const { profile } = useAuth();
  const doctor = profile?.doctorProfile;
  const id = profile?.id as string;
  const { data: scheduleData } = useGetDoctorScheduleByIdQuery(id, {
    skip: !id,
  });
  const schedules = useMemo(() => scheduleData?.data || [], [scheduleData]);

  const branch = profile?.branch;
  const selectedMedicine = useAppSelector(
    (state) => state.prescription.selectedMedicine
  );
  const dispatch = useAppDispatch();
  const selectedPatient = useAppSelector((state) => state.prescription.patient);
  const { data: patientData } = useGetUserByIdQuery("6917665d84030b43c9ed6a36");
  const patient = patientData?.data;

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
        id: selectedMedicine.id,
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

  const formValues = useWatch({
    control: form.control,
  });

  const handlePrint = async () => {
    try {
      const blob = await pdf(
        <PrescriptionPdf
          profile={profile as IUser}
          prescription={formValues as PrescriptionSchemaType}
          schedules={schedules}
        />
      ).toBlob();

      const blobURL = URL.createObjectURL(blob);

      // Create hidden iframe
      const iframe = document.createElement("iframe");
      iframe.style.display = "none";
      iframe.src = blobURL;

      document.body.appendChild(iframe);

      iframe.onload = () => {
        iframe.contentWindow?.focus();
        iframe.contentWindow?.print();
        URL.revokeObjectURL(blobURL);
      };
    } catch (error) {
      console.error("PDF print error:", error);
      toast.error("Failed to print. Try again.");
    }
  };

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
    <div>
      <div>
        <PrescriptionHeader branch={branch as IBranch} />
        <Separator className="my-5" />
        <PrescriptionConsultant
          profile={profile as IUser}
          doctor={doctor as IDoctor}
          schedules={schedules}
        />
        <Separator className="my-5" />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <PatientInfoSection form={form} />

            <Separator className="mt-5" />
            <div className="grid grid-cols-[1fr_3fr] gap-10 relative">
              <MedicalNotesSection form={form} />
              <div>
                <MedicineList
                  form={form}
                  fields={fields}
                  append={append}
                  remove={remove}
                />
                <div className="pb-32 flex flex-col gap-4">
                  <LeftEyeExamination form={form} />
                  <RightEyeExamination form={form} />
                  <EyeExamination form={form} />
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 absolute bottom-5 right-5">
              <Button type="submit" className="text-white">
                Submit
              </Button>
              {/* <Button
                type="button"
                variant="outline"
                onClick={handlePrintPrescription}
                disabled={instance.loading}
              >
                Print Prescription
              </Button> */}
              <Button type="button" variant="outline" onClick={handlePrint}>
                Print Prescription
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};
