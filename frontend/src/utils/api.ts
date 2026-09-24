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
  role: string;
  role_title: string;
  department?: string;
  can_manage_leads?: boolean;
  can_manage_projects?: boolean;
  can_view_finances?: boolean;
  can_approve_orders?: boolean;
  phone: string;
  avatar_initials: string;
  company: string | null;
  company_details?: {
    id: string;
    name: string;
    slug: string;
    org_code?: string;
    status: string;
    city: string;
    country: string;
    industry?: IndustryType;
    industry_display?: string;
  } | null;
  is_active: boolean;
  is_staff: boolean;
  date_joined: string;
}

export type IndustryType =
  | 'INTERIOR_DESIGN'
  | 'SOLAR_EPC'
  | 'MODULAR_FURNITURE'
  | 'CIVIL_CONSTRUCTION';

export const INDUSTRY_OPTIONS: { key: IndustryType; label: string; badge: string; description: string }[] = [
  {
    key: 'INTERIOR_DESIGN',
    label: 'Interior Design & Turnkey Fit-out',
    badge: 'Fit-out & Design',
    description: 'CAD drawings, moodboards, 3D renders, turnkey BOQ matrix & finish schedules',
  },
  {
    key: 'SOLAR_EPC',
    label: 'Solar Energy & Rooftop EPC',
    badge: 'Solar EPC',
    description: 'Single line diagrams (SLD), net metering approvals, shadow analysis & DISCOM NOCs',
  },
  {
    key: 'MODULAR_FURNITURE',
    label: 'Modular Furniture & Manufacturing',
    badge: 'Modular & Factory',
    description: 'Cutting lists, CNC G-codes, edge-banding specs, hardware fittings & laminate swatches',
  },
  {
    key: 'CIVIL_CONSTRUCTION',
    label: 'Real Estate & Civil Construction',
    badge: 'Civil & Infra',
    description: 'GFC structural drawings, bar bending schedules (BBS), concrete cube tests & RERA filings',
  },
];

export interface IndustryDocument {
  id: string;
  name: string;
  code: string;
  category: string;
  size: string;
  fileType: string;
  stage: string;
  status: 'Approved' | 'Review' | 'Draft' | 'Issued';
  date: string;
  author: string;
}

