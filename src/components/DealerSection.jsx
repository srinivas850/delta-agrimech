import React, { useState } from 'react';
import './DealerSection.css';
import { API_BASE } from '../utils/apiBase.js';

const INITIAL_FORM = {
  fullName: '',
  businessName: '',
  mobile: '',
  email: '',
  city: '',
  state: '',
  message: '',
};

export default function DealerSection() {
  const [form, setForm]     = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null); // null | 'success' | 'error'
  const [sending, setSending] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.fullName.trim())     e.fullName     = 'Full name is required.';
    if (!form.businessName.trim()) e.businessName = 'Business name is required.';
    if (!form.mobile.trim() || !/^\d{10}$/.test(form.mobile.trim()))
      e.mobile = 'Enter a valid 10-digit mobile number.';
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email))
      e.email = 'Enter a valid email address.';
    if (!form.city.trim())  e.city  = 'City is required.';
    if (!form.state.trim()) e.state = 'State is required.';
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setSending(true);
    setStatus(null);

    try {
      const response = await fetch(`${API_BASE}/api/enquiries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: form.fullName,
          phone: form.mobile,
          email: form.email,
          enquiryType: 'dealer',
          businessName: form.businessName,
          city: form.city,
          state: form.state,
          message: form.message,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit dealer enquiry.');
      }

      setStatus('success');
      setForm(INITIAL_FORM);
      setTimeout(() => setStatus(null), 8000);
    } catch (err) {
      console.error('Submission error:', err);
      setStatus('error');
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="dealer" className="section section-green dealer-section">
      <div className="container dealer-section__inner">
        {/* Left: Info Panel */}
        <div className="dealer-section__info">
          <span className="dealer-section__badge">Partnership</span>
          <h2 className="dealer-section__title">Become an Authorized<br />Sreshta Impex LLP Dealer</h2>
          <div className="dealer-section__bar" />
          <p className="dealer-section__desc">
            Join our fast-growing authorized dealer network across India. Partner with Sreshta Impex LLP
            and offer premium agricultural machinery to farming communities in your region.
          </p>

          <ul className="dealer-section__benefits">
            {[
              '✅ Exclusive dealership rights in your territory',
              '✅ Full product training and technical support',
              '✅ Attractive margins and dealer incentives',
              '✅ Marketing materials and sales support',
              '✅ Priority access to new product launches',
            ].map((benefit) => (
              <li key={benefit}>{benefit}</li>
            ))}
          </ul>

          <div className="dealer-section__contact-cta">
            <p>Ready to talk? Call us directly:</p>
            <a href="tel:9912000499" className="btn btn-accent dealer-section__call-btn">
              📞 +91 9912000499
            </a>
          </div>
        </div>

        {/* Right: Enquiry Form */}
        <div className="dealer-section__form-wrap">
          <h3 className="dealer-section__form-title">Dealer Enquiry Form</h3>

          {status === 'success' && (
            <div className="dealer-form__feedback dealer-form__feedback--success">
              ✅ Thank you! Your dealer enquiry has been submitted. We will contact you shortly.
            </div>
          )}
          {status === 'error' && (
            <div className="dealer-form__feedback dealer-form__feedback--error">
              ❌ Something went wrong. Please try again or call us directly.
            </div>
          )}

          <form className="dealer-form" onSubmit={handleSubmit} noValidate>
            <div className="dealer-form__row">
              <Field label="Full Name *" error={errors.fullName}>
                <input
                  type="text" name="fullName" value={form.fullName}
                  onChange={handleChange} placeholder="Your full name"
                  className={errors.fullName ? 'error' : ''}
                />
              </Field>
              <Field label="Business Name *" error={errors.businessName}>
                <input
                  type="text" name="businessName" value={form.businessName}
                  onChange={handleChange} placeholder="Dealership / business name"
                  className={errors.businessName ? 'error' : ''}
                />
              </Field>
            </div>

            <div className="dealer-form__row">
              <Field label="Mobile Number *" error={errors.mobile}>
                <input
                  type="tel" name="mobile" value={form.mobile}
                  onChange={handleChange} placeholder="10-digit mobile number"
                  maxLength={10} className={errors.mobile ? 'error' : ''}
                />
              </Field>
              <Field label="Email Address *" error={errors.email}>
                <input
                  type="email" name="email" value={form.email}
                  onChange={handleChange} placeholder="your@email.com"
                  className={errors.email ? 'error' : ''}
                />
              </Field>
            </div>

            <div className="dealer-form__row">
              <Field label="City *" error={errors.city}>
                <input
                  type="text" name="city" value={form.city}
                  onChange={handleChange} placeholder="Your city"
                  className={errors.city ? 'error' : ''}
                />
              </Field>
              <Field label="State *" error={errors.state}>
                <input
                  type="text" name="state" value={form.state}
                  onChange={handleChange} placeholder="Your state"
                  className={errors.state ? 'error' : ''}
                />
              </Field>
            </div>

            <Field label="Message (optional)" error="">
              <textarea
                name="message" value={form.message}
                onChange={handleChange}
                placeholder="Tell us about your dealership experience, target area, or any questions..."
                rows={4}
              />
            </Field>

            <p className="dealer-form__note">
              * Note: Form submission currently saves enquiry details for review. A working backend
              connection will be configured before going live.
            </p>

            <button
              type="submit"
              className="btn btn-accent dealer-form__submit"
              disabled={sending}
            >
              {sending ? 'Submitting…' : 'Submit Enquiry →'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

/* Helper field wrapper */
function Field({ label, error, children }) {
  return (
    <div className="dealer-form__field">
      <label className="dealer-form__label">{label}</label>
      {children}
      {error && <span className="dealer-form__error">{error}</span>}
    </div>
  );
}
