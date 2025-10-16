import { useSearchParams, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockTrains } from "@/data/mockTrains";
import { CheckCircle, Download, Home, Mail } from "lucide-react";
import { toast } from "sonner";

const Confirmation = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const pnr = searchParams.get("pnr");
  const trainId = searchParams.get("trainId");
  const travelClass = searchParams.get("class");
  const passengersCount = searchParams.get("passengers");
  
  const train = mockTrains.find(t => t.id === trainId);

  const handleDownload = () => {
    toast.success("Ticket downloaded successfully!");
  };

  const handleEmailTicket = () => {
    toast.success("Ticket sent to your email!");
  };

  if (!pnr || !train) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container py-8 text-center">
          <p className="text-muted-foreground">Booking not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container py-12">
        <div className="max-w-3xl mx-auto">
          {/* Success Message */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-success/10 mb-4">
              <CheckCircle className="h-8 w-8 text-success" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Booking Confirmed!
            </h1>
            <p className="text-muted-foreground">
              Your ticket has been successfully booked
            </p>
          </div>

          {/* PNR Card */}
          <Card className="mb-6 bg-gradient-to-br from-primary to-primary-glow text-primary-foreground">
            <CardContent className="py-6">
              <div className="text-center">
                <p className="text-sm opacity-90 mb-1">PNR Number</p>
                <p className="text-4xl font-bold tracking-wider">{pnr}</p>
                <p className="text-sm opacity-90 mt-2">Save this number for future reference</p>
              </div>
            </CardContent>
          </Card>

          {/* Booking Details */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Journey Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Train Name</p>
                  <p className="font-semibold">{train.name}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Train Number</p>
                  <p className="font-semibold">{train.number}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">From</p>
                  <p className="font-semibold">{train.from}</p>
                  <p className="text-sm text-muted-foreground">{train.departure}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">To</p>
                  <p className="font-semibold">{train.to}</p>
                  <p className="text-sm text-muted-foreground">{train.arrival}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Travel Class</p>
                  <p className="font-semibold uppercase">{travelClass}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Passengers</p>
                  <p className="font-semibold">{passengersCount}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Duration</p>
                  <p className="font-semibold">{train.duration}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Booking Status</p>
                  <p className="font-semibold text-success">Confirmed</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Status */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Payment Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Payment Status</p>
                  <p className="font-semibold text-success">Completed</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground mb-1">Transaction ID</p>
                  <p className="font-mono text-sm">TXN{Date.now()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="grid sm:grid-cols-3 gap-3">
            <Button onClick={handleDownload} variant="outline" className="w-full">
              <Download className="mr-2 h-4 w-4" />
              Download Ticket
            </Button>
            <Button onClick={handleEmailTicket} variant="outline" className="w-full">
              <Mail className="mr-2 h-4 w-4" />
              Email Ticket
            </Button>
            <Button onClick={() => navigate("/")} className="w-full">
              <Home className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </div>

          {/* Important Note */}
          <Card className="mt-6 bg-muted border-none">
            <CardContent className="py-4">
              <p className="text-sm text-muted-foreground">
                <strong>Important:</strong> Please carry a valid photo ID proof during your journey. 
                Your ticket will be sent to your registered email and mobile number.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;
