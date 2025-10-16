import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockTrains } from "@/data/mockTrains";
import { Plus, Trash2, CreditCard } from "lucide-react";
import { toast } from "sonner";

interface Passenger {
  id: string;
  name: string;
  age: string;
  gender: string;
  berth: string;
}

const Booking = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const trainId = searchParams.get("trainId");
  const travelClass = searchParams.get("class");
  
  const train = mockTrains.find(t => t.id === trainId);
  const classInfo = train?.classes[travelClass || "sleeper"];

  const [passengers, setPassengers] = useState<Passenger[]>([
    { id: "1", name: "", age: "", gender: "male", berth: "lower" }
  ]);

  const addPassenger = () => {
    if (passengers.length < 6) {
      setPassengers([
        ...passengers,
        { id: Date.now().toString(), name: "", age: "", gender: "male", berth: "lower" }
      ]);
    } else {
      toast.error("Maximum 6 passengers allowed");
    }
  };

  const removePassenger = (id: string) => {
    if (passengers.length > 1) {
      setPassengers(passengers.filter(p => p.id !== id));
    } else {
      toast.error("At least one passenger required");
    }
  };

  const updatePassenger = (id: string, field: keyof Passenger, value: string) => {
    setPassengers(passengers.map(p => 
      p.id === id ? { ...p, [field]: value } : p
    ));
  };

  const handleConfirmBooking = () => {
    // Validate passengers
    const invalidPassenger = passengers.find(p => !p.name || !p.age);
    if (invalidPassenger) {
      toast.error("Please fill all passenger details");
      return;
    }

    // Generate mock PNR
    const pnr = Math.floor(1000000000 + Math.random() * 9000000000).toString();
    
    toast.success("Booking confirmed!");
    navigate(`/confirmation?pnr=${pnr}&trainId=${trainId}&class=${travelClass}&passengers=${passengers.length}`);
  };

  if (!train || !classInfo) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container py-8 text-center">
          <p className="text-muted-foreground">Train not found</p>
        </div>
      </div>
    );
  }

  const totalFare = classInfo.fare * passengers.length;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container py-8">
        <h1 className="text-3xl font-bold text-foreground mb-6">Complete Your Booking</h1>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Train Details */}
            <Card>
              <CardHeader>
                <CardTitle>Train Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="font-semibold text-lg">{train.name}</p>
                  <p className="text-sm text-muted-foreground">#{train.number}</p>
                  <div className="flex items-center gap-4 text-sm pt-2">
                    <div>
                      <p className="font-medium">{train.departure}</p>
                      <p className="text-muted-foreground">{train.from}</p>
                    </div>
                    <span className="text-muted-foreground">→</span>
                    <div>
                      <p className="font-medium">{train.arrival}</p>
                      <p className="text-muted-foreground">{train.to}</p>
                    </div>
                    <div className="ml-auto">
                      <p className="text-muted-foreground">{train.duration}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Passenger Details */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Passenger Details</CardTitle>
                  <Button onClick={addPassenger} variant="outline" size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Passenger
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {passengers.map((passenger, index) => (
                  <div key={passenger.id} className="border border-border rounded-lg p-4 space-y-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">Passenger {index + 1}</h3>
                      {passengers.length > 1 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removePassenger(passenger.id)}
                          className="text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                    
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Full Name</Label>
                        <Input
                          placeholder="Enter full name"
                          value={passenger.name}
                          onChange={(e) => updatePassenger(passenger.id, "name", e.target.value)}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Age</Label>
                        <Input
                          type="number"
                          placeholder="Age"
                          value={passenger.age}
                          onChange={(e) => updatePassenger(passenger.id, "age", e.target.value)}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Gender</Label>
                        <Select
                          value={passenger.gender}
                          onValueChange={(value) => updatePassenger(passenger.id, "gender", value)}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Berth Preference</Label>
                        <Select
                          value={passenger.berth}
                          onValueChange={(value) => updatePassenger(passenger.id, "berth", value)}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="lower">Lower</SelectItem>
                            <SelectItem value="middle">Middle</SelectItem>
                            <SelectItem value="upper">Upper</SelectItem>
                            <SelectItem value="side-lower">Side Lower</SelectItem>
                            <SelectItem value="side-upper">Side Upper</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Booking Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-20">
              <CardHeader>
                <CardTitle>Fare Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Base Fare</span>
                    <span className="font-medium">₹{classInfo.fare} × {passengers.length}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Reservation Charges</span>
                    <span className="font-medium">₹40</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">GST (5%)</span>
                    <span className="font-medium">₹{Math.round(totalFare * 0.05)}</span>
                  </div>
                  
                  <div className="border-t border-border pt-2 mt-2">
                    <div className="flex justify-between">
                      <span className="font-semibold text-lg">Total Amount</span>
                      <span className="font-bold text-2xl text-primary">
                        ₹{totalFare + 40 + Math.round(totalFare * 0.05)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 space-y-2">
                  <Button
                    onClick={handleConfirmBooking}
                    className="w-full"
                    size="lg"
                  >
                    <CreditCard className="mr-2 h-5 w-5" />
                    Proceed to Payment
                  </Button>
                  <p className="text-xs text-center text-muted-foreground">
                    By proceeding, you agree to our terms and conditions
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
