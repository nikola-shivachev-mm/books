import { View, Text, FlatList, TextInput } from 'react-native';
import { useSearchBooks } from '../../api/useSearchBooks';
import Loading from '../../components/Loading';
import BookListItem from '../../components/BookListItem';
import styles from './styles';
import { useState } from 'react';

const Home: React.FC = () => {
  const [query, setQuery] = useState('');
  const [submittedQuery, setSubmittedQuery] = useState('');

  const { data, isLoading, error } = useSearchBooks(submittedQuery);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search books..."
        value={query}
        style={styles.searchInput}
        returnKeyType="search"
        onChangeText={setQuery}
        onBlur={() => setSubmittedQuery(query)}
        onSubmitEditing={() => setSubmittedQuery(query)}
      />

      {error && (
        <Text>
          Error occurred while fetching books:
          {error?.detail?.[0]?.msg || 'Unknown error'}
        </Text>
      )}

      <FlatList
        data={data?.books}
        renderItem={({ item }) => <BookListItem book={item} />}
        keyExtractor={item => item.key}
        initialNumToRender={1}
        windowSize={10}
        contentContainerStyle={[styles.list]}
        ListHeaderComponent={
          <Text style={styles.heading}>
            {data?.total} books found for query
          </Text>
        }
        ListEmptyComponent={<Text style={styles.message}>No books found.</Text>}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
};

export default Home;
