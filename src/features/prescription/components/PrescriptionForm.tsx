"use client";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { IBranch } from "@/features/branch/branch.interface";
import { IDoctor } from "@/features/doctor/doctor.interface";
import { PrescriptionPdf } from "@/features/prescription-pdf/components/PrescriptionPdf";
import { useGetDoctorScheduleByIdQuery } from "@/features/schedule/schedule.api";
import { useGetUserByIdQuery } from "@/features/user/user.api";
import { IUser } from "@/features/user/user.interface";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { ApiResponse } from "@/types/api";
import { handleMutationRequest } from "@/utils/handleMutationRequest";
import { zodResolver } from "@hookform/resolvers/zod";
import { pdf } from "@react-pdf/renderer";
import { useEffect, useMemo, useState } from "react";
import { useFieldArray, useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";
import { useCreatePrescriptionMutation } from "../prescription.api";
import {
  PrescriptionSchema,
  PrescriptionSchemaType,
} from "../prescription.schema";
import { getInitialFormValues } from "../prescription.utils";
import { setSelectedMedicine } from "../store/prescription.slice";
import { AdviceSection } from "./AdviceSection";
import { EyeExamination } from "./EyeExamination";
import { LeftEyeExamination } from "./LeftEyeExamination";
import { MedicalNotesSection } from "./MedicalNotesSection";
import { MedicineList } from "./MedicineList";
import { PatientInfoSection } from "./PatientInfoSection";
import { PrescriptionConsultant } from "./PrescriptionConsultant";
import { PrescriptionHeader } from "./PrescriptionHeader";
import { PrescriptionSkeleton } from "./PrescriptionSkeleton";
import { RightEyeExamination } from "./RightEyeExamination";

export const PrescriptionForm = () => {
  const { profile, isLoading: isLoadingProfile } = useAuth();
  const doctor = profile?.doctorProfile;
  const branch = profile?.branch;
  const branchId = branch?.id;
  const id = profile?.id as string;
  const { data: scheduleData, isLoading: isLoadingSchedule } =
    useGetDoctorScheduleByIdQuery(id, {
      skip: !id,
    });
  const selectedMedicine = useAppSelector(
    (state) => state.prescription.selectedMedicine
  );
  const selectedPatientId = selectedMedicine?.id as string;
  const schedules = useMemo(() => scheduleData?.data || [], [scheduleData]);

  const dispatch = useAppDispatch();
  const selectedPatient = useAppSelector((state) => state.prescription.patient);
  const { data: patientData, isLoading: isLoadingPatientData } =
    useGetUserByIdQuery(selectedPatientId, {
      skip: !selectedPatientId,
    });
  const patient = patientData?.data;

  const [createPrescriptionFn, { isLoading: isCreatingPrescription }] =
    useCreatePrescriptionMutation();

  const [showEyeExamination, setShowEyeExamination] = useState(false);

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
        timing: "1 + 0 + 1",
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

      form.trigger("medicine");

      dispatch(setSelectedMedicine(null));
    }
  }, [selectedMedicine, append, update, fields, dispatch, form]);

  useEffect(() => {
    if (selectedPatient) {
      form.setValue("name", selectedPatient?.name);
      form.setValue("phone", selectedPatient?.phone);
      form.setValue("age", selectedPatient?.age);
      form.setValue("gender", selectedPatient?.gender);

      form.trigger("name");
      form.trigger("phone");
      form.trigger("age");
      form.trigger("gender");
    }
  }, [selectedPatient, patient, form]);

  const formValues = useWatch({
    control: form.control,
  });

  const handlePreview = async () => {
    try {
      const blob = await pdf(
        <PrescriptionPdf
          profile={profile as IUser}
          prescription={formValues as PrescriptionSchemaType}
          schedules={schedules}
          showEyeExamination={showEyeExamination}
        />
      ).toBlob();

      const blobURL = URL.createObjectURL(blob);
      window.open(blobURL, "_blank");
    } catch (error) {
      console.error("PDF preview error:", error);
      toast.error("Failed to preview PDF.");
    }
  };

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

  const onSubmit = async (values: PrescriptionSchemaType) => {
    const payload = {
      branchId,
      doctorId: id,
      ...values,
    };
    await handleMutationRequest(createPrescriptionFn, payload, {
      loadingMessage: "Saving Prescription",
      successMessage: (res: ApiResponse<string>) => res?.message,
      onSuccess: () => form.reset(),
    });
  };

  const handleEyeExaminationChange = (checked: boolean) => {
    setShowEyeExamination(checked);

    // Clear eye examination fields when toggling off
    if (!checked) {
      form.setValue("rightEye", {
        sph: "",
        cyl: "",
        axis: "",
        bcva: "",
      });
      form.setValue("leftEye", {
        sph: "",
        cyl: "",
        axis: "",
        bcva: "",
      });
      form.setValue("add", "");
      form.setValue("ipd", "");
      form.setValue("mm", "");
    }
  };

  if (isLoadingSchedule || isLoadingProfile || isLoadingPatientData)
    return <PrescriptionSkeleton />;

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

                <div className="flex items-center gap-1 mb-5">
                  <div className="scale-75 origin-left">
                    <Switch
                      id="eye-examination"
                      checked={showEyeExamination}
                      onCheckedChange={handleEyeExaminationChange}
                    />
                  </div>
                  <Label htmlFor="eye-examination">Eye Examination</Label>
                </div>

                {showEyeExamination && (
                  <div className="pb-32 flex flex-col gap-4">
                    <RightEyeExamination form={form} />
                    <LeftEyeExamination form={form} />
                    <EyeExamination form={form} />
                    <AdviceSection form={form} />
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2 absolute bottom-5 right-5">
              <Button
                disabled={
                  isLoadingSchedule ||
                  isLoadingProfile ||
                  isLoadingPatientData ||
                  isCreatingPrescription
                }
                type="submit"
                className="text-white"
              >
                Submit
              </Button>
              <Button
                disabled={
                  isLoadingSchedule ||
                  isLoadingProfile ||
                  isLoadingPatientData ||
                  isCreatingPrescription
                }
                type="button"
                variant="outline"
                onClick={() => form.reset()}
              >
                Reset
              </Button>
              <Button
                disabled={
                  isLoadingSchedule ||
                  isLoadingProfile ||
                  isLoadingPatientData ||
                  isCreatingPrescription
                }
                type="button"
                variant="outline"
                onClick={handlePreview}
              >
                Preview PDF
              </Button>
              <Button
                disabled={
                  isLoadingSchedule ||
                  isLoadingProfile ||
                  isLoadingPatientData ||
                  isCreatingPrescription
                }
                type="button"
                variant="outline"
                onClick={handlePrint}
              >
                Print Prescription
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};
