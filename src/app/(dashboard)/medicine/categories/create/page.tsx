import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { MedicineCategoryForm } from "@/features/medicine-category/components/MedicineCategoryForm";

const CreateCategoryPage = () => {
  return (
    <div>
      <Card className="max-w-4xl mx-auto px-10">
        <CardTitle className="flex items-center gap-3">
          <h2 className="font-work-sans font-medium text-lg">
            Create Category
          </h2>
        </CardTitle>
        <CardDescription>
          <MedicineCategoryForm />
        </CardDescription>
      </Card>
    </div>
  );
};

export default CreateCategoryPage;
