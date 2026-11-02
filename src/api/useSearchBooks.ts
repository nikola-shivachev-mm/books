import { useQuery } from '@tanstack/react-query';
import { getJson } from './http';

const BASE_URL = 'https://openlibrary.org/search.json';
const SEARCH_FIELDS = 'key,title,author_name,first_publish_year,cover_i';

type BooksResponse = {
  books: {
    key: string;
    title: string;
    author_name?: string[];
    first_publish_year?: number;
    cover_i?: number;
  }[];
  total: number;
};

type BooksError = {
  detail?: { msg: string }[];
};

export const useSearchBooks = (query: string) => {
  return useQuery<BooksResponse, BooksError>({
    queryKey: ['books', query],
    queryFn: ({ signal }) => searchBooks(query, signal),
    enabled: query.trim().length >= 3,
  });
};

export const searchBooks = async (
  query: string,
  signal: AbortSignal,
): Promise<any> => {
  const normalizedQuery = query.trim();

  if (!normalizedQuery) {
    throw new Error('Search query cannot be empty');
  }

  const params = [
    `q=${encodeURIComponent(normalizedQuery)}`,
    `fields=${SEARCH_FIELDS}`,
  ];

  const url = `${BASE_URL}?${params.join('&')}`;

  const response = await getJson<any>(url, signal);

  if (!response || !Array.isArray(response.docs)) {
    throw new Error('Invalid search response');
  }

  const books = response.docs;

  const reportedTotal = response.numFound ?? response.num_found;

  const total =
    typeof reportedTotal === 'number' ? reportedTotal : books.length;

  return {
    books,
    total,
  };
};
