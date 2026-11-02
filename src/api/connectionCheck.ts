import NetInfo, { NetInfoState } from '@react-native-community/netinfo';
import { onlineManager } from '@tanstack/react-query';
import { useSyncExternalStore } from 'react';

// onlineManager.setEventListener(setOnline => {
//   return NetInfo.addEventListener(state => {
//     const { isConnected, isInternetReachable } = state;

//     if (isConnected == null && isInternetReachable == null) {
//       return;
//     }

//     const isOnline = isConnected !== false && isInternetReachable !== false;

//     setOnline(isOnline);
//   });
// });
onlineManager.setEventListener(setOnline => {
  return NetInfo.addEventListener(state => getOnlineStatus(state, setOnline));
});

export const getOnlineStatus = (
  state: NetInfoState,
  setOnline: (isOnline: boolean) => void,
): void => {
  const { isConnected, isInternetReachable } = state;

  if (isConnected == null && isInternetReachable == null) {
    return undefined;
  }

  const isOnline = isConnected !== false && isInternetReachable !== false;
  setOnline(isOnline);
};

export const useOnlineStatus = () => {
  return useSyncExternalStore(
    notify => onlineManager.subscribe(notify),
    () => onlineManager.isOnline(),
    () => onlineManager.isOnline(),
  );
};
