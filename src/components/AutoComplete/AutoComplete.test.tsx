import { render, screen, fireEvent } from '@testing-library/react';
import AutoComplete from './AutoComplete';

const mockFetchData = jest.fn();

const data = ['apple', 'banana', 'blueberry', 'cherry', 'grape', 'orange'];

describe('AutoComplete', () => {
  test('renders the input element', () => {
    render(<AutoComplete fetchData={mockFetchData} />);
    const inputElement = screen.getByPlaceholderText('Search...');
    expect(inputElement).toBeInTheDocument();
  });

  test('calls fetchData function on input change', () => {
    render(<AutoComplete fetchData={mockFetchData} />);
    const inputElement = screen.getByPlaceholderText('Search...');
    fireEvent.change(inputElement, { target: { value: 'apple' } });
    expect(mockFetchData).toHaveBeenCalledWith('apple');
  });

  test('displays suggestions', async () => {
    mockFetchData.mockResolvedValue(data);
    render(<AutoComplete fetchData={mockFetchData} />);
    const inputElement = screen.getByPlaceholderText('Search...');
    fireEvent.change(inputElement, { target: { value: 'apple' } });
    const suggestionElements = await screen.findAllByRole('listitem');
    expect(suggestionElements).toHaveLength(data.length);
  });
});
