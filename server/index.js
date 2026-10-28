import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { pool, initDb } from './db.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'delta_agrimech_secret_jwt_2026';

app.use(cors());
app.use(express.json());

// ── Auth Middleware ───────────────────────────────────────────
function requireAdminAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized: Authentication token is required.' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.admin = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Unauthorized: Invalid or expired session. Please log in again.' });
  }
}

// ── Public Routes ─────────────────────────────────────────────

// 1. Submit Enquiry (Dealer or Product)
app.post('/api/enquiries', async (req, res) => {
  try {
    const {
      fullName,
      phone,
      email,
      enquiryType = 'dealer', // 'dealer' | 'product' | 'general'
      product = null,
      businessName = '',
      city = '',
      state = '',
      message = '',
    } = req.body;

    // Validate required fields
    if (!fullName || !fullName.trim()) {
      return res.status(400).json({ error: 'Full name is required.' });
    }
    if (!phone || !phone.trim() || !/^\d{10}$/.test(phone.trim())) {
      return res.status(400).json({ error: 'A valid 10-digit mobile number is required.' });
    }
    if (!email || !email.trim() || !/\S+@\S+\.\S+/.test(email.trim())) {
      return res.status(400).json({ error: 'A valid email address is required.' });
    }

    const query = `
      INSERT INTO enquiries (
        customer_name, phone, email, enquiry_type, product, business_name, city, state, message, status
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, 'new')
      RETURNING id, customer_name, created_at;
    `;

    const values = [
      fullName.trim(),
      phone.trim(),
      email.trim().toLowerCase(),
      enquiryType,
      product ? product.trim() : null,
      businessName ? businessName.trim() : null,
      city ? city.trim() : null,
      state ? state.trim() : null,
      message ? message.trim() : null,
    ];

    const result = await pool.query(query, values);
    const newEnquiry = result.rows[0];

    return res.status(201).json({
      success: true,
      message: 'Thank you! Your enquiry has been recorded successfully. Our team will contact you shortly.',
      enquiryId: newEnquiry.id,
    });
  } catch (err) {
    console.error('Error submitting enquiry:', err);
    return res.status(500).json({ error: 'Server error while submitting enquiry. Please try again.' });
  }
});

// 2. Admin Login
app.post('/api/admin/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required.' });
    }

    const result = await pool.query('SELECT * FROM admins WHERE username = $1', [username.trim()]);
    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid username or password.' });
    }

    const admin = result.rows[0];
    const passwordMatch = await bcrypt.compare(password, admin.password_hash);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid username or password.' });
    }

    // Generate JWT (valid for 24 hours)
    const token = jwt.sign(
      { id: admin.id, username: admin.username, role: admin.role },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    return res.json({
      success: true,
      token,
      admin: {
        id: admin.id,
        username: admin.username,
        role: admin.role,
      },
    });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ error: 'Server error during authentication.' });
  }
});

// ── Protected Admin Routes ────────────────────────────────────

// Check current admin
app.get('/api/admin/me', requireAdminAuth, (req, res) => {
  res.json({ admin: req.admin });
});

