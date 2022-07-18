import { h } from 'preact';
import { render, fireEvent, screen, waitFor } from '@testing-library/preact';
import App from '../app';

describe('Counter', () => {
  test('should increment after "Increment" button is clicked', async () => {
    render(<div data-testid={"app"}><App /></div>);
    expect(screen.getByTestId("app").innerHTML).not.toBe('');
    fireEvent.click( screen.getByTestId('navbar-close'));
    await waitFor(() => {
      expect(screen.getByTestId("app").innerHTML).toBe('');
    });
  });
});
