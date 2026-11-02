const TEN_SECONDS_IN_MS = 10_000;
const DEFAULT_TIMEOUT_MS = TEN_SECONDS_IN_MS;

export const getJson = async <T>(
  url: string,
  signal?: AbortSignal,
): Promise<T> => {
  const controller = new AbortController();
  let timedOut = false;

  const onAbort = () => controller.abort();

  if (signal?.aborted) {
    controller.abort();
  } else {
    signal?.addEventListener('abort', onAbort, {
      once: true,
    });
  }

  const timeoutId = setTimeout(() => {
    timedOut = true;
    controller.abort();
  }, DEFAULT_TIMEOUT_MS);

  try {
    const response = await fetch(url, {
      method: 'GET',
      signal: controller.signal,
      headers: {
        Accept: 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP request failed with status ${response.status}`);
    }

    return (await response.json()) as T;
  } catch (error) {
    if (timedOut) {
      throw new Error('Request timed out');
    }

    throw error;
  } finally {
    clearTimeout(timeoutId);
    signal?.removeEventListener('abort', onAbort);
  }
};
