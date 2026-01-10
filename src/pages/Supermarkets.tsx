import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft, Loader2, Store } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Card } from '@/components/ui/card';
import { getSupermarkets } from '@/lib/api';

export default function Supermarkets() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['supermarkets'],
    queryFn: () => getSupermarkets(),
  });

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 max-w-4xl mx-auto w-full px-6 py-8">
        <Link to="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="w-4 h-4 mr-1" />
          Terug
        </Link>

        <h1 className="text-3xl font-bold text-foreground mb-2">Supermarkten</h1>
        <p className="text-muted-foreground mb-8">
          Bekijk alle producten per supermarkt
        </p>

        {isLoading && (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        )}

        {isError && (
          <div className="text-center py-20">
            <p className="text-destructive">Er is iets misgegaan bij het laden van supermarkten.</p>
          </div>
        )}

        {data && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.results.map((supermarket) => (
              <Link key={supermarket.supermarket_id} to={`/supermarkets/${supermarket.supermarket_id}`}>
                <Card className="p-6 hover:shadow-lg transition-all hover:border-primary">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                      <Store className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold text-foreground">{supermarket.supermarket}</h2>
                      <p className="text-sm text-muted-foreground">Bekijk producten →</p>
                    </div>
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
