import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { MedicineCategory } from "@/features/medicine-category/components/MedicineCategory";

const CategoryDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  return (
    <div>
      <Card className="max-w-4xl mx-auto px-10">
        <CardTitle className="flex items-center gap-3">
          <h2 className="font-work-sans font-medium text-lg">View Category</h2>
        </CardTitle>
        <CardDescription>
          <MedicineCategory id={id} />
        </CardDescription>
      </Card>
    </div>
  );
};

export default CategoryDetailsPage;
