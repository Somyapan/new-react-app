import React, { useState, useEffect } from 'react';
import './VisitorForm.css';

const VisitorForm = ({ onVisitorAdded, editingVisitor, onCancelEdit }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    purpose: '',
    company: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (editingVisitor) {
      setFormData({
        name: editingVisitor.name || '',
        email: editingVisitor.email || '',
        phone: editingVisitor.phone || '',
        purpose: editingVisitor.purpose || '',
        company: editingVisitor.company || ''
      });
    }
  }, [editingVisitor]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const url = editingVisitor 
        ? `/api/visitors/${editingVisitor.id}`
        : '/api/visitors';
      
      const method = editingVisitor ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit form');
      }

      setSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        purpose: '',
        company: ''
      });
      
      setTimeout(() => setSuccess(false), 3000);
      onVisitorAdded();
    } catch (err) {
      setError(err.message);
      console.error('Error submitting form:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      purpose: '',
      company: ''
    });
    setError(null);
    setSuccess(false);
    onCancelEdit();
  };

  return (
    <div className="visitor-form">
      <h2>{editingVisitor ? '✏️ Edit Visitor' : '➕ Add New Visitor'}</h2>
      
      {error && (
        <div className="alert alert-error">
          ⚠️ {error}
        </div>
      )}
      
      {success && (
        <div className="alert alert-success">
          ✅ Visitor {editingVisitor ? 'updated' : 'added'} successfully!
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Enter full name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email *</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="email@example.com"
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+1 (555) 123-4567"
          />
        </div>

        <div className="form-group">
          <label htmlFor="purpose">Purpose of Visit *</label>
          <textarea
            id="purpose"
            name="purpose"
            value={formData.purpose}
            onChange={handleChange}
            required
            rows="3"
            placeholder="Describe the purpose of visit"
          />
        </div>

        <div className="form-group">
          <label htmlFor="company">Company</label>
          <input
            type="text"
            id="company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            placeholder="Company name"
          />
        </div>

        <div className="form-actions">
          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? 'Submitting...' : editingVisitor ? 'Update Visitor' : 'Add Visitor'}
          </button>
          
          {editingVisitor && (
            <button 
              type="button" 
              className="btn btn-secondary"
              onClick={handleCancel}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default VisitorForm;
