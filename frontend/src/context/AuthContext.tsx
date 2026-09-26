"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { authApi, clearAuthTokens, getAuthToken, IndustryType, ApiUser } from "@/utils/api";

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

export const mapBackendRole = (role: string): UserRole => {
  switch (role?.toUpperCase()) {
    case "SUPERADMIN":
      return "superadmin";
    case "COMPANY_ADMIN":
      return "studio_admin";
    case "ARCHITECT":
    case "PROJECT_MANAGER":
    case "SITE_ENGINEER":
    case "SALES_LEAD":
      return "architect";
    case "CONTRACTOR":
      return "contractor";
    default:
      return "studio_admin";
  }
};

export const mapApiUserToProfile = (apiUser: ApiUser): UserProfile => {
  const mappedRole = mapBackendRole(apiUser.role);
  return {
    id: apiUser.id,
    name: apiUser.full_name || `${apiUser.first_name || ""} ${apiUser.last_name || ""}`.trim() || apiUser.email,
    email: apiUser.email,
    role: mappedRole,
    roleTitle: apiUser.role_title || (mappedRole === "superadmin" ? "Platform Superadmin" : "Company Member"),
    studioName: apiUser.company_details?.name || "Basekraft Enterprise",
    orgCode: apiUser.company_details?.org_code || undefined,
    department: apiUser.department || "PROJECTS",
    canManageLeads: apiUser.can_manage_leads ?? true,
    canManageProjects: apiUser.can_manage_projects ?? true,
    canViewFinances: apiUser.can_view_finances ?? false,
    canApproveOrders: apiUser.can_approve_orders ?? false,
    avatar: apiUser.avatar_initials || (apiUser.full_name ? apiUser.full_name.slice(0, 2).toUpperCase() : "BK"),
    tenantId: apiUser.company || undefined,
    industry: (apiUser.company_details?.industry as IndustryType) || "INTERIOR_DESIGN",
    industryDisplay: apiUser.company_details?.industry_display || "Interior Design & Turnkey Fit-out",
  };
};

interface AuthContextType {
  user: UserProfile | null;
  role: UserRole | null;
  industry: IndustryType;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password?: string, targetRole?: UserRole) => Promise<boolean>;
  quickLogin: (role: UserRole) => Promise<boolean>;
  logout: () => void;
  switchRole: (role: UserRole) => void;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const persistUser = (nextUser: UserProfile | null) => {
    setUser(nextUser);
    try {
      if (nextUser) {
        localStorage.setItem("basekraft_auth_user", JSON.stringify(nextUser));
      } else {
        localStorage.removeItem("basekraft_auth_user");
      }
    } catch {
      // ignore storage errors
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

  const refreshProfile = async () => {
    const token = getAuthToken();
    if (!token) {
      setUser(null);
      return;
    }
    try {
      const apiUser = await authApi.getMe();
      const profile = mapApiUserToProfile(apiUser);
      persistUser(profile);
    } catch (err) {
      console.warn("Failed to refresh user profile:", err);
    }
  };

  useEffect(() => {
    const token = getAuthToken();

    if (!token) {
      clearAuthTokens();
      setUser(null);
      setIsLoading(false);
      return;
    }

    // Must verify with backend live before considering user logged in
    authApi
      .getMe()
      .then((apiUser) => {
        const profile = mapApiUserToProfile(apiUser);
        persistUser(profile);
      })
      .catch((err) => {
        console.warn("Backend unavailable or session expired:", err);
        clearAuthTokens();
        setUser(null);
      })
      .finally(() => {
        setIsLoading(false);
      });

    const handleSessionExpired = () => {
      clearAuthTokens();
      setUser(null);
      router.push("/login?reason=session_expired");
    };

    window.addEventListener("basekraft:session-expired", handleSessionExpired);
    return () => {
      window.removeEventListener("basekraft:session-expired", handleSessionExpired);
    };
  }, [router]);

  const login = async (email: string, password?: string, targetRole?: UserRole): Promise<boolean> => {
    if (!email || !password) {
      throw new Error("Please enter both email and password.");
    }

    const res = await authApi.login(email.trim(), password);
    const mappedRole = targetRole || mapBackendRole(res.user.role);
    const userProfile = mapApiUserToProfile(res.user);

    persistUser(userProfile);
    navigateByRole(mappedRole);
    return true;
  };

  const quickLogin = async (role: UserRole): Promise<boolean> => {
    const demoCredentials: Record<UserRole, { email: string; pass: string }> = {
      superadmin: { email: "superadmin@basekraft.in", pass: "SuperAdmin@123" },
      studio_admin: { email: "admin@basekraft.in", pass: "StudioAdmin@123" },
      architect: { email: "riya.kapoor@basekraft.in", pass: "Architect@123" },
      contractor: { email: "vikram.mep@apexbuild.com", pass: "Contractor@123" },
    };

    const cred = demoCredentials[role];
    if (cred) {
      return login(cred.email, cred.pass, role);
    }
    return false;
  };

  const switchRole = (newRole: UserRole) => {
    if (!user) return;
    const updated = { ...user, role: newRole };
    persistUser(updated);
    navigateByRole(newRole);
  };

  const logout = () => {
    clearAuthTokens();
    setUser(null);
    router.push("/login");
  };

  const role = user?.role || null;
  const isAuthenticated = Boolean(user && getAuthToken());

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        industry: user?.industry || "INTERIOR_DESIGN",
        isAuthenticated,
        isLoading,
        login,
        quickLogin,
        logout,
        switchRole,
        refreshProfile,
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
