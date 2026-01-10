import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { PriceComparison } from '@/components/product/PriceComparison';
import { SortSelect } from '@/components/common/SortSelect';
import { getProductInfo, SortOption } from '@/lib/api';

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const [sortBy, setSortBy] = useState<SortOption>('price_asc');

  const { data, isLoading, isError } = useQuery({
    queryKey: ['product', id, sortBy],
    queryFn: () => getProductInfo(id!, sortBy),
    enabled: !!id,
  });

  const mainProduct = data?.results[0];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 max-w-4xl mx-auto w-full px-6 py-8">
        <Link to="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="w-4 h-4 mr-1" />
          Terug naar zoeken
        </Link>

        {isLoading && (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        )}

        {isError && (
          <div className="text-center py-20">
            <p className="text-destructive">Er is iets misgegaan bij het laden van dit product.</p>
          </div>
        )}

        {data && mainProduct && (
          <>
            <div className="mb-8">
              <div className="flex flex-col md:flex-row gap-6 mb-6">
                <div className="w-full md:w-48 h-48 bg-muted rounded-2xl flex items-center justify-center flex-shrink-0">
                  <img
                    src={mainProduct.image}
                    alt={mainProduct.normalised_title}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                    {mainProduct.normalised_title}
                  </h1>
                  <p className="text-muted-foreground">
                    Merk: {mainProduct.brand}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-foreground">
                Vergelijk prijzen ({data.results.length} winkels)
              </h2>
              <SortSelect value={sortBy} onChange={setSortBy} />
            </div>

            <PriceComparison products={data.results} />
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}
