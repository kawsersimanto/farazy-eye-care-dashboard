import { Breadcrumbs } from "@/components/breadcrumbs/Breadcrumbs";

const BranchLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div>
      <Breadcrumbs />
      <div className="pt-10">{children}</div>
    </div>
  );
};

export default BranchLayout;
