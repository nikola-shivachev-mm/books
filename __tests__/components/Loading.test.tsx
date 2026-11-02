import { render, screen } from '@testing-library/react-native';
import Loading from '../../src/components/Loading';

describe('Loading', () => {
  it('renders an accessible loading indicator', async () => {
    await render(<Loading />);

    expect(screen.getByLabelText('Loading')).toBeTruthy();
  });
});
