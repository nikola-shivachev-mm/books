jest.mock('@react-native-community/netinfo', () => ({
  __esModule: true,
  default: { addEventListener: jest.fn() },
}));

jest.mock('@tanstack/react-query', () => ({
  onlineManager: { setEventListener: jest.fn() },
}));

import type { NetInfoState } from '@react-native-community/netinfo';
import { getOnlineStatus } from '../../src/api/connectionCheck';

describe('getOnlineStatus', () => {
  it.each([
    [false, true, false],
    [true, false, false],
    [true, true, true],
    [true, null, true],
    [null, true, true],
  ])(
    'calls setOnline with %s when connection is %s and internet is %s',
    (isConnected, isInternetReachable, inOnline) => {
      const state = {
        isConnected,
        isInternetReachable,
      } as NetInfoState;
      const setOnline = jest.fn();

      getOnlineStatus(state, setOnline);

      expect(setOnline).toHaveBeenCalledWith(inOnline);
      expect(setOnline).toHaveBeenCalledTimes(1);
    },
  );

  it('does not update the status when both values are unknown', () => {
    const state = {
      isConnected: null,
      isInternetReachable: null,
    } as NetInfoState;
    const setOnline = jest.fn();

    getOnlineStatus(state, setOnline);

    expect(setOnline).not.toHaveBeenCalled();
  });
});
