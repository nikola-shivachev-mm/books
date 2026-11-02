import { render, screen } from '@testing-library/react-native';
import OfflineBanner from '../../src/components/OfflineBanner';

describe('OfflineBanner', () => {
  it('shows the offline message when offline', async () => {
    await render(<OfflineBanner isOnline={false} />);

    expect(screen.getByText('⚠️ Offline')).toBeTruthy();
  });

  it('does not render a message when online', async () => {
    await render(<OfflineBanner isOnline />);

    expect(screen.queryByText('⚠️ Offline')).toBeNull();
  });
});
