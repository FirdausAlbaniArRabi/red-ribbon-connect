
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, Clock, MapPin, Droplet, Award, Heart, History, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import NavBar from "@/components/NavBar";
import DonationCard from "@/components/ui/DonationCard";

// Mock data
const upcomingDonation = {
  id: "upcoming-1",
  date: new Date(new Date().setDate(new Date().getDate() + 7)),
  bloodType: "O+",
  location: "Central Blood Bank, Main St",
  status: "scheduled" as const,
};

const pastDonations = [
  {
    id: "past-1",
    date: new Date(new Date().setMonth(new Date().getMonth() - 1)),
    bloodType: "O+",
    location: "Memorial Hospital",
    status: "completed" as const,
    amount: 450,
  },
  {
    id: "past-2",
    date: new Date(new Date().setMonth(new Date().getMonth() - 4)),
    bloodType: "O+",
    location: "Community Drive",
    status: "completed" as const,
    amount: 450,
  },
];

const Dashboard = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalDonations: pastDonations.length,
    livesImpacted: pastDonations.length * 3,
    lastDonationDate: pastDonations[0]?.date || null,
    nextEligibleDate: null as Date | null,
  });

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    // Calculate next eligible date (3 months after last donation)
    if (stats.lastDonationDate) {
      const nextDate = new Date(stats.lastDonationDate);
      nextDate.setMonth(nextDate.getMonth() + 3);
      setStats(prev => ({ ...prev, nextEligibleDate: nextDate }));
    }

    window.scrollTo(0, 0);
  }, [isAuthenticated, navigate, stats.lastDonationDate]);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />

      <div className="container mx-auto px-4 py-24">
        <header className="mb-10 animate-fade-up">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Welcome back, {user.name}</h1>
          <p className="text-muted-foreground">
            Track your donations and schedule your next visit
          </p>
        </header>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 mb-10">
          <Card className="animate-fade-up" style={{ animationDelay: "0.1s" }}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Donations</CardTitle>
              <Award className="h-4 w-4 text-blood" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalDonations}</div>
              <p className="text-xs text-muted-foreground">Lifetime donations</p>
            </CardContent>
          </Card>
          <Card className="animate-fade-up" style={{ animationDelay: "0.2s" }}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Lives Impacted</CardTitle>
              <Heart className="h-4 w-4 text-blood" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.livesImpacted}</div>
              <p className="text-xs text-muted-foreground">People helped by your donations</p>
            </CardContent>
          </Card>
          <Card className="animate-fade-up" style={{ animationDelay: "0.3s" }}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Last Donation</CardTitle>
              <History className="h-4 w-4 text-blood" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {stats.lastDonationDate ? new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(stats.lastDonationDate) : 'N/A'}
              </div>
              <p className="text-xs text-muted-foreground">
                {stats.lastDonationDate ? `${Math.floor((new Date().getTime() - stats.lastDonationDate.getTime()) / (1000 * 60 * 60 * 24))} days ago` : 'No donations yet'}
              </p>
            </CardContent>
          </Card>
          <Card className="animate-fade-up" style={{ animationDelay: "0.4s" }}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Next Eligible</CardTitle>
              <Calendar className="h-4 w-4 text-blood" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {stats.nextEligibleDate ? new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(stats.nextEligibleDate) : 'Now'}
              </div>
              <p className="text-xs text-muted-foreground">
                {stats.nextEligibleDate && stats.nextEligibleDate > new Date() 
                  ? `In ${Math.floor((stats.nextEligibleDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days` 
                  : 'You can donate today'}
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Tabs defaultValue="upcoming" className="w-full animate-fade-up" style={{ animationDelay: "0.5s" }}>
              <TabsList className="mb-6">
                <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                <TabsTrigger value="past">Past Donations</TabsTrigger>
              </TabsList>
              <TabsContent value="upcoming" className="space-y-6">
                {upcomingDonation ? (
                  <>
                    <h2 className="text-xl font-semibold mb-4">Your Upcoming Donation</h2>
                    <DonationCard donation={upcomingDonation} />
                    <div className="flex justify-between mt-6">
                      <Button variant="outline">Reschedule</Button>
                      <Button variant="destructive">Cancel</Button>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-12">
                    <Droplet className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">No Upcoming Donations</h3>
                    <p className="text-muted-foreground mb-6">Schedule your next donation and help save lives.</p>
                    <Button asChild>
                      <a href="/donation-form">Schedule Now</a>
                    </Button>
                  </div>
                )}
              </TabsContent>
              <TabsContent value="past" className="space-y-6">
                <h2 className="text-xl font-semibold mb-4">Your Donation History</h2>
                {pastDonations.length > 0 ? (
                  <div className="space-y-4">
                    {pastDonations.map((donation) => (
                      <DonationCard key={donation.id} donation={donation} />
                    ))}
                    <div className="flex justify-center mt-6">
                      <Button variant="outline" asChild>
                        <a href="/donation-history">View Full History</a>
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <History className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">No Donation History</h3>
                    <p className="text-muted-foreground">You haven't made any donations yet.</p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>

          <div className="animate-fade-up" style={{ animationDelay: "0.6s" }}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="h-5 w-5 mr-2 text-blood" />
                  Your Profile
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm font-medium">Blood Type</p>
                  <p className="flex items-center mt-1">
                    <Droplet className="h-4 w-4 mr-2 text-blood" />
                    {user.bloodType || "Not specified"}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium">Preferred Location</p>
                  <p className="flex items-center mt-1">
                    <MapPin className="h-4 w-4 mr-2 text-blood" />
                    {user.address || "Not specified"}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium">Last Donation</p>
                  <p className="flex items-center mt-1">
                    <Clock className="h-4 w-4 mr-2 text-blood" />
                    {user.lastDonation ? new Intl.DateTimeFormat('en-US', { dateStyle: 'medium' }).format(user.lastDonation) : "No donations yet"}
                  </p>
                </div>
                <Button className="w-full mt-2" variant="outline" asChild>
                  <a href="/profile">View Full Profile</a>
                </Button>
              </CardContent>
            </Card>

            <div className="mt-6 bg-blood-light/30 rounded-xl p-6">
              <h3 className="font-semibold text-lg mb-3">Did You Know?</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Every two seconds, someone in the world needs blood. Just one donation can save up to three lives.
              </p>
              <Button size="sm" variant="default" className="w-full" asChild>
                <a href="/donation-form">Schedule Next Donation</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
