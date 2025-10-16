import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Train, User } from "lucide-react";

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
          <Train className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold text-primary">RailBook</span>
        </Link>
        
        <nav className="flex items-center gap-4">
          <Button
            variant="ghost"
            onClick={() => navigate("/auth")}
            className="gap-2"
          >
            <User className="h-4 w-4" />
            <span className="hidden sm:inline">Login / Sign Up</span>
            <span className="sm:hidden">Account</span>
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
