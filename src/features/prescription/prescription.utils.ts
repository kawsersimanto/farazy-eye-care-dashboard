/* eslint-disable @typescript-eslint/no-explicit-any */
import { getAgeFromISO } from "@/utils/date";
import { PrescriptionSchemaType } from "./prescription.schema";

export const getInitialFormValues = (
  selectedPatient?: any,
  patient?: any
): PrescriptionSchemaType => {
  const baseValues: PrescriptionSchemaType = {
    name: "",
    age: 18,
    gender: "MALE",
    phone: "",
    prescribeDate: new Date(),
    antSegment: "",
    cc: "",
    oe: "",
    postSegment: "",
    var: "",
    medicine: [
      {
        id: "",
        name: "",
        timing: "",
        mealTiming: "",
        duration: "",
        instruction: "",
      },
    ],
    rightEye: {
      sph: "",
      cyl: "",
      axis: "",
      bcva: "",
    },
    leftEye: {
      sph: "",
      cyl: "",
      axis: "",
      bcva: "",
    },
    add: "",
    ipd: "",
    mm: "",
    advice: "",
  };

  if (selectedPatient) {
    return {
      ...baseValues,
      name: selectedPatient.name,
      age: selectedPatient.age,
      gender: selectedPatient.gender,
      phone: selectedPatient.phone,
    };
  }

  if (patient) {
    return {
      ...baseValues,
      name: patient?.name || "",
      age: patient?.patientProfile?.dateOfBirth
        ? getAgeFromISO(patient?.patientProfile?.dateOfBirth)
        : 18,
      gender: patient?.patientProfile?.gender || "MALE",
      phone: patient?.phone || "",
    };
  }

  return baseValues;
};
