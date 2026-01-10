import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft, Loader2, Tag } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Card } from '@/components/ui/card';
import { getBrands } from '@/lib/api';

export default function Brands() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['brands'],
    queryFn: () => getBrands(),
  });

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 max-w-4xl mx-auto w-full px-6 py-8">
        <Link to="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="w-4 h-4 mr-1" />
          Terug
        </Link>

        <h1 className="text-3xl font-bold text-foreground mb-2">Merken</h1>
        <p className="text-muted-foreground mb-8">
          Bekijk alle producten per merk
        </p>

        {isLoading && (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        )}

        {isError && (
          <div className="text-center py-20">
            <p className="text-destructive">Er is iets misgegaan bij het laden van merken.</p>
          </div>
        )}

        {data && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.results.map((brand) => (
              <Link key={brand.brand_id} to={`/brands/${encodeURIComponent(brand.brand_id)}`}>
                <Card className="p-4 hover:shadow-lg transition-all hover:border-primary">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Tag className="w-5 h-5 text-primary" />
                    </div>
                    <span className="font-medium text-foreground">{brand.brand}</span>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
