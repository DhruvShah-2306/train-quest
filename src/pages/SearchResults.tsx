import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import TrainCard from "@/components/TrainCard";
import { mockTrains } from "@/data/mockTrains";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Filter, ArrowUpDown } from "lucide-react";

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const [trains, setTrains] = useState(mockTrains);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("departure");
  const [filterClass, setFilterClass] = useState(searchParams.get("class") || "sleeper");

  const from = searchParams.get("from");
  const to = searchParams.get("to");
  const date = searchParams.get("date");

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
    }, 800);
  }, []);

  const handleSort = (value: string) => {
    setSortBy(value);
    const sorted = [...trains].sort((a, b) => {
      switch (value) {
        case "departure":
          return a.departure.localeCompare(b.departure);
        case "arrival":
          return a.arrival.localeCompare(b.arrival);
        case "duration":
          return parseInt(a.duration) - parseInt(b.duration);
        case "fare":
          return (a.classes[filterClass]?.fare || 0) - (b.classes[filterClass]?.fare || 0);
        default:
          return 0;
      }
    });
    setTrains(sorted);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container py-8">
          <div className="animate-pulse space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-48 bg-muted rounded-lg" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container py-8">
        {/* Search Summary */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            {from} → {to}
          </h1>
          <p className="text-muted-foreground">
            {date} • {trains.length} trains found
          </p>
        </div>

        {/* Filters and Sort */}
        <div className="bg-card rounded-lg border border-border p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-muted-foreground" />
              <span className="font-medium text-foreground">Filters</span>
            </div>
            
            <div className="flex flex-wrap gap-3 w-full sm:w-auto">
              <Select value={filterClass} onValueChange={setFilterClass}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Class" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sleeper">Sleeper (SL)</SelectItem>
                  <SelectItem value="3ac">Third AC (3A)</SelectItem>
                  <SelectItem value="2ac">Second AC (2A)</SelectItem>
                  <SelectItem value="1ac">First AC (1A)</SelectItem>
                  <SelectItem value="chair">AC Chair Car</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={handleSort}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="departure">Departure Time</SelectItem>
                  <SelectItem value="arrival">Arrival Time</SelectItem>
                  <SelectItem value="duration">Duration</SelectItem>
                  <SelectItem value="fare">Fare</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Train List */}
        <div className="space-y-4">
          {trains.map((train) => (
            <TrainCard key={train.id} train={train} selectedClass={filterClass} />
          ))}
        </div>

        {trains.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No trains found for your search.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
