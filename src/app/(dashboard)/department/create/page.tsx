import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { DepartmentForm } from "@/features/department/components/DepartmentForm";

const CreateDepartmentPage = () => {
  return (
    <div>
      <Card className="max-w-4xl mx-auto px-10">
        <CardTitle className="flex items-center gap-3">
          <h2 className="font-work-sans font-medium text-lg">
            Create Department
          </h2>
        </CardTitle>
        <CardDescription>
          <DepartmentForm />
        </CardDescription>
      </Card>
    </div>
  );
};

export default CreateDepartmentPage;
