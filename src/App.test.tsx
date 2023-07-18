import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import App from './App';

test('renders the app and performs autocomplete search', async () => {
    const mockedFetch = jest.fn();
    global.fetch = mockedFetch;

    mockedFetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve([{ title: 'First todo' }, { title: 'Second todo' }]),
    });

    render(<App />);

    const input = screen.getByPlaceholderText('Search...');
    fireEvent.change(input, { target: { value: 'todo' } });

    await waitFor(() => expect(mockedFetch).toHaveBeenCalled());

    const autocompleteComponent = screen.getByTestId('autocomplete');
    expect(autocompleteComponent).toBeInTheDocument();
  });
