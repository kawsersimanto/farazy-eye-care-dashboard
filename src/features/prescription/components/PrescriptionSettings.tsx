import { PrescriptionMedicine } from "./PrescriptionMedicine";
import { PrescriptionPatient } from "./PrescriptionPatient";

export const PrescriptionSettings = () => {
  return (
    <div className="flex flex-col gap-4">
      <PrescriptionPatient />
      <PrescriptionMedicine />
    </div>
  );
};
