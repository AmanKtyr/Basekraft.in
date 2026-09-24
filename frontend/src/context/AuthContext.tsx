"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { authApi, clearAuthTokens, setAuthTokens, ensureAuthToken, getAuthToken, IndustryType } from "@/utils/api";

export type UserRole =
  | "superadmin"
  | "studio_admin"
  | "architect"
  | "contractor";

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  roleTitle: string;
  studioName: string;
  orgCode?: string;
  department?: string;
  canManageLeads?: boolean;
  canManageProjects?: boolean;
  canViewFinances?: boolean;
  canApproveOrders?: boolean;
  avatar?: string;
  tenantId?: string;
  assignedProjectCode?: string;
  industry?: IndustryType;
  industryDisplay?: string;
}

export const DEMO_PROFILES: Record<UserRole, UserProfile> = {
  superadmin: {
    id: "usr_superadmin",
    name: "Platform Superadmin",
    email: "superadmin@basekraft.in",
    role: "superadmin",
    roleTitle: "Global Enterprise Orchestrator",
    studioName: "Basekraft Platform HQ",
    orgCode: "BASEKRAFT-HQ",
    department: "EXECUTIVE",
    canManageLeads: true,
    canManageProjects: true,
    canViewFinances: true,
    canApproveOrders: true,
    avatar: "PS",
    industry: "INTERIOR_DESIGN",
    industryDisplay: "Multi-Tenant Enterprise",
  },
  studio_admin: {
    id: "usr_studio_admin",
    name: "Aman Sharma",
    email: "admin@basekraft.in",
    role: "studio_admin",
    roleTitle: "Managing Director & Principal",
    studioName: "Basekraft Turnkey & Architecture",
    orgCode: "ORG-BK-9182",
    department: "PROJECTS",
    canManageLeads: true,
    canManageProjects: true,
    canViewFinances: true,
    canApproveOrders: true,
    avatar: "AS",
    tenantId: "tenant_bk_01",
    industry: "INTERIOR_DESIGN",
    industryDisplay: "Interior Design & Turnkey Fit-out",
  },
  architect: {
    id: "usr_architect",
    name: "Riya Kapoor",
    email: "riya.kapoor@basekraft.in",
    role: "architect",
    roleTitle: "Senior Design & Project Lead",
    studioName: "Basekraft Turnkey & Architecture",
    orgCode: "ORG-BK-9182",
    department: "DESIGN",
    canManageLeads: true,
    canManageProjects: true,
    canViewFinances: false,
    canApproveOrders: false,
    avatar: "RK",
    tenantId: "tenant_bk_01",
    assignedProjectCode: "P-101",
    industry: "INTERIOR_DESIGN",
    industryDisplay: "Interior Design & Turnkey Fit-out",
  },
  contractor: {
    id: "usr_contractor",
    name: "Vikram Oberoi",
    email: "vikram.mep@apexbuild.com",
    role: "contractor",
    roleTitle: "Turnkey MEP & Fit-out Director",
    studioName: "Apex MEP Turnkey Labs",
    orgCode: "ORG-BK-9182",
    department: "ENGINEERING",
    canManageLeads: false,
    canManageProjects: true,
    canViewFinances: false,
    canApproveOrders: false,
    avatar: "VO",
    tenantId: "tenant_bk_01",
    industry: "INTERIOR_DESIGN",
    industryDisplay: "Interior Design & Turnkey Fit-out",
  },
};

