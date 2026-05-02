import React from 'react';
import { SeverityBadge, StatusBadge } from './Badge';

function StatCard({ label, value, color, sub }) {
  return (
    <div style={{
      background: 'var(--bg-surface)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-lg)',
      padding: '20px 24px',
      display: 'flex', flexDirection: 'column', gap: 6,
    }}>
      <div style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{label}</div>
      <div style={{ fontSize: 36, fontWeight: 600, color: color || 'var(--text-primary)', letterSpacing: '-0.03em', lineHeight: 1 }}>{value}</div>
      {sub && <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{sub}</div>}
    </div>
  );
}

function RecentBugRow({ bug, onClick }) {
  return (
    <div
      onClick={() => onClick(bug)}
      style={{
        display: 'flex', alignItems: 'center', gap: 12,
        padding: '12px 16px',
        borderBottom: '1px solid var(--border-light)',
        cursor: 'pointer',
        transition: 'background 0.15s',
      }}
      onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-elevated)'}
      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
    >
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-muted)', minWidth: 60 }}>{bug.id}</span>
      <span style={{ flex: 1, fontSize: 14, color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{bug.title}</span>
      <SeverityBadge severity={bug.severity} />
      <StatusBadge status={bug.status} />
    </div>
  );
}

export default function Dashboard({ bugs, onBugClick, onNavigate }) {
  const total = bugs.length;
  const open = bugs.filter(b => b.status === 'Open').length;
  const critical = bugs.filter(b => b.severity === 'Critical').length;
  const resolved = bugs.filter(b => b.status === 'Resolved' || b.status === 'Closed').length;

  const bySeverity = ['Critical', 'High', 'Medium', 'Low'].map(s => ({
    label: s,
    count: bugs.filter(b => b.severity === s).length,
  }));

  const byModule = {};
  bugs.forEach(b => {
    byModule[b.module] = (byModule[b.module] || 0) + 1;
  });
  const moduleData = Object.entries(byModule).sort((a, b) => b[1] - a[1]).slice(0, 5);
  const maxModuleCount = moduleData[0]?.[1] || 1;

  const recent = [...bugs].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5);

  return (
    <div style={{ padding: 28, overflowY: 'auto', flex: 1 }} className="animate-fadeIn">
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 22, fontWeight: 600, letterSpacing: '-0.03em' }}>Dashboard</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: 13, marginTop: 4 }}>Overview of all reported bugs and their current state.</p>
      </div>

      {/* Stats grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 28 }}>
        <StatCard label="Total Bugs" value={total} />
        <StatCard label="Open" value={open} color="var(--status-open)" sub={`${Math.round((open / total) * 100)}% of total`} />
        <StatCard label="Critical" value={critical} color="var(--critical)" sub={critical > 0 ? 'Needs immediate attention' : 'None active'} />
        <StatCard label="Resolved" value={resolved} color="var(--status-resolved)" sub={`${Math.round((resolved / total) * 100)}% resolved`} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 24 }}>

        {/* Severity breakdown */}
        <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: 20 }}>
          <div style={{ fontWeight: 500, marginBottom: 16 }}>Bugs by Severity</div>
          {bySeverity.map(({ label, count }) => {
            const pct = total > 0 ? (count / total) * 100 : 0;
            const colors = { Critical: 'var(--critical)', High: 'var(--high)', Medium: 'var(--medium)', Low: 'var(--low)' };
            return (
              <div key={label} style={{ marginBottom: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                  <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{label}</span>
                  <span style={{ fontSize: 13, fontWeight: 600, fontFamily: 'var(--font-mono)', color: colors[label] }}>{count}</span>
                </div>
                <div style={{ height: 6, background: 'var(--bg-elevated)', borderRadius: 3, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${pct}%`, background: colors[label], borderRadius: 3, transition: 'width 0.5s ease' }} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Module breakdown */}
        <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: 20 }}>
          <div style={{ fontWeight: 500, marginBottom: 16 }}>Top Affected Modules</div>
          {moduleData.map(([mod, count]) => {
            const pct = (count / maxModuleCount) * 100;
            return (
              <div key={mod} style={{ marginBottom: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                  <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{mod}</span>
                  <span style={{ fontSize: 13, fontWeight: 600, fontFamily: 'var(--font-mono)', color: 'var(--accent)' }}>{count}</span>
                </div>
                <div style={{ height: 6, background: 'var(--bg-elevated)', borderRadius: 3, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${pct}%`, background: 'var(--accent)', borderRadius: 3, opacity: 0.6, transition: 'width 0.5s ease' }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent bugs */}
      <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
        <div style={{ padding: '16px 16px 12px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontWeight: 500 }}>Recent Bugs</div>
          <button
            onClick={() => onNavigate('bugs')}
            style={{ background: 'none', border: 'none', color: 'var(--accent)', fontSize: 13, cursor: 'pointer' }}
          >
            View all →
          </button>
        </div>
        {recent.map(bug => <RecentBugRow key={bug.id} bug={bug} onClick={onBugClick} />)}
      </div>
    </div>
  );
}
