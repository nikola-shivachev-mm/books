import { fireEvent, render, screen } from '@testing-library/react-native';
import BookListItem from '../../src/components/BookListItem';

const mockNavigate = jest.fn();

jest.mock('../../src/navigation/useAppNavigation', () => ({
  useAppNavigation: () => ({ navigate: mockNavigate }),
}));

const MOCK_BOOK = {
  key: '/works/OL45883W',
  title: 'The Hobbit',
  author_name: ['J. R. R. Tolkien'],
  first_publish_year: 1937,
  cover_i: 123,
};

describe('BookListItem', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it('shows the book title, author, and publication year', async () => {
    await render(<BookListItem book={MOCK_BOOK} />);

    expect(screen.getByText('The Hobbit')).toBeTruthy();
    expect(screen.getByText('J. R. R. Tolkien')).toBeTruthy();
    expect(screen.getByText('Published: 1937')).toBeTruthy();
  });

  it('opens book details with the normalized edition ID when pressed', async () => {
    await render(<BookListItem book={MOCK_BOOK} />);

    fireEvent.press(screen.getByText('The Hobbit'));

    expect(mockNavigate).toHaveBeenCalledWith('BookDetails', {
      bookId: 'OL45883W',
    });
  });
});
