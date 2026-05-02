import React, { useState } from 'react';
import { SeverityBadge, StatusBadge } from './Badge';
import { STATUSES } from '../data/bugs';

export default function BugDetail({ bug, onClose, onUpdate, onDelete }) {
  const [editingStatus, setEditingStatus] = useState(false);

  if (!bug) return null;

  const handleStatusChange = (newStatus) => {
    onUpdate({ ...bug, status: newStatus, updatedAt: new Date().toISOString().split('T')[0] });
    setEditingStatus(false);
  };

  return (
    <div style={{
      position: 'fixed', inset: 0,
      background: 'rgba(0,0,0,0.6)',
      display: 'flex', alignItems: 'center', justifyContent: 'flex-end',
      zIndex: 100,
      backdropFilter: 'blur(2px)',
    }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="animate-slideIn"
        style={{
          width: 560,
          height: '100vh',
          background: 'var(--bg-surface)',
          borderLeft: '1px solid var(--border)',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Header */}
        <div style={{
          padding: '20px 24px 16px',
          borderBottom: '1px solid var(--border)',
          position: 'sticky', top: 0, background: 'var(--bg-surface)', zIndex: 1,
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--accent)', fontWeight: 500 }}>{bug.id}</span>
            <div style={{ display: 'flex', gap: 8 }}>
              <button
                onClick={() => {
                  if (window.confirm(`Delete ${bug.id}?`)) { onDelete(bug.id); onClose(); }
                }}
                style={{
                  background: 'var(--critical-bg)', border: '1px solid var(--critical)',
                  borderRadius: 'var(--radius-sm)', color: 'var(--critical)',
                  padding: '5px 12px', fontSize: 12, cursor: 'pointer',
                }}
              >
                Delete
              </button>
              <button onClick={onClose} style={{
                background: 'var(--bg-elevated)', border: '1px solid var(--border)',
                borderRadius: 'var(--radius-sm)', color: 'var(--text-secondary)',
                padding: '5px 12px', fontSize: 12, cursor: 'pointer',
              }}>
                Close ×
              </button>
            </div>
          </div>
          <h2 style={{ fontSize: 18, fontWeight: 600, letterSpacing: '-0.02em', lineHeight: 1.4, marginBottom: 12 }}>{bug.title}</h2>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <SeverityBadge severity={bug.severity} />
            {editingStatus ? (
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {STATUSES.map(s => (
                  <button key={s} onClick={() => handleStatusChange(s)} style={{
                    background: s === bug.status ? 'var(--accent-dim)' : 'var(--bg-elevated)',
                    border: `1px solid ${s === bug.status ? 'var(--accent)' : 'var(--border)'}`,
                    borderRadius: 20, color: s === bug.status ? 'var(--accent)' : 'var(--text-secondary)',
                    padding: '3px 10px', fontSize: 11, cursor: 'pointer',
                  }}>
                    {s}
                  </button>
                ))}
              </div>
            ) : (
              <div onClick={() => setEditingStatus(true)} style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 5 }}>
                <StatusBadge status={bug.status} />
                <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>✎</span>
              </div>
            )}
          </div>
        </div>

        {/* Body */}
        <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 24 }}>

          {/* Meta grid */}
          <div style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr',
            gap: 1, background: 'var(--border)',
            border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', overflow: 'hidden',
          }}>
            {[
              ['Module', bug.module],
              ['Reporter', bug.reporter],
              ['Assignee', bug.assignee],
              ['Environment', bug.environment],
              ['Created', bug.createdAt],
              ['Updated', bug.updatedAt],
            ].map(([label, val]) => (
              <div key={label} style={{ background: 'var(--bg-surface)', padding: '12px 16px' }}>
                <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 3, textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>{label}</div>
                <div style={{ fontSize: 13, color: 'var(--text-primary)' }}>{val}</div>
              </div>
            ))}
          </div>

          {/* Description */}
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>Description</div>
            <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>{bug.description}</p>
          </div>

          {/* Steps to Reproduce */}
          {bug.steps && (
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 10 }}>Steps to Reproduce</div>
              <ol style={{ paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 6 }}>
                {bug.steps.map((step, i) => (
                  <li key={i} style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{step}</li>
                ))}
              </ol>
            </div>
          )}

          {/* Expected vs Actual */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <div style={{ background: 'rgba(74, 222, 128, 0.07)', border: '1px solid rgba(74, 222, 128, 0.2)', borderRadius: 'var(--radius-md)', padding: 14 }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--low)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>Expected</div>
              <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{bug.expected}</p>
            </div>
            <div style={{ background: 'rgba(248, 113, 113, 0.07)', border: '1px solid rgba(248, 113, 113, 0.2)', borderRadius: 'var(--radius-md)', padding: 14 }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--critical)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>Actual</div>
              <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{bug.actual}</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
