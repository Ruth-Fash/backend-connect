import { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { SearchBar } from '@/components/search/SearchBar';
import { ProductCard } from '@/components/product/ProductCard';
import { SortSelect } from '@/components/common/SortSelect';
import { Button } from '@/components/ui/button';
import { useSearchResults } from '@/hooks/useSearch';
import { SearchSort } from '@/lib/api';

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [page, setPage] = useState(0);
  const [sortBy, setSortBy] = useState<SearchSort>('relevance');

  const { data, isLoading, isError } = useSearchResults(query, page, sortBy);

  const totalPages = data ? Math.ceil(data.total / data.size) : 0;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <div className="border-b border-border bg-card/50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <SearchBar variant="compact" initialQuery={query} />
        </div>
      </div>

      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <Link to="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-2">
              <ArrowLeft className="w-4 h-4 mr-1" />
              Terug
            </Link>
            <h1 className="text-2xl font-bold text-foreground">
              Resultaten voor "{query}"
            </h1>
            {data && (
              <p className="text-muted-foreground">{data.total} producten gevonden</p>
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
            <p className="text-destructive mb-4">Er is iets misgegaan bij het laden van de resultaten.</p>
            <Button onClick={() => window.location.reload()}>Probeer opnieuw</Button>
          </div>
        )}

        {data && data.results.length === 0 && (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg">Geen producten gevonden voor "{query}"</p>
          </div>
        )}

        {data && data.results.length > 0 && (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
              {data.results.map((product) => (
                <ProductCard key={product.catalog_id} product={product} />
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
