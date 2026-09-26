"use client";

import React, { useState, useEffect } from "react";
import {
  Users,
  Mail,
  Phone,
  Plus,
  Shield,
  KeyRound,
  Building2,
  Copy,
  Check,
  Trash2,
  Eye,
  EyeOff,
  UserCheck,
  CheckCircle2,
  AlertCircle,
  Briefcase,
  Layers,
  Sparkles,
  Lock,
  Search,
  Filter,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { usersApi, ApiUser, TeamMemberCreatePayload } from "@/utils/api";

const ROLE_OPTIONS = [
  { value: "PROJECT_MANAGER", label: "Project Manager", title: "Senior Project Manager" },
  { value: "SITE_ENGINEER", label: "Site Engineer", title: "Lead Site & Execution Engineer" },
  { value: "SALES_LEAD", label: "Sales & CRM Lead", title: "Client Acquisition Manager" },
  { value: "ARCHITECT", label: "Architect / Designer", title: "Project Architect" },
  { value: "CONTRACTOR", label: "Contractor / Vendor", title: "Execution Contractor" },
];

const DEPARTMENT_OPTIONS = [
  { value: "PROJECTS", label: "Projects & Execution" },
  { value: "SALES_CRM", label: "Sales & Client CRM" },
  { value: "DESIGN", label: "Design & Architecture" },
  { value: "ENGINEERING", label: "Site & Technical Engineering" },
  { value: "FINANCE", label: "Finance & Accounts" },
  { value: "PROCUREMENT", label: "Procurement & Materials" },
];

export default function TeamPage() {
  const { user, login } = useAuth();
  const [members, setMembers] = useState<ApiUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("ALL");
  const [isCopied, setIsCopied] = useState(false);

  // Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [createdSuccessCredentials, setCreatedSuccessCredentials] = useState<{
    email: string;
    password: string;
    name: string;
    role: string;
  } | null>(null);

  // Form State
  const [formData, setFormData] = useState<TeamMemberCreatePayload>({
    email: "",
    password: "Password@123",
    first_name: "",
    last_name: "",
    role: "PROJECT_MANAGER",
    role_title: "Project Manager",
    department: "PROJECTS",
    can_manage_leads: true,
    can_manage_projects: true,
    can_view_finances: false,
    can_approve_orders: false,
    phone: "",
  });

  const FALLBACK_MEMBERS: ApiUser[] = [
    {
      id: "usr-admin-01",
      email: "admin@basekraft.in",
      first_name: "Aman",
      last_name: "Sharma",
      full_name: "Aman Sharma",
      role: "COMPANY_ADMIN",
      role_title: "Managing Director & Founder",
      department: "PROJECTS",
      can_manage_leads: true,
      can_manage_projects: true,
      can_view_finances: true,
      can_approve_orders: true,
      phone: "+91 124 456 7890",
      avatar_initials: "AS",
      company: "cmp-01",
      company_details: {
        id: "cmp-01",
        name: "Basekraft Turnkey & Architecture",
        slug: "basekraft-studio",
        org_code: "ORG-BK-9182",
        status: "ACTIVE",
        city: "Gurugram",
        country: "India",
      },
      is_active: true,
      is_staff: false,
      date_joined: "2026-01-10",
    },
    {
      id: "usr-riya-02",
      email: "riya.kapoor@basekraft.in",
      first_name: "Riya",
      last_name: "Kapoor",
      full_name: "Riya Kapoor",
      role: "PROJECT_MANAGER",
      role_title: "Senior Design & Project Lead",
      department: "DESIGN",
      can_manage_leads: true,
      can_manage_projects: true,
      can_view_finances: false,
      can_approve_orders: false,
      phone: "+91 98111 22334",
      avatar_initials: "RK",
      company: "cmp-01",
      company_details: {
        id: "cmp-01",
        name: "Basekraft Turnkey & Architecture",
        slug: "basekraft-studio",
        org_code: "ORG-BK-9182",
        status: "ACTIVE",
        city: "Gurugram",
        country: "India",
      },
      is_active: true,
      is_staff: false,
      date_joined: "2026-02-15",
    },
    {
      id: "usr-vikram-03",
      email: "vikram.mep@apexbuild.com",
      first_name: "Vikram",
      last_name: "Oberoi",
      full_name: "Vikram Oberoi",
      role: "CONTRACTOR",
      role_title: "Turnkey MEP & Fit-out Director",
      department: "ENGINEERING",
      can_manage_leads: false,
      can_manage_projects: true,
      can_view_finances: false,
      can_approve_orders: false,
      phone: "+91 98222 33445",
      avatar_initials: "VO",
      company: "cmp-01",
      company_details: {
        id: "cmp-01",
        name: "Basekraft Turnkey & Architecture",
        slug: "basekraft-studio",
        org_code: "ORG-BK-9182",
        status: "ACTIVE",
        city: "Gurugram",
        country: "India",
      },
      is_active: true,
      is_staff: false,
      date_joined: "2026-03-01",
    },
    {
      id: "usr-neha-04",
      email: "neha.crm@basekraft.in",
      first_name: "Neha",
      last_name: "Mehta",
      full_name: "Neha Mehta",
      role: "SALES_LEAD",
      role_title: "Client Relationships & CRM Manager",
      department: "SALES_CRM",
      can_manage_leads: true,
      can_manage_projects: false,
      can_view_finances: false,
      can_approve_orders: false,
      phone: "+91 98333 44556",
      avatar_initials: "NM",
      company: "cmp-01",
      company_details: {
        id: "cmp-01",
        name: "Basekraft Turnkey & Architecture",
        slug: "basekraft-studio",
        org_code: "ORG-BK-9182",
        status: "ACTIVE",
        city: "Gurugram",
        country: "India",
      },
      is_active: true,
      is_staff: false,
      date_joined: "2026-04-12",
    },
  ];

  // Fetch Team Members
  const loadTeam = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await usersApi.list();
      if (Array.isArray(data) && data.length > 0) {
        setMembers(data);
      } else {
        setMembers(FALLBACK_MEMBERS);
      }
    } catch (err: unknown) {
      console.warn("Using offline fallback team directory:", err);
      setMembers(FALLBACK_MEMBERS);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTeam();
  }, []);


  const handleCopyOrgCode = () => {
    const code = user?.orgCode || "ORG-BK-9182";
    navigator.clipboard.writeText(code);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleRoleChange = (roleValue: string) => {
    const roleObj = ROLE_OPTIONS.find((r) => r.value === roleValue);
    setFormData((prev) => ({
      ...prev,
      role: roleValue,
      role_title: roleObj?.title || roleValue,
      // Smart default permissions based on role
      can_manage_leads: roleValue === "SALES_LEAD" || roleValue === "PROJECT_MANAGER",
      can_manage_projects: roleValue !== "SALES_LEAD",
      can_view_finances: roleValue === "PROJECT_MANAGER",
      can_approve_orders: roleValue === "PROJECT_MANAGER",
    }));
  };

  const handleCreateEmployee = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.password || !formData.first_name) {
      alert("Please fill in first name, email and password.");
      return;
    }

    try {
      setIsSubmitting(true);
      const createdUser = await usersApi.create(formData);
      setMembers((prev) => [createdUser, ...prev]);

      // Save credentials for immediate display
      setCreatedSuccessCredentials({
        email: formData.email,
        password: formData.password,
        name: `${formData.first_name} ${formData.last_name}`.trim(),
        role: formData.role_title || formData.role,
      });

      // Reset form
      setFormData({
        email: "",
        password: "Password@123",
        first_name: "",
        last_name: "",
        role: "PROJECT_MANAGER",
        role_title: "Project Manager",
        department: "PROJECTS",
        can_manage_leads: true,
        can_manage_projects: true,
        can_view_finances: false,
        can_approve_orders: false,
        phone: "",
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to create team member";
      alert(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteMember = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to remove ${name} from your enterprise team?`)) return;
    try {
      await usersApi.delete(id);
      setMembers((prev) => prev.filter((m) => m.id !== id));
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to delete member";
      alert(msg);
    }
  };

  const handleTestLogin = async (email: string, pass: string) => {
    const success = await login(email, pass);
    if (success) {
      alert(`Logged in successfully as ${email}! Redirecting to dashboard.`);
    }
  };

  // Filter Members
  const filteredMembers = members.filter((m) => {
    const matchesSearch =
      (m.full_name || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (m.role_title || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (m.department || "").toLowerCase().includes(searchQuery.toLowerCase());

    const matchesDept = departmentFilter === "ALL" || m.department === departmentFilter;
    return matchesSearch && matchesDept;
  });

  const orgCode = user?.orgCode || (members.length > 0 && members[0]?.company_details?.org_code) || "ORG-BK-9182";
  const companyName = user?.studioName || (members.length > 0 && members[0]?.company_details?.name) || "Basekraft Enterprise";

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Enterprise Organization & Header Banner */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-2xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-zinc-100 dark:bg-zinc-800 rounded-lg text-zinc-900 dark:text-zinc-100 border border-zinc-200 dark:border-zinc-700">
                <Building2 className="w-5 h-5 text-zinc-700 dark:text-zinc-300" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                    {companyName}
                  </h1>
                  {/* Unique Org ID Badge */}
                  <div
                    onClick={handleCopyOrgCode}
                    className="cursor-pointer inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800/60 text-blue-700 dark:text-blue-300 text-xs font-mono font-medium hover:bg-blue-100 dark:hover:bg-blue-900/60 transition group"
                    title="Click to copy unique Organization ID"
                  >
                    <span>Org ID: {orgCode}</span>
                    {isCopied ? (
                      <Check className="w-3 h-3 text-emerald-600" />
                    ) : (
                      <Copy className="w-3 h-3 text-blue-400 group-hover:text-blue-600 dark:group-hover:text-blue-200" />
                    )}
                  </div>
                </div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                  Multi-tenant workforce directory, role access governance, and employee login credentials
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setCreatedSuccessCredentials(null);
                setIsAddModalOpen(true);
              }}
              className="flex items-center gap-2 bg-zinc-950 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-zinc-200 text-white dark:text-zinc-950 px-4 py-2 rounded-lg text-xs font-semibold transition shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>Add Employee / Member</span>
            </button>
          </div>
        </div>

        {/* Quick Stats bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5 pt-4 border-t border-zinc-100 dark:border-zinc-800 text-xs">
          <div className="bg-zinc-50 dark:bg-zinc-800/40 p-3 rounded-lg border border-zinc-100 dark:border-zinc-800">
            <span className="text-zinc-400 font-medium">Total Workforce</span>
            <div className="text-base font-bold text-zinc-900 dark:text-zinc-100 mt-0.5">{members.length} Members</div>
          </div>
          <div className="bg-zinc-50 dark:bg-zinc-800/40 p-3 rounded-lg border border-zinc-100 dark:border-zinc-800">
            <span className="text-zinc-400 font-medium">Lead Managers</span>
            <div className="text-base font-bold text-zinc-900 dark:text-zinc-100 mt-0.5">
              {members.filter((m) => m.can_manage_leads).length} Permitted
            </div>
          </div>
          <div className="bg-zinc-50 dark:bg-zinc-800/40 p-3 rounded-lg border border-zinc-100 dark:border-zinc-800">
            <span className="text-zinc-400 font-medium">Site & Execution Leads</span>
            <div className="text-base font-bold text-zinc-900 dark:text-zinc-100 mt-0.5">
              {members.filter((m) => m.can_manage_projects).length} Permitted
            </div>
          </div>
          <div className="bg-zinc-50 dark:bg-zinc-800/40 p-3 rounded-lg border border-zinc-100 dark:border-zinc-800">
            <span className="text-zinc-400 font-medium">Finance & PO Approvers</span>
            <div className="text-base font-bold text-zinc-900 dark:text-zinc-100 mt-0.5">
              {members.filter((m) => m.can_approve_orders || m.can_view_finances).length} Authorized
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-72">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
          <input
            type="text"
            placeholder="Search employee, email, role..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-zinc-400 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-3.5 h-3.5 text-zinc-400" />
          <select
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
            className="text-xs bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg px-2.5 py-1.5 text-zinc-700 dark:text-zinc-300 focus:outline-hidden"
          >
            <option value="ALL">All Departments</option>
            {DEPARTMENT_OPTIONS.map((d) => (
              <option key={d.value} value={d.value}>
                {d.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Team Cards Grid */}
      {loading ? (
        <div className="flex items-center justify-center p-16 text-zinc-500 dark:text-zinc-400 text-sm">
          Loading live enterprise directory...
        </div>
      ) : filteredMembers.length === 0 ? (
        <div className="text-center p-12 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl space-y-3">
          <Users className="w-10 h-10 text-zinc-400 mx-auto" />
          <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">No employees found</h3>
          <p className="text-xs text-zinc-500 max-w-sm mx-auto">
            {searchQuery || departmentFilter !== "ALL"
              ? "No team members matched your search criteria."
              : "Start onboarding your architects, site engineers, and CRM leads."}
          </p>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-md text-xs font-medium"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add First Employee</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredMembers.map((member) => (
            <div
              key={member.id}
              className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 shadow-2xs space-y-3.5 transition hover:border-zinc-300 dark:hover:border-zinc-700 flex flex-col justify-between"
            >
              <div>
                {/* Header: Avatar, Name, Role badge */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center font-bold text-xs text-zinc-900 dark:text-zinc-100 shadow-2xs">
                      {member.avatar_initials || member.full_name?.slice(0, 2).toUpperCase() || "EM"}
                    </div>
                    <div>
                      <h3 className="text-xs font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
                        {member.full_name || member.email}
                      </h3>
                      <p className="text-[11px] text-zinc-500 dark:text-zinc-400 font-medium">
                        {member.role_title || member.role}
                      </p>
                    </div>
                  </div>

                  <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400">
                    {member.department || "Projects"}
                  </span>
                </div>

                {/* Contact details */}
                <div className="pt-3 mt-3 border-t border-zinc-100 dark:border-zinc-800 text-[11px] text-zinc-600 dark:text-zinc-400 space-y-1.5">
                  <p className="flex items-center gap-2">
                    <Mail className="w-3 h-3 text-zinc-400 shrink-0" />
                    <span className="truncate font-mono">{member.email}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Phone className="w-3 h-3 text-zinc-400 shrink-0" />
                    <span>{member.phone || "No phone listed"}</span>
                  </p>
                </div>

                {/* Permissions matrix pill tags */}
                <div className="pt-3 mt-3 border-t border-zinc-100 dark:border-zinc-800">
                  <span className="text-[10px] uppercase font-semibold text-zinc-400 tracking-wider block mb-1.5">
                    Granted Operational Scopes:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {member.can_manage_leads && (
                      <span className="px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/40 text-emerald-700 dark:text-emerald-300 text-[10px] font-medium flex items-center gap-1">
                        <Check className="w-2.5 h-2.5" /> CRM Leads
                      </span>
                    )}
                    {member.can_manage_projects && (
                      <span className="px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800/40 text-blue-700 dark:text-blue-300 text-[10px] font-medium flex items-center gap-1">
                        <Check className="w-2.5 h-2.5" /> Projects & Sites
                      </span>
                    )}
                    {member.can_view_finances && (
                      <span className="px-2 py-0.5 rounded-md bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/40 text-amber-700 dark:text-amber-300 text-[10px] font-medium flex items-center gap-1">
                        <Check className="w-2.5 h-2.5" /> Finances
                      </span>
                    )}
                    {member.can_approve_orders && (
                      <span className="px-2 py-0.5 rounded-md bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800/40 text-purple-700 dark:text-purple-300 text-[10px] font-medium flex items-center gap-1">
                        <Check className="w-2.5 h-2.5" /> Order Approver
                      </span>
                    )}
                    {!member.can_manage_leads &&
                      !member.can_manage_projects &&
                      !member.can_view_finances &&
                      !member.can_approve_orders && (
                        <span className="text-[11px] text-zinc-400 italic">Read-only team access</span>
                      )}
                  </div>
                </div>
              </div>

              {/* Bottom Footer Actions */}
              <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-[11px]">
                <span className="text-zinc-400 font-mono text-[10px]">
                  Joined {new Date(member.date_joined).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                </span>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleDeleteMember(member.id, member.full_name || member.email)}
                    className="p-1.5 rounded-md text-zinc-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 transition"
                    title="Remove from Enterprise Team"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Employee & Login Credentials Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl max-w-lg w-full shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="p-4 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-lg text-zinc-900 dark:text-zinc-100">
                  <UserCheck className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                    Add Team Member & Create Login
                  </h3>
                  <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                    Org ID: <span className="font-mono text-blue-600 dark:text-blue-400 font-semibold">{orgCode}</span>
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 text-lg leading-none"
              >
                ✕
              </button>
            </div>

            {/* Success Banner if member created */}
            {createdSuccessCredentials ? (
              <div className="p-6 space-y-4">
                <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/40 rounded-xl space-y-2">
                  <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-300 font-bold text-xs">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Employee Onboarded & Login Created!</span>
                  </div>
                  <p className="text-[11px] text-emerald-800 dark:text-emerald-200">
                    {createdSuccessCredentials.name} has been enrolled in{" "}
                    <strong>{companyName}</strong>. They can now log in using these credentials:
                  </p>
                </div>

                <div className="p-4 bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 rounded-lg space-y-2 text-xs font-mono">
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Org ID:</span>
                    <span className="text-blue-600 dark:text-blue-400 font-bold">{orgCode}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Login Email:</span>
                    <span className="text-zinc-900 dark:text-zinc-100 font-bold">{createdSuccessCredentials.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Password:</span>
                    <span className="text-zinc-900 dark:text-zinc-100 font-bold">{createdSuccessCredentials.password}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Role:</span>
                    <span className="text-zinc-900 dark:text-zinc-100">{createdSuccessCredentials.role}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <button
                    onClick={() => {
                      handleTestLogin(createdSuccessCredentials.email, createdSuccessCredentials.password);
                    }}
                    className="flex-1 py-2 px-3 bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-zinc-200 text-white dark:text-zinc-900 rounded-lg text-xs font-semibold transition"
                  >
                    Test Login as this Employee
                  </button>
                  <button
                    onClick={() => {
                      setCreatedSuccessCredentials(null);
                      setIsAddModalOpen(false);
                    }}
                    className="py-2 px-4 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 rounded-lg text-xs font-medium hover:bg-zinc-50 dark:hover:bg-zinc-800 transition"
                  >
                    Done
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleCreateEmployee} className="p-5 space-y-4">
                {/* Name fields */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-zinc-700 dark:text-zinc-300">First Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Suresh"
                      value={formData.first_name}
                      onChange={(e) => setFormData((prev) => ({ ...prev, first_name: e.target.value }))}
                      className="w-full text-xs px-3 py-2 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-zinc-100 focus:outline-hidden focus:ring-1 focus:ring-zinc-400"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-zinc-700 dark:text-zinc-300">Last Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Verma"
                      value={formData.last_name}
                      onChange={(e) => setFormData((prev) => ({ ...prev, last_name: e.target.value }))}
                      className="w-full text-xs px-3 py-2 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-zinc-100 focus:outline-hidden focus:ring-1 focus:ring-zinc-400"
                    />
                  </div>
                </div>

                {/* Email (Login ID) & Phone */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-zinc-700 dark:text-zinc-300">
                      Work Email (Login ID) *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="suresh@basekraft.in"
                      value={formData.email}
                      onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                      className="w-full text-xs px-3 py-2 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-zinc-100 focus:outline-hidden focus:ring-1 focus:ring-zinc-400"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-zinc-700 dark:text-zinc-300">Phone</label>
                    <input
                      type="text"
                      placeholder="+91 98111 22334"
                      value={formData.phone}
                      onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                      className="w-full text-xs px-3 py-2 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-zinc-100 focus:outline-hidden focus:ring-1 focus:ring-zinc-400"
                    />
                  </div>
                </div>

                {/* Password with generator */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <label className="text-[11px] font-semibold text-zinc-700 dark:text-zinc-300">
                      Login Password *
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        const randomPass = `Bk${Math.floor(1000 + Math.random() * 9000)}!Pass`;
                        setFormData((prev) => ({ ...prev, password: randomPass }));
                      }}
                      className="text-[10px] text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                    >
                      <Sparkles className="w-2.5 h-2.5" /> Generate Random
                    </button>
                  </div>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      value={formData.password}
                      onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
                      className="w-full text-xs pl-3 pr-9 py-2 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-zinc-100 focus:outline-hidden focus:ring-1 focus:ring-zinc-400 font-mono"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600"
                    >
                      {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                {/* Role and Department */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-zinc-700 dark:text-zinc-300">Role</label>
                    <select
                      value={formData.role}
                      onChange={(e) => handleRoleChange(e.target.value)}
                      className="w-full text-xs px-2.5 py-2 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-zinc-100 focus:outline-hidden"
                    >
                      {ROLE_OPTIONS.map((r) => (
                        <option key={r.value} value={r.value}>
                          {r.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-zinc-700 dark:text-zinc-300">Department</label>
                    <select
                      value={formData.department}
                      onChange={(e) => setFormData((prev) => ({ ...prev, department: e.target.value }))}
                      className="w-full text-xs px-2.5 py-2 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-zinc-100 focus:outline-hidden"
                    >
                      {DEPARTMENT_OPTIONS.map((d) => (
                        <option key={d.value} value={d.value}>
                          {d.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Permissions Checkboxes */}
                <div className="space-y-2 pt-2 border-t border-zinc-100 dark:border-zinc-800">
                  <span className="text-[11px] font-semibold text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
                    <Shield className="w-3 h-3 text-zinc-500" />
                    Configure Operational Permissions:
                  </span>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <label className="flex items-center gap-2 p-2 bg-zinc-50 dark:bg-zinc-800/40 rounded-lg border border-zinc-200 dark:border-zinc-700 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.can_manage_leads}
                        onChange={(e) =>
                          setFormData((prev) => ({ ...prev, can_manage_leads: e.target.checked }))
                        }
                        className="rounded text-zinc-900 focus:ring-0"
                      />
                      <span className="text-[11px] text-zinc-700 dark:text-zinc-300">Manage CRM Leads</span>
                    </label>

                    <label className="flex items-center gap-2 p-2 bg-zinc-50 dark:bg-zinc-800/40 rounded-lg border border-zinc-200 dark:border-zinc-700 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.can_manage_projects}
                        onChange={(e) =>
                          setFormData((prev) => ({ ...prev, can_manage_projects: e.target.checked }))
                        }
                        className="rounded text-zinc-900 focus:ring-0"
                      />
                      <span className="text-[11px] text-zinc-700 dark:text-zinc-300">Manage Projects & Sites</span>
                    </label>

                    <label className="flex items-center gap-2 p-2 bg-zinc-50 dark:bg-zinc-800/40 rounded-lg border border-zinc-200 dark:border-zinc-700 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.can_view_finances}
                        onChange={(e) =>
                          setFormData((prev) => ({ ...prev, can_view_finances: e.target.checked }))
                        }
                        className="rounded text-zinc-900 focus:ring-0"
                      />
                      <span className="text-[11px] text-zinc-700 dark:text-zinc-300">View Invoices & Finances</span>
                    </label>

                    <label className="flex items-center gap-2 p-2 bg-zinc-50 dark:bg-zinc-800/40 rounded-lg border border-zinc-200 dark:border-zinc-700 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.can_approve_orders}
                        onChange={(e) =>
                          setFormData((prev) => ({ ...prev, can_approve_orders: e.target.checked }))
                        }
                        className="rounded text-zinc-900 focus:ring-0"
                      />
                      <span className="text-[11px] text-zinc-700 dark:text-zinc-300">Approve Purchase Orders</span>
                    </label>
                  </div>
                </div>

                {/* Submit button */}
                <div className="pt-3 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="px-3 py-1.5 border border-zinc-200 dark:border-zinc-700 rounded-lg text-xs text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-4 py-1.5 bg-zinc-950 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-zinc-200 text-white dark:text-zinc-950 rounded-lg text-xs font-semibold shadow-xs disabled:opacity-50 flex items-center gap-1.5"
                  >
                    {isSubmitting ? (
                      <span>Creating Login & Enrolling...</span>
                    ) : (
                      <>
                        <KeyRound className="w-3.5 h-3.5" />
                        <span>Create Employee Account</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
