import { Card, CardDescription, CardTitle } from "@/components/ui/card";

const ScheduleEditPage = async ({
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
          <h2 className="font-work-sans font-medium text-lg">
            Create Schedule
          </h2>
        </CardTitle>
        <CardDescription>Edit</CardDescription>
      </Card>
    </div>
  );
};

export default ScheduleEditPage;
