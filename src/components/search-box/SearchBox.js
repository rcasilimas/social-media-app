import React from 'react';
import './search-box.scss'

const SearchBox = ({ searchfield, searchChange }) => {
  return (
    <div className='search-box-container'>
      <input
        style={{width: '25%'}}
        className='pa3 ba b--green bg-lightest-blue'
        type='search'
        placeholder='Search Robots'
        onChange={searchChange}
      />
    </div>
  );
}

export default SearchBox;