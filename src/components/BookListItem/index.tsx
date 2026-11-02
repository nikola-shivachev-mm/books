import React from 'react';
import { Image, TouchableOpacity, Text, View } from 'react-native';
import { useAppNavigation } from '../../navigation/useAppNavigation';
import styles from './styles';
import { getCoverImageUrl, normalizeBookId } from '../../utils/helpers';

type BookListItemProps = {
  book: {
    key: string;
    title: string;
    author_name?: string[];
    first_publish_year?: number;
    cover_i?: number;
  };
};

const BookListItem: React.FC<BookListItemProps> = ({ book }) => {
  const { navigate } = useAppNavigation();
  console.log('BookListItem render', book.key);
  return (
    <TouchableOpacity
      onPress={() => {
        navigate('BookDetails', { bookId: normalizeBookId(book.key) });
      }}
    >
      <View style={styles.container}>
        <View>
          <Image
            source={{
              uri: getCoverImageUrl(book.cover_i as number),
            }}
            style={styles.image}
          />
        </View>
        <View style={styles.list}>
          <Text style={styles.title}>{book.title}</Text>
          <Text style={styles.subTitle}>{book.author_name?.join(', ')}</Text>
          <Text style={styles.subTitle}>
            Published: {book.first_publish_year}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default React.memo(BookListItem);
