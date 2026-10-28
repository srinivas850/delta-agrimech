// ============================================================
// Delta Agrimech — Central API Base URL
// In local dev: Vite proxy handles /api → localhost:5000
// On Render: same origin, so relative paths work perfectly
// Set VITE_API_BASE_URL only if frontend & backend are split
// ============================================================

export const API_BASE = import.meta.env.VITE_API_BASE_URL || '';