interface AuthContextType {
  user: UserProfile;
  role: UserRole;
  industry: IndustryType;
  isAuthenticated: boolean;
  login: (email: string, password?: string, role?: UserRole) => Promise<boolean>;
  quickLogin: (role: UserRole) => void;
  logout: () => void;
  switchRole: (role: UserRole) => void;
  setIndustry: (industry: IndustryType) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<UserProfile>(DEMO_PROFILES.studio_admin);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    try {
      const saved = localStorage.getItem("basekraft_auth_user");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed?.role && DEMO_PROFILES[parsed.role as UserRole]) {
          setUser(parsed);
        }
      }
    } catch {
      // ignore storage errors
    }

    // Ensure client has active DRF JWT authentication tokens
    if (!getAuthToken()) {
      ensureAuthToken().catch(() => {});
    }
  }, []);

  const persistUser = (nextUser: UserProfile) => {
    setUser(nextUser);
    try {
      localStorage.setItem("basekraft_auth_user", JSON.stringify(nextUser));
    } catch {
      // ignore
    }
  };

  const mapBackendRole = (role: string): UserRole => {
    switch (role?.toUpperCase()) {
      case "SUPERADMIN":
        return "superadmin";
      case "COMPANY_ADMIN":
        return "studio_admin";
      case "ARCHITECT":
        return "architect";
      case "CONTRACTOR":
        return "contractor";
      default:
        return "studio_admin";
    }
  };

  const navigateByRole = (role: UserRole) => {
    if (role === "superadmin") {
      router.push("/superadmin");
    } else if (role === "contractor") {
      router.push("/orders");
    } else {
      router.push("/dashboard");
    }
  };

  const login = async (email: string, password?: string, targetRole?: UserRole): Promise<boolean> => {
    // 1. Try real DRF backend authentication first if password is provided
    if (password && password !== "••••••••••••") {
      try {
        const res = await authApi.login(email, password);
        const mappedRole = mapBackendRole(res.user.role);
        const userProfile: UserProfile = {
          id: res.user.id,
          name: res.user.full_name || res.user.email,
          email: res.user.email,
          role: mappedRole,
          roleTitle: res.user.role_title || "Company Member",
          studioName: res.user.company_details?.name || "Basekraft Enterprise",
          orgCode: res.user.company_details?.org_code || undefined,
          department: res.user.department || "PROJECTS",
          canManageLeads: res.user.can_manage_leads ?? true,
          canManageProjects: res.user.can_manage_projects ?? true,
          canViewFinances: res.user.can_view_finances ?? false,
          canApproveOrders: res.user.can_approve_orders ?? false,
          avatar: res.user.avatar_initials || "BK",
          tenantId: res.user.company || undefined,
          industry: (res.user.company_details?.industry as IndustryType) || "INTERIOR_DESIGN",
          industryDisplay: res.user.company_details?.industry_display || "Interior Design & Turnkey Fit-out",
        };

        persistUser(userProfile);
        navigateByRole(mappedRole);
        return true;
      } catch (err: unknown) {
        console.warn("Backend auth failed, evaluating demo match:", err);
      }
    }

    // 2. Demo fallback
    const matchedRole =
      targetRole ||
      (Object.keys(DEMO_PROFILES).find(
        (k) => DEMO_PROFILES[k as UserRole].email.toLowerCase() === email.toLowerCase()
      ) as UserRole) ||
      "studio_admin";

    const profile = DEMO_PROFILES[matchedRole];
    persistUser(profile);
    navigateByRole(matchedRole);
    return true;
  };

  const quickLogin = (role: UserRole) => {
    const profile = DEMO_PROFILES[role];
    persistUser(profile);
    navigateByRole(role);
  };

  const switchRole = (newRole: UserRole) => {
    const profile = DEMO_PROFILES[newRole];
    persistUser(profile);
    navigateByRole(newRole);
  };

  const setIndustry = (newIndustry: IndustryType) => {
    const industryLabels: Record<IndustryType, string> = {
      INTERIOR_DESIGN: "Interior Design & Turnkey Fit-out",
      SOLAR_EPC: "Solar Energy & Rooftop EPC",
      MODULAR_FURNITURE: "Modular Furniture & Manufacturing",
      CIVIL_CONSTRUCTION: "Real Estate & Civil Construction",
    };
    const updated = {
      ...user,
      industry: newIndustry,
      industryDisplay: industryLabels[newIndustry],
    };
    persistUser(updated);
  };

  const logout = () => {
    clearAuthTokens();
    setUser(DEMO_PROFILES.studio_admin);
    router.push("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role: user.role,
        industry: user.industry || "INTERIOR_DESIGN",
        isAuthenticated: true,
        login,
        quickLogin,
        logout,
        switchRole,
        setIndustry,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
