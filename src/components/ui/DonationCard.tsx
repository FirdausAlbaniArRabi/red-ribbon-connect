
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Droplet, Calendar, MapPin, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface DonationCardProps {
  donation: {
    id: string;
    date: Date;
    bloodType: string;
    location: string;
    status: "completed" | "scheduled" | "pending";
    amount?: number;
  };
  className?: string;
}

const DonationCard = ({ donation, className }: DonationCardProps) => {
  const statusColors = {
    completed: "bg-green-100 text-green-800",
    scheduled: "bg-blue-100 text-blue-800",
    pending: "bg-yellow-100 text-yellow-800"
  };

  const statusText = {
    completed: "Completed",
    scheduled: "Scheduled",
    pending: "Pending"
  };

  return (
    <div className={cn(
      "neo-card relative overflow-hidden border transition-all",
      className
    )}>
      <div className="absolute top-0 right-0 m-4">
        <Badge className={cn("font-medium", statusColors[donation.status])}>
          {statusText[donation.status]}
        </Badge>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Droplet className="w-5 h-5 text-blood" />
          <span className="font-semibold">Blood Type: {donation.bloodType}</span>
        </div>
        
        <div className="space-y-2 pt-2">
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="w-4 h-4 mr-2" />
            <span>{format(donation.date, "PPP")}</span>
          </div>
          
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="w-4 h-4 mr-2" />
            <span>{format(donation.date, "p")}</span>
          </div>
          
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="w-4 h-4 mr-2" />
            <span>{donation.location}</span>
          </div>
        </div>
        
        {donation.status === "completed" && donation.amount && (
          <div className="pt-2 border-t">
            <p className="text-sm text-muted-foreground">
              Amount donated: <span className="font-medium">{donation.amount} ml</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DonationCard;
