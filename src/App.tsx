import React from 'react';
import AutoComplete from './components/AutoComplete/AutoComplete';
import './App.css';

const ENDPOINT_ENTRY = "https://jsonplaceholder.typicode.com";

interface Title  {
  title: string;
}

const App: React.FC = () => {
  const searchTodos = async (searchTerm: string): Promise<string[]> => {
    try {
      const response = await fetch(
        `${ENDPOINT_ENTRY}/todos?q=${searchTerm}`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch todos');
      }

      const data = await response.json();
      
      return data.map(({title}: Title) => title);

    } catch (error) {
      console.error('Error fetching data:', error);
      throw new Error('Failed to fetch todos');
    }
  };

  return (
    <div className='App'>
      <h1>Autocomplete Todos Example</h1>
      <div className='App-main'>
        <AutoComplete fetchData={searchTodos} />
      </div>
    </div>
  );
};

export default App;
