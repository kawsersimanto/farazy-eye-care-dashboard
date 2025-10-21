import { Logo } from "@/components/logo/Logo";
import { Card, CardDescription } from "@/components/ui/card";
import { SignInForm } from "@/features/auth/components/SignInForm";

const LoginPage = () => {
  return (
    <Card className="max-w-[530px] mx-auto py-12 relative px-8">
      <CardDescription>
        <div className="flex justify-center mb-[38px]">
          <Logo className="w-[140px]" />
        </div>
        <div className="mb-10 px-5">
          <h2 className="font-work-sans text-2xl mb-1 font-semibold text-foreground text-center">
            Welcome to the Dashboard
          </h2>
          <p className="text-center text-sm">
            Enter your email address to <strong>Log in</strong>
          </p>
        </div>
        <SignInForm />
      </CardDescription>
    </Card>
  );
};

export default LoginPage;
