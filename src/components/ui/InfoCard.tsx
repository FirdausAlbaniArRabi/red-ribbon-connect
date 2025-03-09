
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface InfoCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  className?: string;
  iconClassName?: string;
}

const InfoCard = ({ 
  title, 
  description, 
  icon: Icon, 
  className,
  iconClassName
}: InfoCardProps) => {
  return (
    <div className={cn("glass-card group", className)}>
      <div className="flex flex-col h-full">
        <div className={cn(
          "inline-flex p-3 rounded-full bg-blood/10 text-blood mb-4 transition-transform duration-300 group-hover:scale-110",
          iconClassName
        )}>
          <Icon className="h-6 w-6" />
        </div>
        <h3 className="text-xl font-semibold mb-2 transition-colors group-hover:text-blood">{title}</h3>
        <p className="text-muted-foreground text-sm flex-grow">{description}</p>
      </div>
    </div>
  );
};

export default InfoCard;
