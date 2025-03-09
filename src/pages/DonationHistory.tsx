
import { useState, useEffect } from "react";
import { History, Calendar, MapPin, DropletIcon } from "lucide-react";
import { format } from "date-fns";
import NavBar from "@/components/NavBar";
import { useAuth } from "@/contexts/AuthContext";

// Mock donation history data
interface Donation {
  id: string;
  date: Date;
  location: string;
  amount: string;
  status: "completed" | "pending" | "cancelled";
}

const mockDonations: Donation[] = [
  {
    id: "1",
    date: new Date(2023, 11, 15),
    location: "Central Blood Bank, Downtown",
    amount: "450ml",
    status: "completed",
  },
  {
    id: "2",
    date: new Date(2023, 8, 3),
    location: "Mobile Blood Drive, University Campus",
    amount: "450ml",
    status: "completed",
  },
  {
    id: "3",
    date: new Date(2023, 5, 22),
    location: "Community Hospital Blood Center",
    amount: "450ml",
    status: "completed",
  },
  {
    id: "4",
    date: new Date(2023, 1, 10),
    location: "Red Cross Blood Drive, City Mall",
    amount: "450ml",
    status: "completed",
  },
];

const DonationHistory = () => {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    // Simulate API call to fetch donation history
    const fetchDonations = async () => {
      setIsLoading(true);
      try {
        // In a real app, fetch from an API
        await new Promise(resolve => setTimeout(resolve, 1000));
        setDonations(mockDonations);
      } catch (error) {
        console.error("Failed to fetch donation history:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDonations();
  }, [user?.id]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      
      <div className="max-w-4xl mx-auto px-4 py-12 pt-24">
        <div className="bg-white shadow-md rounded-xl p-8 animate-fade-up">
          <div className="flex items-center space-x-4 mb-8">
            <div className="bg-blood/10 p-3 rounded-full">
              <History className="h-8 w-8 text-blood" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Donation History</h1>
              <p className="text-muted-foreground text-sm">
                Track your blood donation journey
              </p>
            </div>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-pulse flex flex-col items-center">
                <DropletIcon className="h-12 w-12 text-blood/50 animate-bounce" />
                <p className="mt-4 text-muted-foreground">Loading your donation history...</p>
              </div>
            </div>
          ) : donations.length > 0 ? (
            <div className="space-y-6">
              {donations.map((donation) => (
                <div
                  key={donation.id}
                  className="border rounded-lg p-6 hover:shadow-md transition-shadow bg-white"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">
                          {format(donation.date, "PPP")}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span>{donation.location}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <DropletIcon className="h-4 w-4 text-blood" />
                        <span className="font-medium">{donation.amount}</span>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          donation.status
                        )}`}
                      >
                        {donation.status.charAt(0).toUpperCase() + donation.status.slice(1)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <DropletIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium">No donations yet</h3>
              <p className="text-muted-foreground mt-2">
                Your blood donation history will appear here once you make your
                first donation.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DonationHistory;
