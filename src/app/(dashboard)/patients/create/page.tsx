import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { PatientForm } from "@/features/patient/components/PatientForm";

const CreatePatientPage = () => {
  return (
    <div>
      <Card className="max-w-4xl mx-auto px-10">
        <CardTitle className="flex items-center gap-3">
          <h2 className="font-work-sans font-medium text-lg">Create Patient</h2>
        </CardTitle>
        <CardDescription>
          <PatientForm />
        </CardDescription>
      </Card>
    </div>
  );
};

export default CreatePatientPage;
