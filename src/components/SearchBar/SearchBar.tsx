import React from 'react';
import "./searchBar.css";

const SearchBar: React.FC = () => {
  return (
    <div className='search-bar'>
      <p className='search-bar-heading'>Søk Filmer</p>
      <input type='text' placeholder='Søk' />
    </div>
  );
};

export default SearchBar;
