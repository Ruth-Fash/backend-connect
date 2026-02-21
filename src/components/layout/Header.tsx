import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, ShoppingBasket, Store, Tag, LayoutGrid } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

export function Header() {
  return (
    <header className="w-full py-4 px-6 relative z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
            <ShoppingBasket className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-semibold text-foreground">Mandje</span>
        </Link>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="relative z-50">
              <Menu className="w-6 h-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-80">
            <SheetHeader>
              <SheetTitle>Winkel Op</SheetTitle>
            </SheetHeader>

            <Separator className="my-4" />

            <nav className="flex flex-col gap-2">
              <Link
                to="/supermarkets"
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-foreground hover:bg-secondary transition-colors"
              >
                <Store className="w-5 h-5 text-primary" />
                <span className="font-medium">Filter op Supermarkt</span>
              </Link>
              <Link
                to="/brands"
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-foreground hover:bg-secondary transition-colors"
              >
                <Tag className="w-5 h-5 text-primary" />
                <span className="font-medium">Filter op Merk</span>
              </Link>
              <Link
                to="/categories"
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-foreground hover:bg-secondary transition-colors"
              >
                <LayoutGrid className="w-5 h-5 text-primary" />
                <span className="font-medium">Filter op Categorie</span>
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
