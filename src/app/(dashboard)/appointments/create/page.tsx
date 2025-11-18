import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { MedicineForm } from "@/features/medicine/components/MedicineForm";

const Page = () => {
  return (
    <div>
      <Card className="max-w-4xl mx-auto px-10">
        <CardTitle className="flex items-center gap-3">
          <h2 className="font-work-sans font-medium text-lg">
            Create Medicine
          </h2>
        </CardTitle>
        <CardDescription>
          <MedicineForm />
        </CardDescription>
      </Card>
    </div>
  );
};

export default Page;
