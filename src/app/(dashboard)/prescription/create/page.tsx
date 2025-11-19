import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { PrescriptionForm } from "@/features/prescription/components/PrescriptionForm";
import { PrescriptionSettings } from "@/features/prescription/components/PrescriptionSettings";

const CreatePage = () => {
  return (
    <div className="grid grid-cols-[1fr_3fr] gap-4">
      <Card className="px-5">
        <CardTitle className="flex items-center gap-3 sr-only">
          <h2 className="font-work-sans font-medium text-lg">
            Manage Prescription
          </h2>
        </CardTitle>
        <CardDescription>
          <PrescriptionSettings />
        </CardDescription>
      </Card>
      <Card className="px-10">
        <CardTitle className="flex items-center gap-3 sr-only">
          <h2 className="font-work-sans font-medium text-lg">
            Create Prescription
          </h2>
        </CardTitle>
        <CardDescription>
          <PrescriptionForm />
        </CardDescription>
      </Card>
    </div>
  );
};

export default CreatePage;
