// API client for backend communication
const API_BASE_URL = 'http://localhost:8000';

// Types based on OpenAPI schema
export interface SearchSuggestionItem {
  normalised_title: string;
  image: string;
  catalog_id: string | null;
  brand: string;
}

export interface SearchSuggestionsPayload {
  query: string;
  results: SearchSuggestionItem[];
}

export interface SearchResultItem {
  catalog_id: string | null;
  normalised_title: string;
  weight: number | null;
  weight_unit: string | null;
  quantity: number | null;
  lowest_price: number;
  image: string;
}

export interface SearchResultPayload {
  query: string;
  page: number;
  size: number;
  sort_by: string;
  total: number;
  results: SearchResultItem[];
}

export interface ProductInfo {
  normalised_title: string;
  price_now: number;
  price_was: number | null;
  image: string;
  supermarket: string;
  brand: string;
  promotion_details: string | null;
  link: string;
  weight: string | null;
  weight_unit: string | null;
  quantity: number | null;
}

export interface ProductInfoPayload {
  catalog_id: string;
  sort_by: string;
  results: ProductInfo[];
}

export interface SupermarketInfo {
  supermarket_id: number;
  supermarket: string;
}

export interface SupermarketPayload {
  sort_by: string;
  results: SupermarketInfo[];
}

export interface BrandInfo {
  brand_id: string;
  brand: string;
}

export interface BrandPayload {
  sort_by: string;
  results: BrandInfo[];
}

export interface BrandProductInfo {
  normalised_title: string;
  price_now: number;
  price_was: number | null;
  brand: string;
  promotion_details: string | null;
  image: string | null;
}

export interface BrandProductsPayload {
  brand_id: string;
  page: number;
  size: number;
  total: number;
  sort_by: string;
  results: BrandProductInfo[];
}

export interface SupermarketProductsPayload {
  supermarket_id: number;
  page: number;
  size: number;
  total: number;
  sort_by: string;
  results: ProductInfo[];
}

export interface CategoryInfo {
  category_id: string;
  category: string;
}

export interface CategoryPayload {
  sort_by: string;
  results: CategoryInfo[];
}

export interface CategoryProductInfo {
  normalised_title: string;
  price_now: number;
  price_was: number | null;
  brand: string;
  promotion_details: string | null;
  image: string | null;
}

export interface CategoryProductsPayload {
  category_id: string;
  page: number;
  size: number;
  total: number;
  sort_by: string;
  results: CategoryProductInfo[];
}

export type SearchSort = 'relevance' | 'price_asc' | 'price_desc' | 'name_asc' | 'name_desc';
export type SortOption = 'relevance' | 'price_asc' | 'price_desc' | 'name_asc' | 'name_desc';
export type SupermarketSort = 'name_asc' | 'name_desc' | 'price_asc' | 'price_desc' | 'relevance';

// API functions
export async function getSearchSuggestions(query: string): Promise<SearchSuggestionsPayload> {
  const response = await fetch(
    `${API_BASE_URL}/search/suggestions?query=${encodeURIComponent(query)}`
  );
  if (!response.ok) throw new Error('Failed to fetch suggestions');
  return response.json();
}

export async function getSearchResults(
  query: string,
  page = 0,
  size = 20,
  sortBy: SearchSort = 'relevance'
): Promise<SearchResultPayload> {
  const params = new URLSearchParams({
    query,
    page: page.toString(),
    size: size.toString(),
    sort_by: sortBy,
  });
  const response = await fetch(`${API_BASE_URL}/search/results?${params}`);
  if (!response.ok) throw new Error('Failed to fetch search results');
  return response.json();
}

export async function getProductInfo(
  catalogId: string,
  sortBy: SortOption = 'price_asc'
): Promise<ProductInfoPayload> {
  const params = new URLSearchParams({
    catalog_id: catalogId,
    sort_by: sortBy,
  });
  const response = await fetch(`${API_BASE_URL}/product/results?${params}`);
  if (!response.ok) throw new Error('Failed to fetch product info');
  return response.json();
}

export async function getSupermarkets(
  sortBy: SupermarketSort = 'name_asc'
): Promise<SupermarketPayload> {
  const response = await fetch(
    `${API_BASE_URL}/supermarkets/results?sort_by=${sortBy}`
  );
  if (!response.ok) throw new Error('Failed to fetch supermarkets');
  return response.json();
}

export async function getSupermarketProducts(
  supermarketId: string,
  page = 0,
  size = 20,
  sortBy: SupermarketSort = 'relevance'
): Promise<SupermarketProductsPayload> {
  const params = new URLSearchParams({
    page: page.toString(),
    size: size.toString(),
    sort_by: sortBy,
  });
  const response = await fetch(
    `${API_BASE_URL}/supermarkets/${supermarketId}/products?${params}`
  );
  if (!response.ok) throw new Error('Failed to fetch supermarket products');
  return response.json();
}

export async function getBrands(
  sortBy: SortOption = 'name_asc'
): Promise<BrandPayload> {
  const response = await fetch(`${API_BASE_URL}/brands/results?sort_by=${sortBy}`);
  if (!response.ok) throw new Error('Failed to fetch brands');
  return response.json();
}

export async function getBrandProducts(
  brandId: string,
  page = 0,
  size = 20,
  sortBy?: SortOption
): Promise<BrandProductsPayload> {
  const params = new URLSearchParams({
    page: page.toString(),
    size: size.toString(),
  });
  if (sortBy) params.append('sort_by', sortBy);
  const response = await fetch(
    `${API_BASE_URL}/brands/${encodeURIComponent(brandId)}/products?${params}`
  );
  if (!response.ok) throw new Error('Failed to fetch brand products');
  return response.json();
}

export async function getCategories(
  sortBy: SortOption = 'name_asc'
): Promise<CategoryPayload> {
  const response = await fetch(`${API_BASE_URL}/categories?sort_by=${sortBy}`);
  if (!response.ok) throw new Error('Failed to fetch categories');
  return response.json();
}

export async function getCategoryProducts(
  categoryId: string,
  page = 0,
  size = 20,
  sortBy?: SortOption
): Promise<CategoryProductsPayload> {
  const params = new URLSearchParams({
    page: page.toString(),
    size: size.toString(),
  });
  if (sortBy) params.append('sort_by', sortBy);
  const response = await fetch(
    `${API_BASE_URL}/categories/${encodeURIComponent(categoryId)}/products?${params}`
  );
  if (!response.ok) throw new Error('Failed to fetch category products');
  return response.json();
}
