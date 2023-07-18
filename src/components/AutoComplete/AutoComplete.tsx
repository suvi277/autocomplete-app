import React, { useState, ChangeEvent, useMemo } from 'react';
import './AutoComplete.css';

interface AutoCompleteProps {
  fetchData: (searchTerm: string) => Promise<string[]>;
}
// TODO
// Accessibility considerations
// Performance consideration - Optimize Rendering - like infinite scroling, loading suggestions as chunk based
// More styles for the suggested Lists

const AutoComplete: React.FC<AutoCompleteProps> = ({ fetchData }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState<string[]>([]);

    /*
    * TODO
    * Debouncing the input change event
    * Delaying the request until the user finishes typing or pauses for a certain duration
    */
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (term) {
        filterSuggestions(term);
    } else {
        setSuggestions([]);
    }
    };

    /*
    * TODO
    * Virtualized list rendering to improve performance. 
    * Libraries like react-window or react-virtualized can help with virtualized rendering
    */

    const filterSuggestions = async (term: string) => {
        const filteredData = await fetchData(term);
        setSuggestions(filteredData);
    };

    /*
    * REVISIT
    * It has two nested loops to render data, need to revisit if can be refactored.
    */

    const highlightMatch = useMemo(() => {
    if (searchTerm === '') {
        return (text: string) => text;
    }

    return (text: string) => {
        const regex = new RegExp(searchTerm, 'gi');
        const parts = text.split(regex);
        const matches = text.match(regex);

        return (
        <>
            {parts.map((part, index) => (
            <span key={index}>
                {part}
                {matches && index < matches.length && (
                <strong className='blue'>{matches[index]}</strong>
                )}
            </span>
            ))}
        </>
        );
    };
    }, [searchTerm]);

    return (
        <div className='Autocomplete' data-testid="autocomplete">
        <input
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
            placeholder="Search..."
        />
        {
            suggestions.length > 0 &&
            <ul>
                {suggestions.map((suggestion, index) => (
                <li key={index}>{highlightMatch(suggestion)}</li>
                ))}
            </ul>
        }
        </div>
    );
};

export default AutoComplete;
