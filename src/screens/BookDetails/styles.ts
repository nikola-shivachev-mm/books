import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    padding: 8,
    alignItems: 'center',
    backgroundColor: 'lightblue',
    flex: 1,
  },
  image: { width: 150, height: 200, marginRight: 8 },
  title: { fontSize: 14, fontWeight: 'bold', marginVertical: 8 },
  description: { fontSize: 12, marginVertical: 8 },
  published: { fontSize: 12, marginVertical: 8 },
});

export default styles;
