export const normalizeBookId = (bookId: string): string => {
  if (!bookId) {
    return '';
  }

  const prefix = '/works/';

  if (bookId.startsWith(prefix)) {
    return bookId.slice(prefix.length);
  }

  return bookId;
};

export const getCoverImageUrl = (coverId: number, size: 'M' | 'L' = 'M') => {
  if (!coverId) {
    return 'https://via.placeholder.com/50x75/white/black?text=No+Cover';
  }
  return `https://covers.openlibrary.org/b/id/${coverId}-${size}.jpg`;
};
