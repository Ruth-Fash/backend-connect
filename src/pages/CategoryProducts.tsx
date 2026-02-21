import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SortSelect } from '@/components/common/SortSelect';
import { getCategoryProducts, SortOption } from '@/lib/api';

export default function CategoryProducts() {
  const { id } = useParams<{ id: string }>();
  const [page, setPage] = useState(0);
  const [sortBy, setSortBy] = useState<SortOption>('name_asc');

  const { data, isLoading, isError } = useQuery({
    queryKey: ['categoryProducts', id, page, sortBy],
    queryFn: () => getCategoryProducts(id!, page, 20, sortBy),
    enabled: !!id,
  });

  const totalPages = data ? Math.ceil(data.total / data.size) : 0;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('nl-NL', {
      style: 'currency',
      currency: 'EUR',
    }).format(price);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-8">
        <Link to="/categories" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="w-4 h-4 mr-1" />
          Terug naar categorieën
        </Link>

        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground">{id}</h1>
            {data && (
              <p className="text-muted-foreground">{data.total} producten</p>
            )}
          </div>
          <SortSelect value={sortBy} onChange={setSortBy} />
        </div>

        {isLoading && (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        )}

        {isError && (
          <div className="text-center py-20">
            <p className="text-destructive">Er is iets misgegaan bij het laden van producten.</p>
          </div>
        )}

        {data && data.results.length > 0 && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {data.results.map((product, index) => (
                <Card key={index} className="p-4 hover:shadow-lg transition-all">
                  <div className="flex gap-3">
                    {product.image && (
                      <img
                        src={product.image}
                        alt={product.normalised_title}
                        className="w-16 h-16 object-contain rounded-lg"
                      />
                    )}
                    <div className="flex-1">
                      <h3 className="font-medium text-foreground line-clamp-2 mb-2">
                        {product.normalised_title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-1">{product.brand}</p>
                      <div className="flex items-baseline gap-2">
                        <span className="font-semibold text-primary">
                          {formatPrice(product.price_now)}
                        </span>
                        {product.price_was && (
                          <span className="text-sm text-muted-foreground line-through">
                            {formatPrice(product.price_was)}
                          </span>
                        )}
                      </div>
                      {product.promotion_details && (
                        <p className="text-sm text-primary mt-1">{product.promotion_details}</p>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-8">
                <Button
                  variant="outline"
                  disabled={page === 0}
                  onClick={() => setPage(page - 1)}
                >
                  Vorige
                </Button>
                <span className="text-sm text-muted-foreground px-4">
                  Pagina {page + 1} van {totalPages}
                </span>
                <Button
                  variant="outline"
                  disabled={page >= totalPages - 1}
                  onClick={() => setPage(page + 1)}
                >
                  Volgende
                </Button>
              </div>
            )}
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}
