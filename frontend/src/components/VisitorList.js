import React from 'react';
import './VisitorList.css';

const VisitorList = ({ visitors, loading, onEdit, onDelete }) => {
  if (loading) {
    return (
      <div className="visitor-list">
        <h2>📋 Visitor List</h2>
        <div className="loading">Loading visitors...</div>
      </div>
    );
  }

  if (!visitors || visitors.length === 0) {
    return (
      <div className="visitor-list">
        <h2>📋 Visitor List</h2>
        <div className="empty-state">
          <p>No visitors registered yet.</p>
          <p>Add your first visitor using the form!</p>
        </div>
      </div>
    );
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="visitor-list">
      <h2>📋 Visitor List ({visitors.length})</h2>
      
      <div className="visitors-grid">
        {visitors.map((visitor) => (
          <div key={visitor.id} className="visitor-card">
            <div className="visitor-header">
              <h3>{visitor.name}</h3>
              {visitor.company && (
                <span className="company-badge">{visitor.company}</span>
              )}
            </div>
            
            <div className="visitor-details">
              <div className="detail-item">
                <span className="label">📧 Email:</span>
                <span className="value">{visitor.email}</span>
              </div>
              
              {visitor.phone && (
                <div className="detail-item">
                  <span className="label">📞 Phone:</span>
                  <span className="value">{visitor.phone}</span>
                </div>
              )}
              
              <div className="detail-item">
                <span className="label">🎯 Purpose:</span>
                <span className="value">{visitor.purpose}</span>
              </div>
              
              <div className="detail-item">
                <span className="label">🕐 Registered:</span>
                <span className="value">{formatDate(visitor.created_at)}</span>
              </div>
            </div>
            
            <div className="visitor-actions">
              <button 
                className="btn-edit"
                onClick={() => onEdit(visitor)}
                title="Edit visitor"
              >
                ✏️ Edit
              </button>
              <button 
                className="btn-delete"
                onClick={() => onDelete(visitor.id)}
                title="Delete visitor"
              >
                🗑️ Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VisitorList;
