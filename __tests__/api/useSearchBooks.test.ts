import { getJson } from '../../src/api/http';
import { searchBooks } from '../../src/api/useSearchBooks';

jest.mock('../../src/api/http', () => ({
  getJson: jest.fn(),
}));

const mockedGetJson = jest.mocked(getJson);
const signal = new AbortController().signal;

afterEach(() => {
  jest.resetAllMocks();
});

describe('searchBooks', () => {
  it('trims and encodes the query, then returns the books and reported total', async () => {
    const books = [{ key: '/works/OL1W', title: 'A Book' }];
    mockedGetJson.mockResolvedValue({ docs: books, numFound: 12 });

    await expect(searchBooks('  space books  ', signal)).resolves.toEqual({
      books,
      total: 12,
    });

    expect(mockedGetJson).toHaveBeenCalledWith(
      'https://openlibrary.org/search.json?q=space%20books&fields=key,title,author_name,first_publish_year,cover_i',
      signal,
    );
  });

  it('uses the snake_case total field when needed', async () => {
    mockedGetJson.mockResolvedValue({ docs: [], num_found: 7 });

    await expect(searchBooks('books', signal)).resolves.toEqual({
      books: [],
      total: 7,
    });
  });

  it('falls back to the number of returned books when no total is reported', async () => {
    const books = [{ key: '/works/OL1W', title: 'A Book' }];
    mockedGetJson.mockResolvedValue({ docs: books });

    await expect(searchBooks('books', signal)).resolves.toEqual({
      books,
      total: 1,
    });
  });

  it.each([null, {}, { docs: 'invalid' }])(
    'rejects an invalid search response: %p',
    async response => {
      mockedGetJson.mockResolvedValue(response as never);

      await expect(searchBooks('books', signal)).rejects.toThrow(
        'Invalid search response',
      );
    },
  );

  it('rejects a blank query without making a request', async () => {
    await expect(searchBooks('   ', signal)).rejects.toThrow(
      'Search query cannot be empty',
    );

    expect(mockedGetJson).not.toHaveBeenCalled();
  });
});
