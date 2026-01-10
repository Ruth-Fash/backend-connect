import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { SearchBar } from '@/components/search/SearchBar';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gradient-start to-gradient-end">
      <Header />
      
      <main className="flex-1 flex flex-col items-center justify-center px-6 -mt-20">
        <div className="w-full max-w-2xl text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-8 leading-tight">
            Vind de beste prijzen voor je boodschappen.
          </h1>
          
          <SearchBar variant="hero" className="max-w-xl mx-auto" />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
