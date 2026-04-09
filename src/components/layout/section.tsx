import { cn } from "@/lib/utils";

export const Section: React.FC<React.ComponentProps<"section">> = ({ className, ...props }) => {
  return <section className={cn("w-full py-20 lg:py-40 2xl:py-32 px-4", className)} {...props} />;
};

export const SectionTitle: React.FC<React.ComponentProps<"h2">> = ({ className, ...props }) => {
  return <h2 className={cn("text-3xl md:text-4xl lg:text-5xl font-bold leading-snug text-center", className)} {...props} />;
};

export const SectionDescription: React.FC<React.ComponentProps<"p">> = ({ className, ...props }) => {
  return <p className={cn("mt-4 text-lg text-muted-foreground leading-relaxed text-center max-w-2xl mx-auto", className)} {...props} />;
};

Section.displayName = "Section";
SectionTitle.displayName = "Section.Title";
SectionDescription.displayName = "Section.Description";
