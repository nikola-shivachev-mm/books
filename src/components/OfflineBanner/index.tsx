import { Text, View } from 'react-native';
import styles from './styles';

const OfflineBanner: React.FC<{ isOnline: boolean }> = ({ isOnline }) => {
  if (isOnline) {
    return null;
  }

  return (
    <View style={styles.offlineBanner}>
      <Text style={styles.offlineText}>⚠️ Offline</Text>
    </View>
  );
};

export default OfflineBanner;
