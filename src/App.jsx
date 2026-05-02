import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import BugList from './components/BugList';
import BugDetail from './components/BugDetail';
import NewBugForm from './components/NewBugForm';
import { initialBugs } from './data/bugs';

export default function App() {
  const [bugs, setBugs] = useState(initialBugs);
  const [view, setView] = useState('dashboard');
  const [selectedBug, setSelectedBug] = useState(null);

  const nextId = `BUG-${String(bugs.length + 1).padStart(3, '0')}`;

  const handleAddBug = (newBug) => {
    setBugs(prev => [newBug, ...prev]);
    setView('bugs');
  };

  const handleUpdateBug = (updated) => {
    setBugs(prev => prev.map(b => b.id === updated.id ? updated : b));
    setSelectedBug(updated);
  };

  const handleDeleteBug = (id) => {
    setBugs(prev => prev.filter(b => b.id !== id));
    setSelectedBug(null);
  };

  const handleNavigate = (v) => {
    setView(v);
    setSelectedBug(null);
  };

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      <Sidebar
        activeView={view}
        onNavigate={handleNavigate}
        bugCount={bugs.length}
      />

      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', background: 'var(--bg-base)' }}>
        {view === 'dashboard' && (
          <Dashboard
            bugs={bugs}
            onBugClick={(bug) => { setSelectedBug(bug); setView('bugs'); }}
            onNavigate={handleNavigate}
          />
        )}
        {view === 'bugs' && (
          <BugList
            bugs={bugs}
            onBugClick={setSelectedBug}
            onNewBug={() => setView('new')}
          />
        )}
        {view === 'new' && (
          <NewBugForm
            onSubmit={handleAddBug}
            onCancel={() => setView('bugs')}
            nextId={nextId}
          />
        )}
      </main>

      {selectedBug && (
        <BugDetail
          bug={selectedBug}
          onClose={() => setSelectedBug(null)}
          onUpdate={handleUpdateBug}
          onDelete={handleDeleteBug}
        />
      )}
    </div>
  );
}
