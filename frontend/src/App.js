// src/App.js

import React, { useState, useEffect } from 'react';
import DomainDetail from './DomainDetail';
import InteractivePlateHand from './components/InteractivePlateHand';
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
      <h1>The Wayfinder's Guide</h1>
	  <p>The Wayfinder's Guide is a tool of Orchard's Gate, a discipleship content and program suite that trains believers in Jesus Christ how to live a life that engages the powerful presence of the Holy Spirit, practices the character of Christ, and leads experienced believers into a life-long practice of the character of Jesus Christ.</p>
	  <p>This guide is designed to be used with a Spiritual Director, a mentor that helps believers traverse the path of leaving behind the fleshly problems that plague believers, so that they might engage the Holy Spirit in practicing a life that is righteous and whole in body, mind, and spirit.</p>

      {/* interactive hand orbiting the compass */}
      <InteractivePlateHand
        svgSize={600}
        handSize={60}
        orbitRadius={240}
		smoothing={0.08}
        flip={true}
      />

      {error && <div className="error">{error}</div>}
      {loading && <div className="loading">Loading…</div>}

      {!loading && !error && (
        <ul>
          {domains.map((d, idx) => (
            <li key={idx}>
              <button onClick={() => fetchDomain(d)}>
                {d.replace(/_/g, ' ')
                  .replace(/\b\w/g, l => l.toUpperCase())}
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
