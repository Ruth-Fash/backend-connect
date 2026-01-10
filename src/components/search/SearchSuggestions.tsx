import { SearchSuggestionItem } from '@/lib/api';
import { Skeleton } from '@/components/ui/skeleton';

interface SearchSuggestionsProps {
  suggestions: SearchSuggestionItem[];
  isLoading: boolean;
  onSelect: (catalogId: string | null, title: string) => void;
  query: string;
}

export function SearchSuggestions({ suggestions, isLoading, onSelect, query }: SearchSuggestionsProps) {
  if (isLoading) {
    return (
      <div className="absolute top-full left-0 right-0 mt-2 bg-card rounded-2xl shadow-lg border border-border overflow-hidden z-50 animate-fade-in">
        <div className="p-2">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center gap-3 p-3">
              <Skeleton className="w-10 h-10 rounded-lg" />
              <div className="flex-1">
                <Skeleton className="h-4 w-3/4 mb-2" />
                <Skeleton className="h-3 w-1/3" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (suggestions.length === 0 && query.length > 0) {
    return (
      <div className="absolute top-full left-0 right-0 mt-2 bg-card rounded-2xl shadow-lg border border-border overflow-hidden z-50 animate-fade-in">
        <div className="p-6 text-center text-muted-foreground">
          Geen suggesties gevonden voor "{query}"
        </div>
      </div>
    );
  }

  return (
    <div className="absolute top-full left-0 right-0 mt-2 bg-card rounded-2xl shadow-lg border border-border overflow-hidden z-50 animate-fade-in">
      <div className="max-h-80 overflow-y-auto">
        {suggestions.map((suggestion, index) => (
          <button
            key={`${suggestion.catalog_id}-${index}`}
            className="w-full flex items-center gap-3 p-3 hover:bg-muted/50 transition-colors text-left border-b border-border last:border-0"
            onClick={() => onSelect(suggestion.catalog_id, suggestion.normalised_title)}
          >
            {suggestion.image && (
              <img
                src={suggestion.image}
                alt={suggestion.normalised_title}
                className="w-10 h-10 object-contain rounded-lg bg-muted"
              />
            )}
            <div className="flex-1 min-w-0">
              <p className="font-medium text-foreground truncate">
                {suggestion.normalised_title}
              </p>
              <p className="text-sm text-muted-foreground truncate">
                {suggestion.brand}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
