import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { SearchSuggestions } from './SearchSuggestions';
import { useSearchSuggestions } from '@/hooks/useSearch';
import { cn } from '@/lib/utils';

interface SearchBarProps {
  variant?: 'hero' | 'compact';
  initialQuery?: string;
  className?: string;
}

export function SearchBar({ variant = 'hero', initialQuery = '', className }: SearchBarProps) {
  const [query, setQuery] = useState(initialQuery);
  const [isFocused, setIsFocused] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const { data: suggestions, isLoading } = useSearchSuggestions(query);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setShowSuggestions(false);
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const handleSuggestionClick = (catalogId: string | null, title: string) => {
    setShowSuggestions(false);
    if (catalogId) {
      navigate(`/product/${catalogId}`);
    } else {
      setQuery(title);
      navigate(`/search?q=${encodeURIComponent(title)}`);
    }
  };

  const isHero = variant === 'hero';

  return (
    <div ref={containerRef} className={cn('relative w-full', className)}>
      <form onSubmit={handleSubmit}>
        <div
          className={cn(
            'relative flex items-center bg-card rounded-full shadow-search transition-all duration-200',
            isHero ? 'h-14 md:h-16' : 'h-12',
            isFocused && 'ring-2 ring-primary ring-offset-2'
          )}
        >
          <div className="absolute left-4 md:left-6">
            <Search className={cn('text-primary', isHero ? 'w-5 h-5 md:w-6 md:h-6' : 'w-5 h-5')} />
          </div>
          <Input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setShowSuggestions(e.target.value.length > 0);
            }}
            onFocus={() => {
              setIsFocused(true);
              if (query.length > 0) setShowSuggestions(true);
            }}
            onBlur={() => setIsFocused(false)}
            placeholder="Zoek producten..."
            className={cn(
              'w-full border-none bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0',
              isHero ? 'h-14 md:h-16 pl-12 md:pl-16 pr-4 text-base md:text-lg' : 'h-12 pl-12 pr-4 text-sm'
            )}
          />
        </div>
      </form>

      {showSuggestions && query.length > 0 && (
        <SearchSuggestions
          suggestions={suggestions?.results || []}
          isLoading={isLoading}
          onSelect={handleSuggestionClick}
          query={query}
        />
      )}
    </div>
  );
}
