import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { BranchForm } from "@/features/branch/components/BranchForm";

const CreateBranchPage = () => {
  return (
    <div>
      <Card className="max-w-4xl mx-auto px-10">
        <CardTitle className="flex items-center gap-3">
          <h2 className="font-work-sans font-medium text-lg">Create Branch</h2>
        </CardTitle>
        <CardDescription>
          <BranchForm />
        </CardDescription>
      </Card>
    </div>
  );
};

export default CreateBranchPage;
