import { View, Text, Image } from 'react-native';
import { BookDetailsScreenProps } from '../../navigation';
import { useBookDetails } from '../../api/useBookDetails';
import { getCoverImageUrl } from '../../utils/helpers';
import styles from './styles';
import Loading from '../../components/Loading';

const BookDetails: React.FC<BookDetailsScreenProps> = ({ route }) => {
  const { bookId } = route.params;
  const { data: book, isLoading, isError } = useBookDetails(bookId);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      {isError && <Text>Error occurred while fetching book details</Text>}

      <Text style={styles.title}>{book?.title}</Text>
      <Image
        source={{
          uri: getCoverImageUrl(book?.covers?.[0] as number),
        }}
        style={styles.image}
      />
      <Text style={styles.published}>
        Publishing Info: {book?.first_publish_date}
      </Text>
      <Text style={styles.description}>{book?.description?.value}</Text>
    </View>
  );
};

export default BookDetails;
