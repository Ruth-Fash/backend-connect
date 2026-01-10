import { useState, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getSearchSuggestions, getSearchResults, SearchSort } from '@/lib/api';
import { useDebounce } from '@/hooks/useDebounce';

export function useSearchSuggestions(query: string) {
  const debouncedQuery = useDebounce(query, 300);

  return useQuery({
    queryKey: ['searchSuggestions', debouncedQuery],
    queryFn: () => getSearchSuggestions(debouncedQuery),
    enabled: debouncedQuery.length > 0,
    staleTime: 1000 * 60, // 1 minute
  });
}

export function useSearchResults(
  query: string,
  page: number = 0,
  sortBy: SearchSort = 'relevance'
) {
  return useQuery({
    queryKey: ['searchResults', query, page, sortBy],
    queryFn: () => getSearchResults(query, page, 20, sortBy),
    enabled: query.length > 0,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

export function useSearchState() {
  const [query, setQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleQueryChange = useCallback((value: string) => {
    setQuery(value);
    setShowSuggestions(value.length > 0);
  }, []);

  const hideSuggestions = useCallback(() => {
    setShowSuggestions(false);
  }, []);

  return {
    query,
    setQuery: handleQueryChange,
    showSuggestions,
    hideSuggestions,
  };
}