export const INDUSTRY_DOCUMENTS: Record<IndustryType, IndustryDocument[]> = {
  INTERIOR_DESIGN: [
    {
      id: 'DOC-INT-01',
      name: 'Comprehensive Turnkey BOQ & Joinery Schedule',
      code: 'BOQ-TK-2026',
      category: 'Financial Matrix',
      size: '4.8 MB',
      fileType: 'XLSX / CAD',
      stage: 'Execution Phase',
      status: 'Approved',
      date: 'Sep 24, 2026',
      author: 'Aman Sharma',
    },
    {
      id: 'DOC-INT-02',
      name: 'GFC Electrical, Lighting & Reflected Ceiling Plan (RCP)',
      code: 'DWG-RCP-L3',
      category: 'Working Drawings',
      size: '18.4 MB',
      fileType: 'AutoCAD DWG',
      stage: 'Site Handover',
      status: 'Issued',
      date: 'Sep 22, 2026',
      author: 'Riya Kapoor',
    },
    {
      id: 'DOC-INT-03',
      name: 'Italian Marble, Veneer & Brass Hardware Swatches',
      code: 'SPEC-MAT-04',
      category: 'Material Palette',
      size: '12.2 MB',
      fileType: 'High-Res PDF',
      stage: 'Client Approval',
      status: 'Approved',
      date: 'Sep 19, 2026',
      author: 'Riya Kapoor',
    },
    {
      id: 'DOC-INT-04',
      name: 'Photo-realistic 3D Renders (Living, Master Suite & Den)',
      code: 'RND-3D-EXT',
      category: 'Visualizations',
      size: '45.1 MB',
      fileType: 'TIFF / Render',
      stage: 'Design Development',
      status: 'Approved',
      date: 'Sep 15, 2026',
      author: 'VFX Lead',
    },
  ],
  SOLAR_EPC: [
    {
      id: 'DOC-SOL-01',
      name: 'Grid-Tied Single Line Diagram (SLD) 150 kWp',
      code: 'SLD-PV-150K',
      category: 'Electrical Engineering',
      size: '6.2 MB',
      fileType: 'AutoCAD DWG',
      stage: 'CEIG Inspection',
      status: 'Approved',
      date: 'Sep 24, 2026',
      author: 'Tariq Al-Mansoor',
    },
    {
      id: 'DOC-SOL-02',
      name: '3D Solar Shadow & PVSyst Generation Yield Analysis',
      code: 'PVSYST-SIM-09',
      category: 'Irradiance Simulation',
      size: '8.4 MB',
      fileType: 'PVSyst Report',
      stage: 'Feasibility Study',
      status: 'Approved',
      date: 'Sep 21, 2026',
      author: 'Layla Siddiqui',
    },
    {
      id: 'DOC-SOL-03',
      name: 'State DISCOM Net Metering Sanction & NOC Letter',
      code: 'DISCOM-NOC-44',
      category: 'Statutory Approvals',
      size: '2.1 MB',
      fileType: 'Govt Stamp PDF',
      stage: 'Grid Synchronization',
      status: 'Issued',
      date: 'Sep 18, 2026',
      author: 'Regulatory Ops',
    },
    {
      id: 'DOC-SOL-04',
      name: 'Inverter Stringing & Module MMS Foundation Detail',
      code: 'MMS-STR-01',
      category: 'Structural Drawings',
      size: '14.5 MB',
      fileType: 'Engineering PDF',
      stage: 'Civil Mounting',
      status: 'Review',
      date: 'Sep 14, 2026',
      author: 'Structural Lead',
    },
  ],
  MODULAR_FURNITURE: [
    {
      id: 'DOC-MOD-01',
      name: 'Automated Panel Cutting Optimizer & Sheet Yield List',
      code: 'CUT-CNC-109',
      category: 'Production Orders',
      size: '3.6 MB',
      fileType: 'OptiCut / CSV',
      stage: 'CNC Factory Floor',
      status: 'Approved',
      date: 'Sep 24, 2026',
      author: 'Eleanor Vance',
    },
    {
      id: 'DOC-MOD-02',
      name: 'CNC 5-Axis Drilling, Grooving & G-Code Files',
      code: 'CNC-GCODE-D7',
      category: 'Machine Code',
      size: '5.8 MB',
      fileType: 'G-Code / TAP',
      stage: 'Manufacturing',
      status: 'Issued',
      date: 'Sep 23, 2026',
      author: 'Oliver Smith',
    },
    {
      id: 'DOC-MOD-03',
      name: 'Hettich / Blum Soft-Close Hardware Hardware Bill',
      code: 'HDW-BLUM-92',
      category: 'Hardware Specs',
      size: '4.1 MB',
      fileType: 'Purchase Spec',
      stage: 'Inventory Check',
      status: 'Approved',
      date: 'Sep 20, 2026',
      author: 'Supply Manager',
    },
    {
      id: 'DOC-MOD-04',
      name: '2mm Edge Bending Tape & Moisture Cure PUR Schedule',
      code: 'EDGE-PUR-05',
      category: 'Finish Quality',
      size: '2.9 MB',
      fileType: 'Technical Sheet',
      stage: 'Post-lamination',
      status: 'Review',
      date: 'Sep 17, 2026',
      author: 'Oliver Smith',
    },
  ],
  CIVIL_CONSTRUCTION: [
    {
      id: 'DOC-CIV-01',
      name: 'Tower A Good For Construction (GFC) Structural Footing',
      code: 'GFC-STR-T101',
      category: 'Structural RCC',
      size: '24.8 MB',
      fileType: 'AutoCAD GFC',
      stage: 'Foundation Pour',
      status: 'Approved',
      date: 'Sep 24, 2026',
      author: 'Kavita Varma',
    },
    {
      id: 'DOC-CIV-02',
      name: 'Reinforced Steel Bar Bending Schedule (BBS Matrix)',
      code: 'BBS-REBAR-L5',
      category: 'Rebar Quantity',
      size: '7.5 MB',
      fileType: 'Excel / BBS',
      stage: 'Rebar Tying',
      status: 'Issued',
      date: 'Sep 22, 2026',
      author: 'Site Engineer',
    },
    {
      id: 'DOC-CIV-03',
      name: '28-Day Concrete Cube Compressive Strength Test Lab Report',
      code: 'LAB-M35-TEST',
      category: 'Quality Testing',
      size: '3.4 MB',
      fileType: 'NABL Certified PDF',
      stage: 'Audit Compliance',
      status: 'Approved',
      date: 'Sep 19, 2026',
      author: 'Quality In-charge',
    },
    {
      id: 'DOC-CIV-04',
      name: 'RERA Quarterly Progress & Town Planning Sanction Form',
      code: 'RERA-Q3-2026',
      category: 'Regulatory',
      size: '5.2 MB',
      fileType: 'Govt Portal PDF',
      stage: 'Legal Compliance',
      status: 'Approved',
      date: 'Sep 16, 2026',
      author: 'Compliance Lead',
    },
  ],
};

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
  org_code?: string;
  industry: IndustryType;
  industry_display?: string;
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
  industry: IndustryType;
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

export function getRefreshToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('basekraft_refresh_token');
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

/**
 * Automatically acquire a valid JWT session for standard operations if not logged in
 */
