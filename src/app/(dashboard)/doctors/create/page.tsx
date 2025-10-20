import { Card, CardDescription, CardTitle } from "@/components/ui/card";

const CreateDoctorPage = () => {
  return (
    <div>
      <Card className="max-w-4xl mx-auto px-10">
        <CardTitle className="flex items-center gap-3">
          <h2 className="font-work-sans font-medium text-lg">Create Doctor</h2>
        </CardTitle>
        <CardDescription>Form</CardDescription>
      </Card>
    </div>
  );
};

export default CreateDoctorPage;
