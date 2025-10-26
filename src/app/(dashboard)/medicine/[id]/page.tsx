import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Medicine } from "@/features/medicine/components/Medicine";

const MedicineDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  console.log(id);

  return (
    <div>
      <Card className="max-w-4xl mx-auto px-10">
        <CardTitle className="flex items-center gap-3">
          <h2 className="font-work-sans font-medium text-lg sr-only">
            View Medicine
          </h2>
        </CardTitle>
        <CardDescription className="pb-5">
          <Medicine id={id} />
        </CardDescription>
      </Card>
    </div>
  );
};

export default MedicineDetailsPage;