// List Enquiries with Search, Filter, and Summary Stats
app.get('/api/admin/enquiries', requireAdminAuth, async (req, res) => {
  try {
    const { q, status, type } = req.query;

    let queryText = 'SELECT * FROM enquiries WHERE 1=1';
    const queryParams = [];

    if (q && q.trim()) {
      queryParams.push(`%${q.trim()}%`);
      const pIdx = queryParams.length;
      queryText += ` AND (
        customer_name ILIKE $${pIdx} OR 
        phone ILIKE $${pIdx} OR 
        email ILIKE $${pIdx} OR 
        business_name ILIKE $${pIdx} OR 
        city ILIKE $${pIdx} OR 
        product ILIKE $${pIdx}
      )`;
    }

    if (status && status !== 'all') {
      queryParams.push(status.trim());
      queryText += ` AND status = $${queryParams.length}`;
    }

    if (type && type !== 'all') {
      queryParams.push(type.trim());
      queryText += ` AND enquiry_type = $${queryParams.length}`;
    }

    queryText += ' ORDER BY created_at DESC';

    const result = await pool.query(queryText, queryParams);

    // Get live summary counts
    const summaryRes = await pool.query(`
      SELECT 
        COUNT(*) as total,
        COUNT(*) FILTER (WHERE status = 'new') as new_count,
        COUNT(*) FILTER (WHERE status = 'contacted') as contacted_count,
        COUNT(*) FILTER (WHERE status = 'in_progress') as in_progress_count,
        COUNT(*) FILTER (WHERE status = 'closed') as closed_count,
        COUNT(*) FILTER (WHERE enquiry_type = 'dealer') as dealer_count,
        COUNT(*) FILTER (WHERE enquiry_type = 'product') as product_count
      FROM enquiries
    `);

    const summaryRow = summaryRes.rows[0];
    const summary = {
      total: parseInt(summaryRow.total, 10),
      newCount: parseInt(summaryRow.new_count, 10),
      contactedCount: parseInt(summaryRow.contacted_count, 10),
      inProgressCount: parseInt(summaryRow.in_progress_count, 10),
      closedCount: parseInt(summaryRow.closed_count, 10),
      dealerCount: parseInt(summaryRow.dealer_count, 10),
      productCount: parseInt(summaryRow.product_count, 10),
    };

    return res.json({
      enquiries: result.rows,
      summary,
    });
  } catch (err) {
    console.error('Error fetching enquiries:', err);
    return res.status(500).json({ error: 'Server error while fetching enquiries.' });
  }
});

// Get Single Enquiry
app.get('/api/admin/enquiries/:id', requireAdminAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM enquiries WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Enquiry not found.' });
    }
    return res.json({ enquiry: result.rows[0] });
  } catch (err) {
    console.error('Error fetching enquiry:', err);
    return res.status(500).json({ error: 'Server error.' });
  }
});

// Update Status and Notes
app.patch('/api/admin/enquiries/:id/status', requireAdminAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const { status, notes } = req.body;

    const updates = [];
    const values = [];

    if (status) {
      values.push(status);
      updates.push(`status = $${values.length}`);
    }

    if (notes !== undefined) {
      values.push(notes);
      updates.push(`notes = $${values.length}`);
    }

    updates.push(`updated_at = CURRENT_TIMESTAMP`);

    values.push(id);
    const query = `
      UPDATE enquiries 
      SET ${updates.join(', ')} 
      WHERE id = $${values.length} 
      RETURNING *;
    `;

    const result = await pool.query(query, values);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Enquiry not found.' });
    }

    return res.json({ success: true, enquiry: result.rows[0] });
  } catch (err) {
    console.error('Error updating status:', err);
    return res.status(500).json({ error: 'Server error while updating enquiry status.' });
  }
});

// Delete Enquiry
app.delete('/api/admin/enquiries/:id', requireAdminAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM enquiries WHERE id = $1 RETURNING id', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Enquiry not found.' });
    }
    return res.json({ success: true, message: 'Enquiry deleted successfully.' });
  } catch (err) {
    console.error('Error deleting enquiry:', err);
    return res.status(500).json({ error: 'Server error.' });
  }
});

// Change Admin Password
app.post('/api/admin/change-password', requireAdminAuth, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword || newPassword.length < 6) {
      return res.status(400).json({ error: 'New password must be at least 6 characters long.' });
    }

    const result = await pool.query('SELECT * FROM admins WHERE id = $1', [req.admin.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Admin account not found.' });
    }

    const admin = result.rows[0];
    const isMatch = await bcrypt.compare(currentPassword, admin.password_hash);
    if (!isMatch) {
      return res.status(401).json({ error: 'Current password is incorrect.' });
    }

    const newHash = await bcrypt.hash(newPassword, 10);
    await pool.query('UPDATE admins SET password_hash = $1 WHERE id = $2', [newHash, admin.id]);

    return res.json({ success: true, message: 'Password updated successfully.' });
  } catch (err) {
    console.error('Password change error:', err);
    return res.status(500).json({ error: 'Server error while updating password.' });
  }
});

// ── Start Server ──────────────────────────────────────────────
async function startServer() {
  try {
    await initDb();
    app.listen(PORT, () => {
      console.log(`🌾 Delta Agrimech Backend Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
}

startServer();
