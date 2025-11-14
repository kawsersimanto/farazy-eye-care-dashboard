import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Profile } from "@/features/user/components/Profile";

const Page = () => {
  return (
    <div>
      <Card className="max-w-4xl mx-auto px-10">
        <CardTitle className="flex items-center gap-3">
          <h2 className="font-work-sans font-medium text-lg">Profile</h2>
        </CardTitle>
        <CardDescription className="pb-5">
          <Profile />
        </CardDescription>
      </Card>
    </div>
  );
};

export default Page;
