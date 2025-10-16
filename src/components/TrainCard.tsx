import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Train } from "@/data/mockTrains";
import { Clock, Calendar, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface TrainCardProps {
  train: Train;
  selectedClass: string;
}

const TrainCard = ({ train, selectedClass }: TrainCardProps) => {
  const navigate = useNavigate();
  const classInfo = train.classes[selectedClass];

  const getStatusBadge = () => {
    if (!classInfo) return null;
    
    switch (classInfo.status) {
      case "available":
        return (
          <Badge className="bg-success text-success-foreground">
            Available: {classInfo.available}
          </Badge>
        );
      case "filling-fast":
        return (
          <Badge className="bg-warning text-warning-foreground">
            Filling Fast: {classInfo.available}
          </Badge>
        );
      case "waiting":
        return (
          <Badge variant="secondary">
            Waiting List
          </Badge>
        );
    }
  };

  const handleBook = () => {
    navigate(`/booking?trainId=${train.id}&class=${selectedClass}`);
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 hover:shadow-[var(--shadow-card)] transition-shadow">
      <div className="flex flex-col lg:flex-row lg:items-center gap-6">
        {/* Train Info */}
        <div className="flex-1 space-y-3">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="font-bold text-lg text-foreground">{train.name}</h3>
              <p className="text-sm text-muted-foreground">#{train.number}</p>
            </div>
            {getStatusBadge()}
          </div>

          <div className="flex items-center gap-8 text-sm">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">
                {train.days.join(", ")}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">{train.duration}</span>
            </div>
          </div>

          {/* Route and Time */}
          <div className="flex items-center gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">{train.departure}</p>
              <p className="text-sm text-muted-foreground">{train.from}</p>
            </div>
            <ArrowRight className="h-5 w-5 text-muted-foreground flex-shrink-0" />
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">{train.arrival}</p>
              <p className="text-sm text-muted-foreground">{train.to}</p>
            </div>
          </div>
        </div>

        {/* Fare and Book */}
        {classInfo && (
          <div className="flex flex-col items-center gap-3 lg:min-w-[200px] border-t lg:border-t-0 lg:border-l border-border pt-4 lg:pt-0 lg:pl-6">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Fare</p>
              <p className="text-3xl font-bold text-primary">₹{classInfo.fare}</p>
            </div>
            <Button 
              onClick={handleBook}
              disabled={classInfo.status === "waiting"}
              className="w-full"
              size="lg"
            >
              {classInfo.status === "waiting" ? "Waiting List" : "Book Now"}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrainCard;
