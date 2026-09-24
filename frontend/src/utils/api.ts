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
