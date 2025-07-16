import React, { useState, useEffect } from 'react';
import DomainDetail from './DomainDetail';
import './App.css';

function App() {
  const [domains, setDomains] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch('/api/domains')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch domains');
        return res.json();
      })
      .then(data => setDomains(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const fetchDomain = (id) => {
    setLoading(true);
    setError(null);
    fetch(`/api/domains/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Domain not found');
        return res.json();
      })
      .then(setSelected)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  };

  return (
    <div className="App">
      <h1>Spiritual Formation Domains</h1>

      {error && <div className="error">{error}</div>}
      {loading && <div className="loading">Loading…</div>}

      {!loading && !error && (
        <ul>
          {domains.map((d, idx) => (		
            <li key={idx}>
              <button onClick={() => fetchDomain(d)}>
                {d.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </button>
            </li>
          ))}
        </ul>
      )}

      {selected && <DomainDetail domain={selected} />}
    </div>
  );
}

export default App;