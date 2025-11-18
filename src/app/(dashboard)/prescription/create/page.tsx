import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { PrescriptionForm } from "@/features/prescription/components/PrescriptionForm";

const CreatePage = () => {
  return (
    <div>
      <Card className="max-w-7xl mx-auto px-10">
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
