import React, { useState, useEffect } from 'react';
import './App.css';
import countryData from './resources/countryData.json';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [input, setInput] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    const loadData = countryData.map((val) => val.name);
    setCountries(loadData);
  }, []);

  const handleChange = (e) => {
    const value = e.target.value;
    setInput(value);

    if (value === '') {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    const filteredSuggestions = countries.filter((item) =>
      item.toLowerCase().includes(value.toLowerCase())
    );
    setSuggestions(filteredSuggestions);
    setShowSuggestions(true);
  };

  const handleSuggestionClick = (suggestion) => {
    setInput(suggestion);
    setSuggestions([]);
    setShowSuggestions(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Backspace') {
      console.log('Escape');
      setShowSuggestions(false);
    }
  };

  return (
    <div>
      <h1>Search</h1>
      <input
        type="text"
        className="input"
        value={input}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="....."
      />
      <button>Search</button>
      {showSuggestions && (
        <div className="Suggestions">
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className="Suggestions"
            >
              {suggestion}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default App;