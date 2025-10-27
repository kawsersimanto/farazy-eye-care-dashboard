import { Card, CardDescription, CardTitle } from "@/components/ui/card";

const UserDetailsPage = async ({
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
          <h2 className="font-work-sans font-medium text-lg">User</h2>
        </CardTitle>
        <CardDescription>User Details</CardDescription>
      </Card>
    </div>
  );
};

export default UserDetailsPage;
