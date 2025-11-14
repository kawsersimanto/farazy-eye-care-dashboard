import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { UpdatePasswordForm } from "./UpdatePasswordForm";

export const Settings = () => {
  return (
    <div className="flex flex-col gap-4 max-w-4xl mx-auto">
      <Card className="px-10">
        <CardTitle className="flex items-center gap-3">
          <h2 className="font-work-sans font-medium text-lg">Settings</h2>
        </CardTitle>
        <CardDescription className="pb-5">
          <UpdatePasswordForm />
        </CardDescription>
      </Card>
      <Card className="px-10">
        <CardTitle className="flex items-center gap-3">
          <h2 className="font-work-sans font-medium text-lg">
            Manage Password
          </h2>
        </CardTitle>
        <CardDescription className="pb-5">Manage</CardDescription>
      </Card>
    </div>
  );
};
