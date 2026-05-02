import React from 'react';
import './Filter.css';
import { CATS } from '../App';

export default function Filter({ filter, setFilter, search, setSearch }) {
  return (
    <div className="controls">
      <div className="search-wrap">
        <input
          placeholder="Search expenses..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>
      <div className="filter-pills">
        {CATS.map(c => (
          <button
            key={c.id}
            className={`pill${filter === c.id ? ' active' : ''}`}
            onClick={() => setFilter(c.id)}
          >
            {c.icon} {c.label}
          </button>
        ))}
      </div>
    </div>
  );
}
