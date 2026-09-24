/**
 * Basekraft Enterprise API Client
 * Connects Next.js Frontend with Django REST Framework (DRF) backend
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api/v1';

export interface ApiUser {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  full_name: string;
  role: 'SUPERADMIN' | 'COMPANY_ADMIN' | 'ARCHITECT' | 'CONTRACTOR';
  role_title: string;
  phone: string;
  avatar_initials: string;
  company: string | null;
  company_details?: {
    id: string;
    name: string;
    slug: string;
    status: string;
    city: string;
    country: string;
  } | null;
  is_active: boolean;
  is_staff: boolean;
  date_joined: string;
}

export interface PlanItem {
  id: string;
  code: string;
  name: string;
  description: string;
  price_monthly_inr: string;
  price_annual_inr: string;
  max_seats: number;
  storage_gb: number;
  features: string[];
  is_active: boolean;
  companies_count?: number;
}

export interface CompanyItem {
  id: string;
  name: string;
  slug: string;
  city: string;
  country: string;
  address: string;
  phone: string;
  email: string;
  plan_id?: string;
  plan_details?: PlanItem;
  status: 'ACTIVE' | 'TRIAL' | 'SUSPENDED';
  storage_used_gb: string;
  lead_architect: string;
  members_count: number;
  created_at: string;
  updated_at: string;
}

export interface CompanyCreatePayload {
  name: string;
  city?: string;
  country?: string;
  address?: string;
  phone?: string;
  email?: string;
  plan_id?: string | null;
  status?: string;
  lead_architect?: string;
  admin_email: string;
  admin_password: string;
  admin_first_name?: string;
  admin_last_name?: string;
  admin_role_title?: string;
}

export interface SaaSMetrics {
  total_companies: number;
  active_companies: number;
  trial_companies: number;
  suspended_companies: number;
  total_platform_users: number;
  total_storage_used_gb: number;
}

export function getAuthToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('basekraft_access_token');
}

export function setAuthTokens(access: string, refresh: string) {
  if (typeof window === 'undefined') return;
  localStorage.setItem('basekraft_access_token', access);
  localStorage.setItem('basekraft_refresh_token', refresh);
}

export function clearAuthTokens() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('basekraft_access_token');
  localStorage.removeItem('basekraft_refresh_token');
  localStorage.removeItem('basekraft_auth_user');
}

async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = getAuthToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string> || {}),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const url = `${API_BASE_URL}${endpoint}`;
  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (response.status === 204) {
    return {} as T;
  }

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const errorMsg =
      data.detail ||
      data.message ||
      (typeof data === 'object' ? JSON.stringify(data) : 'Network request failed');
    throw new Error(errorMsg);
  }

  return data as T;
}

export const authApi = {
  login: async (email: string, password: string) => {
    const data = await request<{ access: string; refresh: string; user: ApiUser }>('/auth/login/', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    setAuthTokens(data.access, data.refresh);
    return data;
  },

  getMe: async () => {
    return request<ApiUser>('/auth/me/');
  },
};

export const companiesApi = {
  list: async (params?: { search?: string; status?: string }) => {
    const query = new URLSearchParams();
    if (params?.search) query.append('search', params.search);
    if (params?.status) query.append('status', params.status);
    const qs = query.toString() ? `?${query.toString()}` : '';
    const res = await request<{ results: CompanyItem[]; count: number } | CompanyItem[]>(`/companies/${qs}`);
    if (Array.isArray(res)) return res;
    return res.results || [];
  },

  create: async (payload: CompanyCreatePayload) => {
    return request<CompanyItem>('/companies/', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },

  update: async (id: string, payload: Partial<CompanyItem>) => {
    return request<CompanyItem>(`/companies/${id}/`, {
      method: 'PATCH',
      body: JSON.stringify(payload),
    });
  },

  delete: async (id: string) => {
    return request<void>(`/companies/${id}/`, {
      method: 'DELETE',
    });
  },

  metrics: async () => {
    return request<SaaSMetrics>('/companies/metrics/');
  },
};

export const plansApi = {
  list: async () => {
    const res = await request<{ results: PlanItem[]; count: number } | PlanItem[]>('/plans/');
    if (Array.isArray(res)) return res;
    return res.results || [];
  },

  update: async (id: string, payload: Partial<PlanItem>) => {
    return request<PlanItem>(`/plans/${id}/`, {
      method: 'PATCH',
      body: JSON.stringify(payload),
    });
  },
};
