import React, { useState, useEffect } from 'react';
import VisitorForm from './components/VisitorForm';
import VisitorList from './components/VisitorList';
import './App.css';

function App() {
  const [visitors, setVisitors] = useState([]);
  const [editingVisitor, setEditingVisitor] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchVisitors = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/visitors');
      if (!response.ok) throw new Error('Failed to fetch visitors');
      const data = await response.json();
      setVisitors(data.data);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching visitors:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVisitors();
  }, []);

  const handleVisitorAdded = () => {
    fetchVisitors();
    setEditingVisitor(null);
  };

  const handleEdit = (visitor) => {
    setEditingVisitor(visitor);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this visitor?')) {
      return;
    }

    try {
      const response = await fetch(`/api/visitors/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete visitor');
      fetchVisitors();
    } catch (err) {
      setError(err.message);
      console.error('Error deleting visitor:', err);
    }
  };

  const handleCancelEdit = () => {
    setEditingVisitor(null);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>🏢 Visitor Management System</h1>
        <p>Manage your visitors efficiently</p>
      </header>

      <div className="container">
        <div className="form-section">
          <VisitorForm 
            onVisitorAdded={handleVisitorAdded}
            editingVisitor={editingVisitor}
            onCancelEdit={handleCancelEdit}
          />
        </div>

        <div className="list-section">
          {error && (
            <div className="error-message">
              <p>⚠️ {error}</p>
            </div>
          )}
          
          <VisitorList 
            visitors={visitors}
            loading={loading}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
