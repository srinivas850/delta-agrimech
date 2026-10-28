import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminFetch, getAdminUser, clearAdminAuth } from '../utils/adminAuth';
import { BRAND } from '../data/siteData';
import './AdminDashboard.css';

const STATUS_OPTIONS = [
  { value: 'all', label: 'All Statuses' },
  { value: 'new', label: 'New' },
  { value: 'contacted', label: 'Contacted' },
  { value: 'in_progress', label: 'In Progress' },
  { value: 'closed', label: 'Closed' },
];

const TYPE_OPTIONS = [
  { value: 'all', label: 'All Types' },
  { value: 'dealer', label: 'Dealer Enquiry' },
  { value: 'product', label: 'Machine Enquiry' },
];

export default function AdminDashboard() {
  const navigate = useNavigate();
  const adminUser = getAdminUser();

  const [enquiries, setEnquiries] = useState([]);
  const [summary, setSummary] = useState({
    total: 0,
    newCount: 0,
    contactedCount: 0,
    inProgressCount: 0,
    closedCount: 0,
    dealerCount: 0,
    productCount: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);
  const [noteText, setNoteText] = useState('');
  const [savingNote, setSavingNote] = useState(false);
  const [lastRefreshed, setLastRefreshed] = useState(new Date());

  const fetchEnquiries = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const params = new URLSearchParams();
      if (searchQuery.trim()) params.append('q', searchQuery.trim());
      if (statusFilter !== 'all') params.append('status', statusFilter);
      if (typeFilter !== 'all') params.append('type', typeFilter);

      const endpoint = `/api/admin/enquiries?${params.toString()}`;
      const data = await adminFetch(endpoint);

      setEnquiries(data.enquiries || []);
      if (data.summary) setSummary(data.summary);
      setLastRefreshed(new Date());
    } catch (err) {
      console.error('Fetch enquiries error:', err);
      setError(err.message || 'Failed to fetch enquiries from Neon database.');
    } finally {
      setLoading(false);
    }
  }, [searchQuery, statusFilter, typeFilter]);

  useEffect(() => {
    fetchEnquiries();
  }, [fetchEnquiries]);

  const handleLogout = () => {
    clearAdminAuth();
    navigate('/admin/login', { replace: true });
  };

  const handleStatusChange = async (id, newStatus) => {
    setUpdatingId(id);
    try {
      const data = await adminFetch(`/api/admin/enquiries/${id}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ status: newStatus }),
      });

      // Update local table
      setEnquiries((prev) =>
        prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
      );

      // Update active modal if open
      if (selectedEnquiry && selectedEnquiry.id === id) {
        setSelectedEnquiry((prev) => ({ ...prev, status: newStatus }));
      }

      // Re-fetch counts
      const updatedData = await adminFetch('/api/admin/enquiries');
      if (updatedData.summary) setSummary(updatedData.summary);
    } catch (err) {
      alert(`Error updating status: ${err.message}`);
    } finally {
      setUpdatingId(null);
    }
  };

  const handleOpenDetails = (enquiry) => {
    setSelectedEnquiry(enquiry);
    setNoteText(enquiry.notes || '');
  };

  const handleSaveNotes = async () => {
    if (!selectedEnquiry) return;
    setSavingNote(true);
    try {
      await adminFetch(`/api/admin/enquiries/${selectedEnquiry.id}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ notes: noteText }),
      });

      setEnquiries((prev) =>
        prev.map((item) =>
          item.id === selectedEnquiry.id ? { ...item, notes: noteText } : item
        )
      );
      setSelectedEnquiry((prev) => ({ ...prev, notes: noteText }));
      alert('Internal notes saved successfully.');
    } catch (err) {
      alert(`Failed to save notes: ${err.message}`);
    } finally {
      setSavingNote(false);
    }
  };

  const handleDeleteEnquiry = async (id) => {
    if (!window.confirm('Are you sure you want to delete this enquiry record?')) return;
    try {
      await adminFetch(`/api/admin/enquiries/${id}`, { method: 'DELETE' });
      setEnquiries((prev) => prev.filter((item) => item.id !== id));
      if (selectedEnquiry && selectedEnquiry.id === id) setSelectedEnquiry(null);

      // Re-fetch counts
      const updatedData = await adminFetch('/api/admin/enquiries');
      if (updatedData.summary) setSummary(updatedData.summary);
    } catch (err) {
      alert(`Failed to delete enquiry: ${err.message}`);
    }
  };

  const formatDate = (isoString) => {
    if (!isoString) return '—';
    const date = new Date(isoString);
    return date.toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  return (
    <div className="admin-dashboard">
      {/* ── Top Header Bar ───────────────────────────────────── */}
      <header className="admin-header">
        <div className="admin-header__container">
          <div className="admin-header__brand">
            <img
              src={BRAND.logoUrl}
              alt="Delta Agrimech"
              className="admin-header__logo"
              onError={(e) => {
                if (e.target.src !== window.location.origin + BRAND.localLogoUrl && !e.target.dataset.triedLocal) {
                  e.target.dataset.triedLocal = 'true';
                  e.target.src = BRAND.localLogoUrl;
                } else {
                  e.target.style.display = 'none';
                }
              }}
            />
            <div className="admin-header__title-group">
              <span className="admin-header__badge">Admin Control Portal</span>
              <h1 className="admin-header__title">Customer Enquiry Management</h1>
            </div>
          </div>

          <div className="admin-header__actions">
            <span className="admin-user-pill">
              👤 {adminUser ? adminUser.username : 'admin'} (Authorized)
            </span>
            <a href="/" target="_blank" rel="noopener noreferrer" className="btn btn-outline admin-view-site-btn">
              🌐 View Live Site
            </a>
            <button onClick={handleLogout} className="btn btn-danger admin-logout-btn">
              Sign Out
            </button>
          </div>
        </div>
      </header>

      <main className="admin-main container">
        {/* ── Summary KPI Cards ────────────────────────────────── */}
        <section className="admin-summary-grid">
          {/* Card 1: Total */}
          <div className="kpi-card kpi-card--total">
            <div className="kpi-card__icon">📋</div>
            <div className="kpi-card__content">
              <span className="kpi-card__label">Total Enquiries</span>
              <span className="kpi-card__value">{summary.total}</span>
              <span className="kpi-card__subtext">
                {summary.dealerCount} Dealer • {summary.productCount} Machine
              </span>
            </div>
          </div>

          {/* Card 2: New Enquiries */}
          <div className="kpi-card kpi-card--new">
            <div className="kpi-card__icon">🟢</div>
            <div className="kpi-card__content">
              <span className="kpi-card__label">New / Pending</span>
              <span className="kpi-card__value">{summary.newCount}</span>
              <span className="kpi-card__subtext">Requires initial customer follow-up</span>
            </div>
          </div>

          {/* Card 3: Contacted */}
          <div className="kpi-card kpi-card--contacted">
            <div className="kpi-card__icon">📞</div>
            <div className="kpi-card__content">
              <span className="kpi-card__label">Contacted</span>
              <span className="kpi-card__value">{summary.contactedCount}</span>
              <span className="kpi-card__subtext">In touch with sales team</span>
            </div>
          </div>

          {/* Card 4: In Progress / Closed */}
          <div className="kpi-card kpi-card--progress">
            <div className="kpi-card__icon">🤝</div>
            <div className="kpi-card__content">
              <span className="kpi-card__label">In Progress / Deal</span>
              <span className="kpi-card__value">{summary.inProgressCount}</span>
              <span className="kpi-card__subtext">{summary.closedCount} completed deals</span>
            </div>
          </div>
        </section>

        {/* ── Filter & Search Toolbar ──────────────────────────── */}
        <section className="admin-toolbar">
          <div className="admin-toolbar__search">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search by customer name, phone, email, business, city, product..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button className="clear-search-btn" onClick={() => setSearchQuery('')}>
                ✕
              </button>
            )}
          </div>

          <div className="admin-toolbar__filters">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="admin-select"
            >
              {STATUS_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>

            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="admin-select"
            >
              {TYPE_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>

            <button
              className="btn btn-outline-dark admin-refresh-btn"
              onClick={fetchEnquiries}
              disabled={loading}
              title="Refresh from Neon PostgreSQL"
            >
              🔄 {loading ? 'Refreshing…' : 'Refresh'}
            </button>
          </div>
        </section>

        {/* ── Table Container ──────────────────────────────────── */}
        <section className="admin-table-container">
          <div className="admin-table-header">
            <div className="admin-table-header__left">
              <h2>Customer Enquiries</h2>
              <span className="record-count">({enquiries.length} records shown)</span>
            </div>
            <div className="admin-table-header__right">
              <span className="db-indicator">🟢 Connected to Neon DB</span>
              <span className="refresh-time">
                Updated: {lastRefreshed.toLocaleTimeString()}
              </span>
            </div>
          </div>

          {error && (
            <div className="admin-error-banner">
              ⚠️ {error}
              <button onClick={fetchEnquiries} className="btn-retry">
                Retry
              </button>
            </div>
          )}

          {loading && enquiries.length === 0 ? (
            <div className="admin-loading-state">
              <div className="loading-spinner" />
              <p>Fetching real-time records from Neon PostgreSQL database…</p>
            </div>
          ) : enquiries.length === 0 ? (
            <div className="admin-empty-state">
              <div className="empty-icon">📭</div>
              <h3>No Enquiries Found</h3>
              <p>
                {searchQuery || statusFilter !== 'all' || typeFilter !== 'all'
                  ? 'No records match your search or filter criteria. Try clearing filters.'
                  : 'No customer enquiries have been submitted yet. They will appear here immediately upon submission.'}
              </p>
              {(searchQuery || statusFilter !== 'all' || typeFilter !== 'all') && (
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    setSearchQuery('');
                    setStatusFilter('all');
                    setTypeFilter('all');
                  }}
                >
                  Clear All Filters
                </button>
              )}
            </div>
          ) : (
            <div className="table-responsive">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Customer Name</th>
                    <th>Phone</th>
                    <th>Email</th>
                    <th>Product / Type</th>
                    <th>Date & Time</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {enquiries.map((enquiry) => (
                    <tr
                      key={enquiry.id}
                      className={`row-status-${enquiry.status}`}
                    >
                      {/* Name & Business */}
                      <td className="cell-customer">
                        <div className="customer-name">{enquiry.customer_name}</div>
                        {enquiry.business_name && (
                          <div className="customer-business">🏢 {enquiry.business_name}</div>
                        )}
                        {(enquiry.city || enquiry.state) && (
                          <div className="customer-location">
                            📍 {[enquiry.city, enquiry.state].filter(Boolean).join(', ')}
                          </div>
                        )}
                      </td>

                      {/* Phone */}
                      <td className="cell-phone">
                        <a href={`tel:${enquiry.phone}`} className="phone-link" title="Click to call customer">
                          📞 {enquiry.phone}
                        </a>
                      </td>

                      {/* Email */}
                      <td className="cell-email">
                        <a href={`mailto:${enquiry.email}`} className="email-link" title="Click to email customer">
                          ✉️ {enquiry.email}
                        </a>
                      </td>

                      {/* Product & Type */}
                      <td className="cell-product">
                        {enquiry.enquiry_type === 'product' ? (
                          <span className="badge-product">
                            🚜 {enquiry.product || 'Machine Enquiry'}
                          </span>
                        ) : (
                          <span className="badge-dealer">
                            🤝 Dealer Network
                          </span>
                        )}
                      </td>

                      {/* Date */}
                      <td className="cell-date">
                        {formatDate(enquiry.created_at)}
                      </td>

                      {/* Status Selector */}
                      <td className="cell-status">
                        <select
                          value={enquiry.status}
                          onChange={(e) => handleStatusChange(enquiry.id, e.target.value)}
                          disabled={updatingId === enquiry.id}
                          className={`status-pill status-pill--${enquiry.status}`}
                        >
                          <option value="new">🟢 New</option>
                          <option value="contacted">📞 Contacted</option>
                          <option value="in_progress">⏳ In Progress</option>
                          <option value="closed">✅ Closed</option>
                        </select>
                      </td>

                      {/* Actions */}
                      <td className="cell-actions">
                        <div className="actions-cluster">
                          <a
                            href={`tel:${enquiry.phone}`}
                            className="action-btn action-btn--call"
                            title="Call customer directly"
                          >
                            📞 Call
                          </a>
                          <button
                            type="button"
                            className="action-btn action-btn--view"
                            onClick={() => handleOpenDetails(enquiry)}
                            title="View full enquiry details & notes"
                          >
                            👁️ Details
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>

      {/* ── Enquiry Details Modal / Drawer ───────────────────── */}
      {selectedEnquiry && (
        <div className="admin-drawer-backdrop" onClick={() => setSelectedEnquiry(null)}>
          <div
            className="admin-drawer"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            <div className="admin-drawer__header">
              <div>
                <span className="drawer-badge">Enquiry #{selectedEnquiry.id}</span>
                <h2>{selectedEnquiry.customer_name}</h2>
              </div>
              <button
                className="drawer-close-btn"
                onClick={() => setSelectedEnquiry(null)}
              >
                ✕
              </button>
            </div>

            <div className="admin-drawer__body">
              {/* Quick Actions Bar */}
              <div className="drawer-quick-actions">
                <a
                  href={`tel:${selectedEnquiry.phone}`}
                  className="btn btn-primary drawer-action-btn"
                >
                  📞 Call Customer ({selectedEnquiry.phone})
                </a>
                <a
                  href={`mailto:${selectedEnquiry.email}?subject=Delta Agrimech Enquiry`}
                  className="btn btn-outline-dark drawer-action-btn"
                >
                  ✉️ Send Email
                </a>
              </div>

              {/* Status updater */}
              <div className="drawer-section">
                <h3>Enquiry Status</h3>
                <div className="status-button-group">
                  {['new', 'contacted', 'in_progress', 'closed'].map((st) => (
                    <button
                      key={st}
                      type="button"
                      className={`status-btn ${selectedEnquiry.status === st ? 'active' : ''} status-btn--${st}`}
                      onClick={() => handleStatusChange(selectedEnquiry.id, st)}
                    >
                      {st === 'new' && '🟢 New'}
                      {st === 'contacted' && '📞 Contacted'}
                      {st === 'in_progress' && '⏳ In Progress'}
                      {st === 'closed' && '✅ Closed'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Customer details grid */}
              <div className="drawer-section">
                <h3>Customer Information</h3>
                <div className="details-grid">
                  <div className="detail-item">
                    <span className="detail-label">Full Name</span>
                    <span className="detail-value">{selectedEnquiry.customer_name}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Phone Number</span>
                    <span className="detail-value font-mono">{selectedEnquiry.phone}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Email Address</span>
                    <span className="detail-value font-mono">{selectedEnquiry.email}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Business / Firm</span>
                    <span className="detail-value">{selectedEnquiry.business_name || 'Individual Farmer / Not specified'}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Location</span>
                    <span className="detail-value">
                      {[selectedEnquiry.city, selectedEnquiry.state].filter(Boolean).join(', ') || 'Not specified'}
                    </span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Submission Date</span>
                    <span className="detail-value">{formatDate(selectedEnquiry.created_at)}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Enquiry Category</span>
                    <span className="detail-value">
                      {selectedEnquiry.enquiry_type === 'product' ? '🚜 Machine Purchase Enquiry' : '🤝 Dealership Network Enquiry'}
                    </span>
                  </div>
                  {selectedEnquiry.product && (
                    <div className="detail-item">
                      <span className="detail-label">Interested Machine</span>
                      <span className="detail-value font-bold text-primary">{selectedEnquiry.product}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Message */}
              <div className="drawer-section">
                <h3>Customer Message / Requirements</h3>
                <div className="drawer-message-box">
                  {selectedEnquiry.message ? (
                    <p>{selectedEnquiry.message}</p>
                  ) : (
                    <p className="no-message">No additional comments entered by customer.</p>
                  )}
                </div>
              </div>

              {/* Internal Notes */}
              <div className="drawer-section">
                <h3>Admin Follow-up Notes</h3>
                <textarea
                  className="drawer-notes-textarea"
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                  placeholder="Record customer conversation details, quotation numbers, requested delivery dates, or loan status..."
                  rows={4}
                />
                <button
                  type="button"
                  className="btn btn-primary btn-save-notes"
                  onClick={handleSaveNotes}
                  disabled={savingNote}
                >
                  {savingNote ? 'Saving Notes…' : '💾 Save Internal Notes'}
                </button>
              </div>

              {/* Delete action */}
              <div className="drawer-danger-zone">
                <button
                  type="button"
                  className="btn-delete-enquiry"
                  onClick={() => handleDeleteEnquiry(selectedEnquiry.id)}
                >
                  🗑️ Delete This Enquiry Record
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
