import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { MedicineCategoryEdit } from "@/features/medicine-category/components/MedicineCategoryEdit";

const CategoryEditPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  return (
    <div>
      <Card className="max-w-4xl mx-auto px-10">
        <CardTitle className="flex items-center gap-3">
          <h2 className="font-work-sans font-medium text-lg">Edit Category</h2>
        </CardTitle>
        <CardDescription>
          <MedicineCategoryEdit id={id} />
        </CardDescription>
      </Card>
    </div>
  );
};

export default CategoryEditPage;
