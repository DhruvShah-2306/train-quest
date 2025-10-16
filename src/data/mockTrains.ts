export interface Train {
  id: string;
  number: string;
  name: string;
  from: string;
  to: string;
  departure: string;
  arrival: string;
  duration: string;
  classes: {
    [key: string]: {
      available: number;
      fare: number;
      status: "available" | "filling-fast" | "waiting";
    };
  };
  days: string[];
}

export const mockTrains: Train[] = [
  {
    id: "1",
    number: "12951",
    name: "Mumbai Rajdhani Express",
    from: "New Delhi",
    to: "Mumbai Central",
    departure: "16:35",
    arrival: "08:35",
    duration: "16h 00m",
    days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    classes: {
      "1ac": { available: 12, fare: 3500, status: "available" },
      "2ac": { available: 45, fare: 2200, status: "available" },
      "3ac": { available: 8, fare: 1500, status: "filling-fast" },
      sleeper: { available: 0, fare: 750, status: "waiting" },
    },
  },
  {
    id: "2",
    number: "12302",
    name: "Howrah Rajdhani Express",
    from: "New Delhi",
    to: "Howrah",
    departure: "17:00",
    arrival: "10:05",
    duration: "17h 05m",
    days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    classes: {
      "1ac": { available: 5, fare: 3800, status: "filling-fast" },
      "2ac": { available: 22, fare: 2400, status: "available" },
      "3ac": { available: 67, fare: 1600, status: "available" },
      sleeper: { available: 89, fare: 800, status: "available" },
    },
  },
  {
    id: "3",
    number: "12434",
    name: "Chennai Rajdhani Express",
    from: "New Delhi",
    to: "Chennai Central",
    departure: "15:55",
    arrival: "19:15",
    duration: "27h 20m",
    days: ["Mon", "Wed", "Sat"],
    classes: {
      "1ac": { available: 18, fare: 4200, status: "available" },
      "2ac": { available: 52, fare: 2600, status: "available" },
      "3ac": { available: 34, fare: 1800, status: "available" },
      sleeper: { available: 12, fare: 900, status: "filling-fast" },
    },
  },
  {
    id: "4",
    number: "12423",
    name: "Dibrugarh Rajdhani Express",
    from: "New Delhi",
    to: "Dibrugarh",
    departure: "11:00",
    arrival: "14:00",
    duration: "51h 00m",
    days: ["Tue", "Fri", "Sun"],
    classes: {
      "1ac": { available: 8, fare: 5500, status: "filling-fast" },
      "2ac": { available: 28, fare: 3200, status: "available" },
      "3ac": { available: 45, fare: 2100, status: "available" },
      sleeper: { available: 72, fare: 1100, status: "available" },
    },
  },
  {
    id: "5",
    number: "12009",
    name: "Shatabdi Express",
    from: "New Delhi",
    to: "Lucknow",
    departure: "06:10",
    arrival: "12:25",
    duration: "6h 15m",
    days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    classes: {
      chair: { available: 45, fare: 850, status: "available" },
      "1ac": { available: 12, fare: 1500, status: "available" },
    },
  },
];
