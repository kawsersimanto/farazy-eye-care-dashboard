import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Patient } from "@/features/patient/components/Patient";

const PatientDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  return (
    <div>
      <Card className="max-w-4xl mx-auto px-10">
        <CardTitle className="flex items-center gap-3">
          <h2 className="font-work-sans font-medium text-lg sr-only">
            View Patient
          </h2>
        </CardTitle>
        <CardDescription className="pb-5">
          <Patient id={id} />
        </CardDescription>
      </Card>
    </div>
  );
};

export default PatientDetailsPage;
