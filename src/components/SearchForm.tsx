import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon, Search, ArrowRightLeft } from "lucide-react";
import { cn } from "@/lib/utils";

const SearchForm = () => {
  const navigate = useNavigate();
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState<Date>();
  const [travelClass, setTravelClass] = useState("sleeper");

  const handleSwap = () => {
    const temp = from;
    setFrom(to);
    setTo(temp);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (from && to && date) {
      navigate(`/search?from=${from}&to=${to}&date=${format(date, "yyyy-MM-dd")}&class=${travelClass}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="w-full max-w-4xl mx-auto">
      <div className="bg-card rounded-lg shadow-[var(--shadow-card)] p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="from">From Station</Label>
            <Input
              id="from"
              placeholder="e.g., New Delhi"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              required
              className="h-12"
            />
          </div>
          
          <div className="space-y-2 relative">
            <Label htmlFor="to">To Station</Label>
            <Input
              id="to"
              placeholder="e.g., Mumbai Central"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              required
              className="h-12"
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute top-8 -left-4 md:left-1/2 md:-translate-x-1/2 z-10 rounded-full bg-background border border-border hover:bg-accent"
              onClick={handleSwap}
            >
              <ArrowRightLeft className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Journey Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full h-12 justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : "Select date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                  disabled={(date) => date < new Date()}
                  className="pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label htmlFor="class">Travel Class</Label>
            <Select value={travelClass} onValueChange={setTravelClass}>
              <SelectTrigger className="h-12">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sleeper">Sleeper (SL)</SelectItem>
                <SelectItem value="3ac">Third AC (3A)</SelectItem>
                <SelectItem value="2ac">Second AC (2A)</SelectItem>
                <SelectItem value="1ac">First AC (1A)</SelectItem>
                <SelectItem value="chair">AC Chair Car (CC)</SelectItem>
                <SelectItem value="general">General</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button type="submit" className="w-full h-12 text-base" size="lg">
          <Search className="mr-2 h-5 w-5" />
          Search Trains
        </Button>
      </div>
    </form>
  );
};

export default SearchForm;
