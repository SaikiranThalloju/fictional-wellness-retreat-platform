
import React from 'react';
import SearchComponent from '../SearchComponent/SearchComponent';

// Implementing Sort Components
const SortComponents = ({ setSearchWord, setSelectedDateRange, setSelectedType }) => {
  return (
    <div className='sorting-container'>
      <div className='select-container'>
        <select className='sorting-select' onChange={(e) => setSelectedDateRange(e.target.value)}>
          <option className='options' value="">Filter by Date</option>
          <option className='options' value="2023-2024">2023-2024</option>
          <option className='options' value="2024-2025">2024-2025</option>
        </select>

        <select className='sorting-select' onChange={(e) => setSelectedType(e.target.value)}>
          <option className='options' value="">Filter by Type</option>
          <option className='options' value="yoga">Yoga</option>
          <option className='options' value="meditation">Meditation</option>
          <option className='options' value="detox">Detox</option>Filter by Date
        </select>
      </div>
      <SearchComponent setSearchWord={setSearchWord} />
    </div>
  );
};

export default SortComponents;



