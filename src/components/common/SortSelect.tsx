import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { SearchSort } from '@/lib/api';

interface SortSelectProps {
  value: SearchSort;
  onChange: (value: SearchSort) => void;
}

const sortOptions: { value: SearchSort; label: string }[] = [
  { value: 'relevance', label: 'Relevantie' },
  { value: 'price_asc', label: 'Prijs: laag naar hoog' },
  { value: 'price_desc', label: 'Prijs: hoog naar laag' },
  { value: 'name_asc', label: 'Naam: A-Z' },
  { value: 'name_desc', label: 'Naam: Z-A' },
];

export function SortSelect({ value, onChange }: SortSelectProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-48">
        <SelectValue placeholder="Sorteren op" />
      </SelectTrigger>
      <SelectContent>
        {sortOptions.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
