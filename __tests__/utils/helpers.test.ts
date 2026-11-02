import { getCoverImageUrl, normalizeBookId } from '../../src/utils/helpers';

describe('normalizeBookId', () => {
  it('removes the Open Library works prefix', () => {
    expect(normalizeBookId('/works/OL123W')).toBe('OL123W');
  });

  it('leaves an unprefixed ID unchanged', () => {
    expect(normalizeBookId('OL123W')).toBe('OL123W');
  });

  it('returns an empty string for an empty ID', () => {
    expect(normalizeBookId('')).toBe('');
  });
});

describe('getCoverImageUrl', () => {
  it('uses the medium size by default', () => {
    expect(getCoverImageUrl(123)).toBe(
      'https://covers.openlibrary.org/b/id/123-M.jpg',
    );
  });

  it('uses the requested size', () => {
    expect(getCoverImageUrl(123, 'L')).toBe(
      'https://covers.openlibrary.org/b/id/123-L.jpg',
    );
  });

  it('returns the placeholder when there is no cover ID', () => {
    expect(getCoverImageUrl(0)).toBe(
      'https://via.placeholder.com/50x75/white/black?text=No+Cover',
    );
  });
});
