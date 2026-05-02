import React from 'react';

const severityStyles = {
  Critical: { color: 'var(--critical)', background: 'var(--critical-bg)' },
  High: { color: 'var(--high)', background: 'var(--high-bg)' },
  Medium: { color: 'var(--medium)', background: 'var(--medium-bg)' },
  Low: { color: 'var(--low)', background: 'var(--low-bg)' },
};

const statusStyles = {
  'Open': { color: 'var(--status-open)', background: 'var(--status-open-bg)' },
  'In Progress': { color: 'var(--status-in-progress)', background: 'var(--status-in-progress-bg)' },
  'Resolved': { color: 'var(--status-resolved)', background: 'var(--status-resolved-bg)' },
  'Closed': { color: 'var(--status-closed)', background: 'var(--status-closed-bg)' },
  "Won't Fix": { color: 'var(--status-wont-fix)', background: 'var(--status-wont-fix-bg)' },
};

export function SeverityBadge({ severity }) {
  const style = severityStyles[severity] || {};
  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 5,
      padding: '3px 9px',
      borderRadius: 20,
      fontSize: 11,
      fontWeight: 600,
      letterSpacing: '0.03em',
      textTransform: 'uppercase',
      ...style,
    }}>
      <span style={{
        width: 6, height: 6, borderRadius: '50%',
        background: style.color, flexShrink: 0
      }} />
      {severity}
    </span>
  );
}

export function StatusBadge({ status }) {
  const style = statusStyles[status] || {};
  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      padding: '3px 10px',
      borderRadius: 20,
      fontSize: 11,
      fontWeight: 500,
      ...style,
    }}>
      {status}
    </span>
  );
}
