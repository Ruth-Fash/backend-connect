import { useState, useEffect } from 'react';
import { Filter, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { getSupermarkets, getBrands, SupermarketInfo, BrandInfo } from '@/lib/api';

interface FilterSheetProps {
  selectedSupermarkets: string[];
  selectedBrands: string[];
  onSupermarketsChange: (supermarkets: string[]) => void;
  onBrandsChange: (brands: string[]) => void;
  onReset: () => void;
}

export function FilterSheet({
  selectedSupermarkets,
  selectedBrands,
  onSupermarketsChange,
  onBrandsChange,
  onReset,
}: FilterSheetProps) {
  const [open, setOpen] = useState(false);
  const [supermarkets, setSupermarkets] = useState<SupermarketInfo[]>([]);
  const [brands, setBrands] = useState<BrandInfo[]>([]);

  useEffect(() => {
    Promise.all([getSupermarkets(), getBrands()]).then(([supermarketData, brandData]) => {
      setSupermarkets(supermarketData.results);
      setBrands(brandData.results);
    });
  }, []);

  const toggleSupermarket = (id: string) => {
    if (selectedSupermarkets.includes(id)) {
      onSupermarketsChange(selectedSupermarkets.filter((s) => s !== id));
    } else {
      onSupermarketsChange([...selectedSupermarkets, id]);
    }
  };

  const toggleBrand = (id: string) => {
    if (selectedBrands.includes(id)) {
      onBrandsChange(selectedBrands.filter((b) => b !== id));
    } else {
      onBrandsChange([...selectedBrands, id]);
    }
  };

  const activeFiltersCount = selectedSupermarkets.length + selectedBrands.length;

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Filter className="w-4 h-4" />
          Filters
          {activeFiltersCount > 0 && (
            <span className="ml-1 bg-primary text-primary-foreground rounded-full w-5 h-5 text-xs flex items-center justify-center">
              {activeFiltersCount}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-80 sm:w-96">
        <SheetHeader>
          <SheetTitle>Filters</SheetTitle>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          <div>
            <h3 className="font-medium text-primary mb-3">Filter op Supermarkt</h3>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {supermarkets.map((supermarket) => (
                <div key={supermarket.supermarket_id} className="flex items-center gap-2">
                  <Checkbox
                    id={`supermarket-${supermarket.supermarket_id}`}
                    checked={selectedSupermarkets.includes(supermarket.supermarket_id.toString())}
                    onCheckedChange={() => toggleSupermarket(supermarket.supermarket_id.toString())}
                  />
                  <Label
                    htmlFor={`supermarket-${supermarket.supermarket_id}`}
                    className="cursor-pointer"
                  >
                    {supermarket.supermarket}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="font-medium mb-3">Filter op Merk</h3>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {brands.map((brand) => (
                <div key={brand.brand_id} className="flex items-center gap-2">
                  <Checkbox
                    id={`brand-${brand.brand_id}`}
                    checked={selectedBrands.includes(brand.brand_id)}
                    onCheckedChange={() => toggleBrand(brand.brand_id)}
                  />
                  <Label htmlFor={`brand-${brand.brand_id}`} className="cursor-pointer">
                    {brand.brand}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute bottom-6 left-6 right-6 space-y-3">
          <Button className="w-full" onClick={() => setOpen(false)}>
            Filters Toepassen
          </Button>
          <Button
            variant="ghost"
            className="w-full"
            onClick={() => {
              onReset();
              setOpen(false);
            }}
          >
            Reset
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
