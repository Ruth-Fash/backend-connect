import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { SearchResultItem } from '@/lib/api';

interface ProductCardProps {
  product: SearchResultItem;
}

export function ProductCard({ product }: ProductCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('nl-NL', {
      style: 'currency',
      currency: 'EUR',
    }).format(price);
  };

  const formatWeight = () => {
    if (product.weight && product.weight_unit) {
      return `${product.weight} ${product.weight_unit}`;
    }
    if (product.quantity) {
      return `${product.quantity} stuks`;
    }
    return null;
  };

  return (
    <Link to={`/product/${product.catalog_id}`}>
      <Card className="group h-full bg-card hover:shadow-lg transition-all duration-200 overflow-hidden border-border">
        <div className="aspect-square bg-muted/50 flex items-center justify-center p-4">
          <img
            src={product.image}
            alt={product.normalised_title}
            className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-200"
          />
        </div>
        <div className="p-4">
          <h3 className="font-medium text-foreground line-clamp-2 mb-2 group-hover:text-primary transition-colors">
            {product.normalised_title}
          </h3>
          {formatWeight() && (
            <p className="text-sm text-muted-foreground mb-2">{formatWeight()}</p>
          )}
          <p className="text-lg font-semibold text-primary">
            Vanaf {formatPrice(product.lowest_price)}
          </p>
        </div>
      </Card>
    </Link>
  );
}
