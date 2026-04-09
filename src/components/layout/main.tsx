import { cn } from "@/lib/utils";

export const Main: React.FC<React.ComponentProps<"main">> = ({ className, ...props }) => {
  return <main className={cn("flex min-h-screen items-start justify-center py-16 bg-background overflow-x-hidden", className)} {...props} />;
};
