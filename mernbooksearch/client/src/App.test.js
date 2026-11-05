import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the navbar', () => {
  render(<App />);
  expect(screen.getByText(/google books search/i)).toBeInTheDocument();
});
