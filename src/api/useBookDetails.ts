import { useQuery } from '@tanstack/react-query';
import { getJson } from './http';

type BookDetails = {
  key?: string;
  title?: string;
  description?: {
    type?: '/type/text';
    value?: string;
  };
  first_publish_date?: string;
  covers?: number[];
  authors?: Array<{
    author?: {
      key?: string;
    };
    type?: {
      key?: string;
    };
  }>;
  subjects?: string[];
  subject_people?: string[];
  links?: Array<{
    title?: string;
    url?: string;
    type?: {
      key?: string;
    };
  }>;
};

export const useBookDetails = (bookId: string) => {
  return useQuery({
    queryKey: [bookId],

    queryFn: ({ signal }) => getBookDetails(bookId, signal),

    enabled: isCorrectId(bookId),

    staleTime: 10 * 60 * 1000,

    retry: false,
  });
};

const BOOKS_API_URL = 'https://openlibrary.org/books';

export const isCorrectId = (bookId: string) => {
  return bookId.startsWith('OL');
};

export const getBookDetails = async (
  bookId: string,
  signal?: AbortSignal,
): Promise<BookDetails> => {
  if (!isCorrectId(bookId)) {
    throw new Error('Invalid edition ID');
  }

  const url = `${BOOKS_API_URL}/${bookId}.json`;

  const book = await getJson<BookDetails>(url, signal);

  if (!book || typeof book !== 'object' || Array.isArray(book)) {
    throw new Error(`Book ${bookId} was not found`);
  }

  return book;
};
