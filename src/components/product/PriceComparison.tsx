import { ExternalLink, Tag } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ProductInfo } from '@/lib/api';

interface PriceComparisonProps {
  products: ProductInfo[];
}

export function PriceComparison({ products }: PriceComparisonProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('nl-NL', {
      style: 'currency',
      currency: 'EUR',
    }).format(price);
  };

  const lowestPrice = Math.min(...products.map(p => p.price_now));

  return (
    <div className="space-y-4">
      {products.map((product, index) => {
        const isCheapest = product.price_now === lowestPrice;
        const hasDiscount = product.price_was && product.price_was > product.price_now;
        const discountPercent = hasDiscount
          ? Math.round(((product.price_was! - product.price_now) / product.price_was!) * 100)
          : 0;

        return (
          <Card
            key={`${product.supermarket}-${index}`}
            className={`p-4 transition-all ${isCheapest ? 'ring-2 ring-primary bg-primary/5' : ''}`}
          >
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 flex-shrink-0 bg-muted rounded-lg flex items-center justify-center overflow-hidden">
                <img
                  src={product.image}
                  alt={product.normalised_title}
                  className="max-w-full max-h-full object-contain"
                />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-foreground">{product.supermarket}</span>
                  {isCheapest && (
                    <Badge className="bg-primary text-primary-foreground">Laagste prijs</Badge>
                  )}
                </div>
                
                {product.promotion_details && (
                  <div className="flex items-center gap-1 text-sm text-primary">
                    <Tag className="w-3 h-3" />
                    <span>{product.promotion_details}</span>
                  </div>
                )}
              </div>

              <div className="text-right flex-shrink-0">
                <div className="flex items-baseline gap-2 justify-end">
                  <span className="text-xl font-bold text-foreground">
                    {formatPrice(product.price_now)}
                  </span>
                  {hasDiscount && (
                    <span className="text-sm text-muted-foreground line-through">
                      {formatPrice(product.price_was!)}
                    </span>
                  )}
                </div>
                {hasDiscount && (
                  <Badge variant="destructive" className="mt-1">
                    -{discountPercent}%
                  </Badge>
                )}
              </div>

              <Button
                variant="outline"
                size="sm"
                className="flex-shrink-0"
                asChild
              >
                <a href={product.link} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Bekijken
                </a>
              </Button>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
