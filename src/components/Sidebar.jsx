import React from 'react';

const navItems = [
  {
    id: 'dashboard', label: 'Dashboard',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="1" y="1" width="6" height="6" rx="1.5"/>
        <rect x="9" y="1" width="6" height="6" rx="1.5"/>
        <rect x="1" y="9" width="6" height="6" rx="1.5"/>
        <rect x="9" y="9" width="6" height="6" rx="1.5"/>
      </svg>
    )
  },
  {
    id: 'bugs', label: 'All Bugs',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="8" cy="8" r="6"/>
        <line x1="8" y1="5" x2="8" y2="8.5"/>
        <circle cx="8" cy="10.5" r="0.75" fill="currentColor" stroke="none"/>
      </svg>
    )
  },
  {
    id: 'new', label: 'Report Bug',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="8" cy="8" r="6"/>
        <line x1="8" y1="5" x2="8" y2="11"/>
        <line x1="5" y1="8" x2="11" y2="8"/>
      </svg>
    )
  },
];

export default function Sidebar({ activeView, onNavigate, bugCount }) {
  return (
    <aside style={{
      width: 220,
      background: 'var(--bg-surface)',
      borderRight: '1px solid var(--border)',
      display: 'flex',
      flexDirection: 'column',
      flexShrink: 0,
    }}>
      {/* Logo */}
      <div style={{
        padding: '20px 20px 16px',
        borderBottom: '1px solid var(--border)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 32, height: 32,
            background: 'var(--accent)',
            borderRadius: 8,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#0f172a" strokeWidth="2">
              <path d="M6 2L2 6l4 4"/>
              <path d="M10 2l4 4-4 4"/>
            </svg>
          </div>
          <div>
            <div style={{ fontWeight: 600, fontSize: 15, letterSpacing: '-0.02em' }}>BugTrackr</div>
            <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>QA Portfolio v1.0</div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ padding: '12px 10px', flex: 1 }}>
        <div style={{ fontSize: 10, fontWeight: 600, color: 'var(--text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase', padding: '0 10px', marginBottom: 6 }}>
          Navigation
        </div>
        {navItems.map(item => {
          const isActive = activeView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              style={{
                display: 'flex', alignItems: 'center', gap: 10,
                width: '100%', padding: '9px 12px',
                borderRadius: 'var(--radius-md)',
                border: 'none',
                background: isActive ? 'var(--accent-dim)' : 'transparent',
                color: isActive ? 'var(--accent)' : 'var(--text-secondary)',
                fontWeight: isActive ? 500 : 400,
                fontSize: 14,
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.15s ease',
              }}
              onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = 'var(--bg-elevated)'; }}
              onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = 'transparent'; }}
            >
              {item.icon}
              {item.label}
              {item.id === 'bugs' && (
                <span style={{
                  marginLeft: 'auto',
                  background: 'var(--bg-elevated)',
                  color: 'var(--text-secondary)',
                  fontSize: 11, fontWeight: 600,
                  padding: '1px 7px', borderRadius: 20,
                  fontFamily: 'var(--font-mono)',
                }}>
                  {bugCount}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div style={{
        padding: '12px 20px',
        borderTop: '1px solid var(--border)',
        fontSize: 12,
        color: 'var(--text-muted)',
      }}>
        Built with React · QA Portfolio
      </div>
    </aside>
  );
}