export async function ensureAuthToken(): Promise<string | null> {
  const existing = getAuthToken();
  if (existing) return existing;

  if (typeof window === 'undefined') return null;

  try {
    const res = await fetch(`${API_BASE_URL}/auth/login/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'admin@basekraft.in', password: 'StudioAdmin@123' }),
    });
    if (res.ok) {
      const data = await res.json();
      if (data.access) {
        setAuthTokens(data.access, data.refresh);
        return data.access;
      }
    }
  } catch (err) {
    console.warn('Auto auth token acquisition failed:', err);
  }
  return null;
}

async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  let token = getAuthToken();

  // If calling a protected endpoint without an existing token, ensure one first
  if (!token && !endpoint.includes('/auth/')) {
    token = await ensureAuthToken();
  }

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string> || {}),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const url = `${API_BASE_URL}${endpoint}`;
  let response = await fetch(url, {
    ...options,
    headers,
  });

  // If 401 Unauthorized, automatically refresh or re-authenticate and retry once
  if (response.status === 401 && !endpoint.includes('/auth/')) {
    const refreshToken = getRefreshToken();
    let refreshed = false;

    if (refreshToken) {
      try {
        const refreshRes = await fetch(`${API_BASE_URL}/auth/refresh/`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ refresh: refreshToken }),
        });
        if (refreshRes.ok) {
          const refreshData = await refreshRes.json();
          if (refreshData.access) {
            token = refreshData.access;
            if (typeof window !== 'undefined') {
              localStorage.setItem('basekraft_access_token', token);
            }
            headers['Authorization'] = `Bearer ${token}`;
            refreshed = true;
          }
        }
      } catch {
        // silent refresh failure
      }
    }

    if (!refreshed) {
      const newToken = await ensureAuthToken();
      if (newToken) {
        headers['Authorization'] = `Bearer ${newToken}`;
        refreshed = true;
      }
    }

    if (refreshed) {
      response = await fetch(url, {
        ...options,
        headers,
      });
    }
  }

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

export interface TeamMemberCreatePayload {
  email: string;
  password: string;
  first_name?: string;
  last_name?: string;
  role: string;
  role_title?: string;
  department: string;
  can_manage_leads?: boolean;
  can_manage_projects?: boolean;
  can_view_finances?: boolean;
  can_approve_orders?: boolean;
  phone?: string;
}

export const usersApi = {
  list: async (params?: { company_id?: string }) => {
    const query = new URLSearchParams();
    if (params?.company_id) query.append('company_id', params.company_id);
    const qs = query.toString() ? `?${query.toString()}` : '';
    const res = await request<{ results: ApiUser[]; count: number } | ApiUser[]>(`/users/${qs}`);
    if (Array.isArray(res)) return res;
    return res.results || [];
  },

  create: async (payload: TeamMemberCreatePayload) => {
    return request<ApiUser>('/users/', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },

  update: async (id: string, payload: Partial<ApiUser>) => {
    return request<ApiUser>(`/users/${id}/`, {
      method: 'PATCH',
      body: JSON.stringify(payload),
    });
  },

  delete: async (id: string) => {
    return request<void>(`/users/${id}/`, {
      method: 'DELETE',
    });
  },
};

export interface ProjectItem {
  id: string;
  company: string;
  company_name?: string;
  code: string;
  name: string;
  client_name: string;
  client_phone: string;
  client_email: string;
  city: string;
  stage: string;
  stage_display?: string;
  status: string;
  status_display?: string;
  progress_pct: number;
  budget: string | number;
  spent: string | number;
  assigned_lead?: string | null;
  assigned_lead_name?: string;
  start_date?: string | null;
  target_handover?: string | null;
  created_at: string;
  updated_at: string;
}

export interface LeadItem {
  id: string;
  company: string;
  company_name?: string;
  title: string;
  client_name: string;
  client_phone: string;
  client_email: string;
  city: string;
  estimated_value: string | number;
  stage: string;
  stage_display?: string;
  source: string;
  source_display?: string;
  assigned_to?: string | null;
  assigned_to_name?: string;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface QuoteItem {
  id: string;
  company: string;
  company_name?: string;
  project?: string | null;
  project_name?: string;
  quote_number: string;
  title: string;
  client_name: string;
  total_amount: string | number;
  margin_pct: string | number;
  status: string;
  status_display?: string;
  valid_until?: string | null;
  created_at: string;
  updated_at: string;
}

export interface WorkOrderItem {
  id: string;
  company: string;
  company_name?: string;
  project: string;
  project_name?: string;
  po_number: string;
  title: string;
  vendor_name: string;
  category: string;
  amount: string | number;
  status: string;
  status_display?: string;
  approved_by?: string | null;
  approved_by_name?: string;
  created_at: string;
  updated_at: string;
}

export interface MaterialItemData {
  id: string;
  company: string;
  company_name?: string;
  sku: string;
  name: string;
  category: string;
  unit: string;
  unit_price: string | number;
  stock_quantity: string | number;
  reorder_level: string | number;
  created_at: string;
  updated_at: string;
}

export interface FinanceTransactionItem {
  id: string;
  company: string;
  company_name?: string;
  project?: string | null;
  project_name?: string;
  reference_no: string;
  type: 'RECEIVABLE' | 'PAYABLE';
  type_display?: string;
  category: string;
  amount: string | number;
  status: string;
  status_display?: string;
  due_date?: string | null;
  created_at: string;
  updated_at: string;
}

export interface DashboardStatsData {
  company: {
    id: string | null;
    name: string;
    org_code: string | null;
    industry: IndustryType | null;
    industry_display: string | null;
  };
  projects: {
    total: number;
    active: number;
    delayed: number;
    critical: number;
    total_budget: number;
    total_spent: number;
  };
  leads: {
    total: number;
    active: number;
    pipeline_value: number;
  };
  quotes: {
    total: number;
    total_value: number;
  };
  orders: {
    total: number;
    pending: number;
    total_value: number;
  };
  finances: {
    receivables: number;
    payables: number;
    net_cash_flow: number;
  };
  team: {
    total_members: number;
  };
}

export const operationsApi = {
  getDashboardStats: async (companyId?: string) => {
    const qs = companyId ? `?company_id=${companyId}` : '';
    return request<DashboardStatsData>(`/operations/dashboard-stats/${qs}`);
  },

  projects: {
    list: async () => {
      const res = await request<{ results: ProjectItem[]; count: number } | ProjectItem[]>('/operations/projects/');
      if (Array.isArray(res)) return res;
      return res.results || [];
    },
    create: async (payload: Partial<ProjectItem>) => {
      return request<ProjectItem>('/operations/projects/', {
        method: 'POST',
        body: JSON.stringify(payload),
      });
    },
    update: async (id: string, payload: Partial<ProjectItem>) => {
      return request<ProjectItem>(`/operations/projects/${id}/`, {
        method: 'PATCH',
        body: JSON.stringify(payload),
      });
    },
    delete: async (id: string) => {
      return request<void>(`/operations/projects/${id}/`, { method: 'DELETE' });
    },
  },

  leads: {
    list: async () => {
      const res = await request<{ results: LeadItem[]; count: number } | LeadItem[]>('/operations/leads/');
      if (Array.isArray(res)) return res;
      return res.results || [];
    },
    create: async (payload: Partial<LeadItem>) => {
      return request<LeadItem>('/operations/leads/', {
        method: 'POST',
        body: JSON.stringify(payload),
      });
    },
    update: async (id: string, payload: Partial<LeadItem>) => {
      return request<LeadItem>(`/operations/leads/${id}/`, {
        method: 'PATCH',
        body: JSON.stringify(payload),
      });
    },
    delete: async (id: string) => {
      return request<void>(`/operations/leads/${id}/`, { method: 'DELETE' });
    },
  },

  quotes: {
    list: async () => {
      const res = await request<{ results: QuoteItem[]; count: number } | QuoteItem[]>('/operations/quotes/');
      if (Array.isArray(res)) return res;
      return res.results || [];
    },
    create: async (payload: Partial<QuoteItem>) => {
      return request<QuoteItem>('/operations/quotes/', {
        method: 'POST',
        body: JSON.stringify(payload),
      });
    },
    delete: async (id: string) => {
      return request<void>(`/operations/quotes/${id}/`, { method: 'DELETE' });
    },
  },

  orders: {
    list: async () => {
      const res = await request<{ results: WorkOrderItem[]; count: number } | WorkOrderItem[]>('/operations/orders/');
      if (Array.isArray(res)) return res;
      return res.results || [];
    },
    create: async (payload: Partial<WorkOrderItem>) => {
      return request<WorkOrderItem>('/operations/orders/', {
        method: 'POST',
        body: JSON.stringify(payload),
      });
    },
    delete: async (id: string) => {
      return request<void>(`/operations/orders/${id}/`, { method: 'DELETE' });
    },
  },

  materials: {
    list: async () => {
      const res = await request<{ results: MaterialItemData[]; count: number } | MaterialItemData[]>('/operations/materials/');
      if (Array.isArray(res)) return res;
      return res.results || [];
    },
    create: async (payload: Partial<MaterialItemData>) => {
      return request<MaterialItemData>('/operations/materials/', {
        method: 'POST',
        body: JSON.stringify(payload),
      });
    },
  },

  finances: {
    list: async () => {
      const res = await request<{ results: FinanceTransactionItem[]; count: number } | FinanceTransactionItem[]>('/operations/finances/');
      if (Array.isArray(res)) return res;
      return res.results || [];
    },
  },
};

