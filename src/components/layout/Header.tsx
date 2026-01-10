import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ShoppingBasket } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full py-4 px-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-foreground rounded-xl flex items-center justify-center">
            <ShoppingBasket className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-semibold text-foreground">Mandje</span>
        </Link>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="lg:hidden">
              <Menu className="w-6 h-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-80">
            <nav className="flex flex-col gap-6 mt-8">
              <Link 
                to="/supermarkets" 
                className="text-lg font-medium hover:text-primary transition-colors"
                onClick={() => setOpen(false)}
              >
                Supermarkten
              </Link>
              <Link 
                to="/brands" 
                className="text-lg font-medium hover:text-primary transition-colors"
                onClick={() => setOpen(false)}
              >
                Merken
              </Link>
            </nav>
          </SheetContent>
        </Sheet>

        <nav className="hidden lg:flex items-center gap-8">
          <Link to="/supermarkets" className="text-sm font-medium hover:text-primary transition-colors">
            Supermarkten
          </Link>
          <Link to="/brands" className="text-sm font-medium hover:text-primary transition-colors">
            Merken
          </Link>
        </nav>
      </div>
    </header>
  );
}
