import { h } from 'preact';
import { Navbar } from '../index';
import { render, fireEvent, screen } from '@testing-library/preact';

// jest.mock('~/components/modal', () => ({ Modal: () => (<i data-stub="modal"></i>) }));

describe('Navbar', () => {
    test('click', () => {
      const mockOnClose = jest.fn();
      render(<Navbar onClose={mockOnClose}/>);
      expect(mockOnClose.mock.calls.length).toBe(0);
  
      const el = screen.getByTestId('navbar-close');
      el.click()
      expect(mockOnClose.mock.calls.length).toBe(1);
    });
});
