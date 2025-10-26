import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { MedicineBrandForm } from "@/features/medicine-brand/components/MedicineBrandForm";

const CreateBrandPage = () => {
  return (
    <div>
      <Card className="max-w-4xl mx-auto px-10">
        <CardTitle className="flex items-center gap-3">
          <h2 className="font-work-sans font-medium text-lg">Create Brand</h2>
        </CardTitle>
        <CardDescription>
          <MedicineBrandForm />
        </CardDescription>
      </Card>
    </div>
  );
};

export default CreateBrandPage;
