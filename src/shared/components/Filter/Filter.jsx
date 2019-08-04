import React from 'react'
import './Filter.scss'
var FontAwesome = require('react-fontawesome');

const Filter = (props) => (
  <div className="filter-section">
    <div className="filter-inner">
      <div className="search-section">
        <FontAwesome
          className='filter-color'
          name='search'
          // size='2x'
          style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
        />
        <input type="text" onChange={props.onChange} placeholder="Search for job title or company name"/>
      </div>
      <button>Filter Results</button>
    </div>
  </div>
)

export default Filter