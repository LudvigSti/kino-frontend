import React from 'react';
import "./searchBar.css";

interface SearchBarProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  searchValue: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ onChange, searchValue }) => {
  return (
    <div className='search-bar'>
      <p className='search-bar-heading'>Søk Filmer</p>
      <input type='text' placeholder='Søk' onChange={onChange} value={searchValue}/>
    </div>
  );
};

export default SearchBar;
