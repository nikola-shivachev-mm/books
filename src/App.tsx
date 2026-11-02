import { StatusBar, useColorScheme } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppProviders from './providers/AppProviders';
import RootNavigator from './navigation';
import OfflineBanner from './components/OfflineBanner';
import { useOnlineStatus } from './api/connectionCheck';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const isOnline = useOnlineStatus();

  return (
    <AppProviders>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <SafeAreaView edges={['top', 'bottom']} style={{ flex: 1 }}>
        <OfflineBanner isOnline={isOnline} />
        <RootNavigator />
      </SafeAreaView>
    </AppProviders>
  );
};

export default App;
