import React, { useState } from 'react';
import './ProductEnquiryModal.css';

const INITIAL_FORM = {
  fullName: '',
  phone: '',
  email: '',
  city: '',
  state: '',
  message: '',
};

export default function ProductEnquiryModal({ product, onClose }) {
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState(null); // null | 'success' | 'error'
  const [errorMsg, setErrorMsg] = useState('');

  if (!product) return null;

  const validate = () => {
    const e = {};
    if (!form.fullName.trim()) e.fullName = 'Full name is required.';
    if (!form.phone.trim() || !/^\d{10}$/.test(form.phone.trim())) {
      e.phone = 'Enter a valid 10-digit mobile number.';
    }
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) {
      e.email = 'Enter a valid email address.';
    }
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const vErrors = validate();
    if (Object.keys(vErrors).length > 0) {
      setErrors(vErrors);
      return;
    }

    setSending(true);
    setStatus(null);
    setErrorMsg('');

    try {
      const response = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: form.fullName,
          phone: form.phone,
          email: form.email,
          enquiryType: 'product',
          product: product.name,
          city: form.city,
          state: form.state,
          message: form.message,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit enquiry.');
      }

      setStatus('success');
      setForm(INITIAL_FORM);
    } catch (err) {
      console.error('Product enquiry error:', err);
      setStatus('error');
      setErrorMsg(err.message || 'Unable to submit enquiry. Please try calling us directly.');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="product-modal-backdrop" onClick={onClose}>
      <div
        className="product-modal"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="enquiry-modal-title"
      >
        <button className="product-modal__close" onClick={onClose} aria-label="Close modal">
          ✕
        </button>

        <div className="product-modal__header">
          <span className="product-modal__badge">Machine Enquiry</span>
          <h2 id="enquiry-modal-title" className="product-modal__title">
            Enquire about <span className="highlight">{product.name}</span>
          </h2>
          <p className="product-modal__subtitle">
            Submit your details below to receive pricing, technical specifications, and delivery timelines.
          </p>
        </div>

        {status === 'success' ? (
          <div className="product-modal__success">
            <div className="product-modal__success-icon">✅</div>
            <h3>Enquiry Submitted Successfully!</h3>
            <p>
              Thank you for your interest in the <strong>{product.name}</strong>. Our machinery specialist will
              contact you on <strong>+91 {form.phone || 'your phone number'}</strong> shortly.
            </p>
            <button className="btn btn-primary product-modal__done-btn" onClick={onClose}>
              Done
            </button>
          </div>
        ) : (
          <form className="product-modal__form" onSubmit={handleSubmit} noValidate>
            {status === 'error' && (
              <div className="product-modal__alert product-modal__alert--error">
                ❌ {errorMsg}
              </div>
            )}

            <div className="product-modal__row">
              <div className="product-modal__field">
                <label>Full Name *</label>
                <input
                  type="text"
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  placeholder="Your full name"
                  className={errors.fullName ? 'error' : ''}
                />
                {errors.fullName && <span className="field-error">{errors.fullName}</span>}
              </div>

              <div className="product-modal__field">
                <label>Mobile Number *</label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="10-digit mobile number"
                  maxLength={10}
                  className={errors.phone ? 'error' : ''}
                />
                {errors.phone && <span className="field-error">{errors.phone}</span>}
              </div>
            </div>

            <div className="product-modal__row">
              <div className="product-modal__field">
                <label>Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  className={errors.email ? 'error' : ''}
                />
                {errors.email && <span className="field-error">{errors.email}</span>}
              </div>

              <div className="product-modal__field">
                <label>City / District</label>
                <input
                  type="text"
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  placeholder="e.g. Vijayawada, Krishna"
                />
              </div>
            </div>

            <div className="product-modal__field">
              <label>State</label>
              <input
                type="text"
                name="state"
                value={form.state}
                onChange={handleChange}
                placeholder="e.g. Andhra Pradesh, Telangana"
              />
            </div>

            <div className="product-modal__field">
              <label>Message / Specific Requirements (optional)</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Tell us about your crop acreage, soil conditions, or financing questions..."
                rows={3}
              />
            </div>

            <div className="product-modal__actions">
              <button
                type="submit"
                className="btn btn-primary product-modal__submit"
                disabled={sending}
              >
                {sending ? 'Submitting Enquiry…' : 'Submit Enquiry →'}
              </button>
              <a href="tel:9912000499" className="btn btn-outline-dark product-modal__call">
                📞 Call Directly: 9912000499
              </a>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
