import { getJson } from '../../src/api/http';
import { getBookDetails, isCorrectId } from '../../src/api/useBookDetails';

jest.mock('../../src/api/http', () => ({
  getJson: jest.fn(),
}));

const mockedGetJson = jest.mocked(getJson);

afterEach(() => {
  jest.resetAllMocks();
});

describe('isCorrectId', () => {
  it('accepts an ID with the OL prefix', () => {
    expect(isCorrectId('OL123M')).toBe(true);
  });

  it.each(['', 'BK123', '123'])(
    'rejects an ID without the OL prefix: %s',
    id => {
      expect(isCorrectId(id)).toBe(false);
    },
  );
});

describe('getBookDetails', () => {
  const bookId = 'OL123M';
  const url = `https://openlibrary.org/books/${bookId}.json`;

  it('fetches and returns the book details', async () => {
    const book = { key: `/books/${bookId}`, title: 'Example' };
    const controller = new AbortController();
    mockedGetJson.mockResolvedValue(book);

    await expect(getBookDetails(bookId, controller.signal)).resolves.toEqual(
      book,
    );

    expect(mockedGetJson).toHaveBeenCalledWith(url, controller.signal);
    expect(mockedGetJson).toHaveBeenCalledTimes(1);
  });

  it('rejects an invalid ID without making a request', async () => {
    await expect(getBookDetails('BK123')).rejects.toThrow('Invalid edition ID');

    expect(mockedGetJson).not.toHaveBeenCalled();
  });

  it.each([null, 'not a book', 42, []])(
    'rejects a malformed response: %p',
    async response => {
      mockedGetJson.mockResolvedValue(response);

      await expect(getBookDetails(bookId)).rejects.toThrow(
        `Book ${bookId} was not found`,
      );
    },
  );
});
