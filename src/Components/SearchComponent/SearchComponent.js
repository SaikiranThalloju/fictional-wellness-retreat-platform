
import React from 'react';

// Implementing Search Components


const SearchComponent = ({ setSearchWord }) => {
  return (
    <div>
      <input
        className='search-component'
        type='text'
        placeholder='Search by title'
        onChange={(e) => setSearchWord(e.target.value)}
      />
    </div>
  );
};

export default SearchComponent;

