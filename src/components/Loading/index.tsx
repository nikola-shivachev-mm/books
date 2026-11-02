import { ActivityIndicator } from 'react-native';

const Loading: React.FC = () => {
  return (
    <ActivityIndicator
      style={{ padding: 16 }}
      size="large"
      color="darkblue"
      accessibilityLabel="Loading"
      accessibilityRole="progressbar"
    />
  );
};

export default Loading;
