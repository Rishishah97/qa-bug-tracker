import React, { useState } from 'react';
import { SEVERITIES, STATUSES, MODULES } from '../data/bugs';

const inputStyle = {
  width: '100%',
  background: 'var(--bg-elevated)',
  border: '1px solid var(--border)',
  borderRadius: 'var(--radius-md)',
  color: 'var(--text-primary)',
  padding: '10px 14px',
  fontSize: 14,
  outline: 'none',
  fontFamily: 'var(--font-sans)',
};

const labelStyle = {
  display: 'block',
  fontSize: 12,
  fontWeight: 600,
  color: 'var(--text-muted)',
  textTransform: 'uppercase',
  letterSpacing: '0.06em',
  marginBottom: 7,
};

export default function NewBugForm({ onSubmit, onCancel, nextId }) {
  const [form, setForm] = useState({
    title: '',
    description: '',
    severity: 'Medium',
    status: 'Open',
    module: 'Authentication',
    reporter: '',
    assignee: 'Unassigned',
    environment: '',
    steps: '',
    expected: '',
    actual: '',
  });
  const [errors, setErrors] = useState({});

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const validate = () => {
    const e = {};
    if (!form.title.trim()) e.title = 'Title is required';
    if (!form.description.trim()) e.description = 'Description is required';
    if (!form.reporter.trim()) e.reporter = 'Reporter name is required';
    if (!form.expected.trim()) e.expected = 'Expected result is required';
    if (!form.actual.trim()) e.actual = 'Actual result is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    const today = new Date().toISOString().split('T')[0];
    onSubmit({
      id: nextId,
      ...form,
      steps: form.steps ? form.steps.split('\n').filter(s => s.trim()) : [],
      createdAt: today,
      updatedAt: today,
    });
  };

  const Field = ({ label, name, required, children }) => (
    <div style={{ marginBottom: 18 }}>
      <label style={labelStyle}>{label}{required && <span style={{ color: 'var(--critical)', marginLeft: 3 }}>*</span>}</label>
      {children}
      {errors[name] && <div style={{ color: 'var(--critical)', fontSize: 12, marginTop: 4 }}>{errors[name]}</div>}
    </div>
  );

  return (
    <div style={{ flex: 1, overflowY: 'auto' }} className="animate-fadeIn">
      <div style={{ maxWidth: 680, margin: '0 auto', padding: '28px 24px' }}>
        <div style={{ marginBottom: 28 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h1 style={{ fontSize: 20, fontWeight: 600, letterSpacing: '-0.02em' }}>Report a Bug</h1>
              <p style={{ color: 'var(--text-muted)', fontSize: 13, marginTop: 4 }}>
                New ID: <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent)' }}>{nextId}</span>
              </p>
            </div>
            <button onClick={onCancel} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: 22 }}>×</button>
          </div>
        </div>

        <Field label="Bug Title" name="title" required>
          <input
            style={{ ...inputStyle, borderColor: errors.title ? 'var(--critical)' : 'var(--border)' }}
            placeholder="Short, descriptive title..."
            value={form.title}
            onChange={e => set('title', e.target.value)}
          />
        </Field>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14, marginBottom: 18 }}>
          <div>
            <label style={labelStyle}>Severity *</label>
            <select style={inputStyle} value={form.severity} onChange={e => set('severity', e.target.value)}>
              {SEVERITIES.map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label style={labelStyle}>Status</label>
            <select style={inputStyle} value={form.status} onChange={e => set('status', e.target.value)}>
              {STATUSES.map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label style={labelStyle}>Module *</label>
            <select style={inputStyle} value={form.module} onChange={e => set('module', e.target.value)}>
              {MODULES.map(m => <option key={m}>{m}</option>)}
            </select>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 18 }}>
          <Field label="Reporter" name="reporter" required>
            <input style={{ ...inputStyle, borderColor: errors.reporter ? 'var(--critical)' : 'var(--border)' }}
              placeholder="Your name" value={form.reporter} onChange={e => set('reporter', e.target.value)} />
          </Field>
          <div>
            <label style={labelStyle}>Assignee</label>
            <input style={inputStyle} placeholder="Team or person" value={form.assignee} onChange={e => set('assignee', e.target.value)} />
          </div>
        </div>

        <Field label="Environment" name="environment">
          <input style={inputStyle} placeholder="e.g. Chrome 124, Windows 11, Staging" value={form.environment} onChange={e => set('environment', e.target.value)} />
        </Field>

        <Field label="Description" name="description" required>
          <textarea style={{ ...inputStyle, minHeight: 90, resize: 'vertical', borderColor: errors.description ? 'var(--critical)' : 'var(--border)' }}
            placeholder="Describe the bug in detail..." value={form.description} onChange={e => set('description', e.target.value)} />
        </Field>

        <Field label="Steps to Reproduce (one per line)" name="steps">
          <textarea style={{ ...inputStyle, minHeight: 90, resize: 'vertical' }}
            placeholder={'1. Go to the homepage\n2. Click on Search\n3. Enter "test"'} value={form.steps} onChange={e => set('steps', e.target.value)} />
        </Field>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          <Field label="Expected Result" name="expected" required>
            <textarea style={{ ...inputStyle, minHeight: 70, resize: 'vertical', borderColor: errors.expected ? 'var(--critical)' : 'var(--border)' }}
              placeholder="What should happen?" value={form.expected} onChange={e => set('expected', e.target.value)} />
          </Field>
          <Field label="Actual Result" name="actual" required>
            <textarea style={{ ...inputStyle, minHeight: 70, resize: 'vertical', borderColor: errors.actual ? 'var(--critical)' : 'var(--border)' }}
              placeholder="What actually happened?" value={form.actual} onChange={e => set('actual', e.target.value)} />
          </Field>
        </div>

        <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end', marginTop: 28, paddingTop: 20, borderTop: '1px solid var(--border)' }}>
          <button onClick={onCancel} style={{
            background: 'transparent', border: '1px solid var(--border)',
            borderRadius: 'var(--radius-md)', color: 'var(--text-secondary)',
            padding: '10px 22px', fontSize: 14, cursor: 'pointer',
          }}>
            Cancel
          </button>
          <button onClick={handleSubmit} style={{
            background: 'var(--accent)', border: 'none',
            borderRadius: 'var(--radius-md)', color: '#0f172a',
            padding: '10px 22px', fontSize: 14, fontWeight: 600, cursor: 'pointer',
          }}>
            Submit Bug Report
          </button>
        </div>
      </div>
    </div>
  );
}
