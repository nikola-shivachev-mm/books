import { getJson } from '../../src/api/http';

const MOCK_URL = 'https://example.test/books';

afterEach(() => {
  jest.useRealTimers();
  jest.restoreAllMocks();
});

describe('getJson', () => {
  it('sends a GET request and returns parsed JSON', async () => {
    const payload = { title: 'Example' };
    const json = jest.fn().mockResolvedValue(payload);
    const fetchMock = jest
      .spyOn(globalThis, 'fetch')
      .mockResolvedValue({ ok: true, json } as unknown as Response);

    await expect(getJson(MOCK_URL)).resolves.toEqual(payload);

    expect(fetchMock).toHaveBeenCalledWith(MOCK_URL, {
      method: 'GET',
      signal: expect.any(AbortSignal),
      headers: { Accept: 'application/json' },
    });
    expect(json).toHaveBeenCalledTimes(1);
  });

  it('throws an error for a non-OK response', async () => {
    const json = jest.fn();
    jest.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: false,
      status: 503,
      json,
    } as unknown as Response);

    await expect(getJson(MOCK_URL)).rejects.toThrow(
      'HTTP request failed with status 503',
    );
    expect(json).not.toHaveBeenCalled();
  });

  it('preserves fetch errors', async () => {
    const networkError = new Error('Network unavailable');
    jest.spyOn(globalThis, 'fetch').mockRejectedValue(networkError);

    await expect(getJson(MOCK_URL)).rejects.toBe(networkError);
  });

  it('aborts the request when the caller signal is aborted', async () => {
    const fetchMock = jest.spyOn(globalThis, 'fetch').mockImplementation(
      (_input, options) =>
        new Promise<Response>((_resolve, reject) => {
          options?.signal?.addEventListener(
            'abort',
            () => reject(new Error('Request aborted')),
            { once: true },
          );
        }),
    );
    const controller = new AbortController();

    const request = getJson(MOCK_URL, controller.signal);
    controller.abort();

    await expect(request).rejects.toThrow('Request aborted');
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it('reports a timeout when the request exceeds 10 seconds', async () => {
    jest.useFakeTimers();
    jest.spyOn(globalThis, 'fetch').mockImplementation(
      (_input, options) =>
        new Promise<Response>((_resolve, reject) => {
          options?.signal?.addEventListener(
            'abort',
            () => reject(new Error('Request aborted')),
            { once: true },
          );
        }),
    );

    const request = getJson(MOCK_URL);
    const timeoutAssertion =
      expect(request).rejects.toThrow('Request timed out');

    await jest.advanceTimersByTimeAsync(10_000);

    await timeoutAssertion;
  });
});
