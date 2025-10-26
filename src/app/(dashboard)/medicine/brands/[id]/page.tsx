import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { MedicineBrand } from "@/features/medicine-brand/components/MedicineBrand";

const BrandDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  return (
    <div>
      <Card className="max-w-4xl mx-auto px-10">
        <CardTitle className="flex items-center gap-3">
          <h2 className="font-work-sans font-medium text-lg">View Brand</h2>
        </CardTitle>
        <CardDescription>
          <MedicineBrand id={id} />
        </CardDescription>
      </Card>
    </div>
  );
};

export default BrandDetailsPage;
