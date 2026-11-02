import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import Home from '../screens/Home';
import BookDetails from '../screens/BookDetails';

export type RootStackParamList = {
  Home: undefined;
  BookDetails: { bookId: string };
};

export type BookDetailsScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'BookDetails'
>;

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          title: 'Books',
        }}
      />
      <Stack.Screen
        name="BookDetails"
        component={BookDetails}
        options={{
          title: 'Book Details',
        }}
      />
    </Stack.Navigator>
  );
};

export default RootNavigator;
