import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { BranchAdmin } from "@/features/branch-admin/components/BranchAdmin";

const DetailsPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  return (
    <div>
      <Card className="max-w-4xl mx-auto px-10">
        <CardTitle className="flex items-center gap-3">
          <h2 className="font-work-sans font-medium text-lg">
            View Branch Admin
          </h2>
        </CardTitle>
        <CardDescription>
          <BranchAdmin id={id} />
        </CardDescription>
      </Card>
    </div>
  );
};

export default DetailsPage;
