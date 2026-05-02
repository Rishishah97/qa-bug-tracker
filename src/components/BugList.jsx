import React, { useState, useMemo } from 'react';
import { SeverityBadge, StatusBadge } from './Badge';
import { SEVERITIES, STATUSES, MODULES } from '../data/bugs';

function FilterSelect({ label, value, onChange, options }) {
  return (
    <select
      value={value}
      onChange={e => onChange(e.target.value)}
      style={{
        background: 'var(--bg-elevated)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-md)',
        color: 'var(--text-primary)',
        padding: '7px 12px',
        fontSize: 13,
        cursor: 'pointer',
        outline: 'none',
      }}
    >
      <option value="">{label}</option>
      {options.map(o => <option key={o} value={o}>{o}</option>)}
    </select>
  );
}

export default function BugList({ bugs, onBugClick, onNewBug }) {
  const [search, setSearch] = useState('');
  const [filterSeverity, setFilterSeverity] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterModule, setFilterModule] = useState('');
  const [sortBy, setSortBy] = useState('createdAt');

  const filtered = useMemo(() => {
    let list = [...bugs];
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(b =>
        b.title.toLowerCase().includes(q) ||
        b.id.toLowerCase().includes(q) ||
        b.description.toLowerCase().includes(q)
      );
    }
    if (filterSeverity) list = list.filter(b => b.severity === filterSeverity);
    if (filterStatus) list = list.filter(b => b.status === filterStatus);
    if (filterModule) list = list.filter(b => b.module === filterModule);
    list.sort((a, b) => {
      if (sortBy === 'severity') {
        return SEVERITIES.indexOf(a.severity) - SEVERITIES.indexOf(b.severity);
      }
      return new Date(b[sortBy]) - new Date(a[sortBy]);
    });
    return list;
  }, [bugs, search, filterSeverity, filterStatus, filterModule, sortBy]);

  const clearFilters = () => {
    setSearch('');
    setFilterSeverity('');
    setFilterStatus('');
    setFilterModule('');
  };

  const hasFilters = search || filterSeverity || filterStatus || filterModule;

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }} className="animate-fadeIn">
      {/* Toolbar */}
      <div style={{
        padding: '20px 24px 16px',
        borderBottom: '1px solid var(--border)',
        display: 'flex', flexDirection: 'column', gap: 14,
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{ fontSize: 20, fontWeight: 600, letterSpacing: '-0.02em' }}>All Bugs</h1>
            <p style={{ color: 'var(--text-muted)', fontSize: 13, marginTop: 2 }}>
              {filtered.length} {filtered.length === 1 ? 'issue' : 'issues'} found
            </p>
          </div>
          <button
            onClick={onNewBug}
            style={{
              background: 'var(--accent)',
              color: '#0f172a',
              border: 'none',
              borderRadius: 'var(--radius-md)',
              padding: '9px 18px',
              fontWeight: 600,
              fontSize: 13,
              cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: 6,
            }}
          >
            <span style={{ fontSize: 16 }}>+</span> Report Bug
          </button>
        </div>

        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
          <input
            type="text"
            placeholder="Search bugs..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              flex: 1, minWidth: 200,
              background: 'var(--bg-elevated)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-md)',
              color: 'var(--text-primary)',
              padding: '7px 12px',
              fontSize: 13,
              outline: 'none',
            }}
          />
          <FilterSelect label="Severity" value={filterSeverity} onChange={setFilterSeverity} options={SEVERITIES} />
          <FilterSelect label="Status" value={filterStatus} onChange={setFilterStatus} options={STATUSES} />
          <FilterSelect label="Module" value={filterModule} onChange={setFilterModule} options={MODULES} />
          <FilterSelect label="Sort by" value={sortBy} onChange={setSortBy} options={['createdAt', 'updatedAt', 'severity']} />
          {hasFilters && (
            <button onClick={clearFilters} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: 13, cursor: 'pointer', padding: '7px 4px' }}>
              Clear ×
            </button>
          )}
        </div>
      </div>

      {/* Table header */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '80px 1fr 120px 120px 140px 100px',
        gap: 12,
        padding: '10px 24px',
        background: 'var(--bg-surface)',
        borderBottom: '1px solid var(--border)',
        fontSize: 11,
        fontWeight: 600,
        color: 'var(--text-muted)',
        textTransform: 'uppercase',
        letterSpacing: '0.06em',
      }}>
        <span>ID</span>
        <span>Title</span>
        <span>Severity</span>
        <span>Status</span>
        <span>Module</span>
        <span>Date</span>
      </div>

      {/* Bug rows */}
      <div style={{ flex: 1, overflowY: 'auto' }}>
        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-muted)' }}>
            <div style={{ fontSize: 32, marginBottom: 12 }}>🔍</div>
            <div style={{ fontWeight: 500 }}>No bugs found</div>
            <div style={{ fontSize: 13, marginTop: 4 }}>Try adjusting your filters</div>
          </div>
        ) : (
          filtered.map((bug, i) => (
            <div
              key={bug.id}
              onClick={() => onBugClick(bug)}
              style={{
                display: 'grid',
                gridTemplateColumns: '80px 1fr 120px 120px 140px 100px',
                gap: 12,
                padding: '14px 24px',
                borderBottom: '1px solid var(--border-light)',
                cursor: 'pointer',
                alignItems: 'center',
                transition: 'background 0.12s',
                animationDelay: `${i * 0.03}s`,
              }}
              className="animate-fadeIn"
              onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-elevated)'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-muted)' }}>{bug.id}</span>
              <div>
                <div style={{ fontSize: 14, color: 'var(--text-primary)', marginBottom: 3 }}>{bug.title}</div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>by {bug.reporter}</div>
              </div>
              <span><SeverityBadge severity={bug.severity} /></span>
              <span><StatusBadge status={bug.status} /></span>
              <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{bug.module}</span>
              <span style={{ fontSize: 12, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>{bug.createdAt}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
