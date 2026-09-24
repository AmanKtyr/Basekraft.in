"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { authApi, clearAuthTokens, setAuthTokens } from "@/utils/api";

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
  avatar?: string;
  tenantId?: string;
  assignedProjectCode?: string;
}

export const DEMO_PROFILES: Record<UserRole, UserProfile> = {
  superadmin: {
    id: "usr_superadmin",
    name: "Platform Superadmin",
    email: "superadmin@basekraft.in",
    role: "superadmin",
    roleTitle: "Global Enterprise Orchestrator",
    studioName: "Basekraft Platform HQ",
    avatar: "PS",
  },
  studio_admin: {
    id: "usr_studio_admin",
    name: "Aman Sharma",
    email: "admin@basekraft.in",
    role: "studio_admin",
    roleTitle: "Principal Architect & Founder",
    studioName: "Basekraft Studio Gurugram",
    avatar: "AS",
    tenantId: "tenant_bk_01",
  },
  architect: {
    id: "usr_architect",
    name: "Riya Kapoor",
    email: "riya.kapoor@basekraft.in",
    role: "architect",
    roleTitle: "Senior BIM & Spatial Lead",
    studioName: "Basekraft Studio Gurugram",
    avatar: "RK",
    tenantId: "tenant_bk_01",
    assignedProjectCode: "P-101",
  },
  contractor: {
    id: "usr_contractor",
    name: "Vikram Oberoi",
    email: "vikram.mep@apexbuild.com",
    role: "contractor",
    roleTitle: "Turnkey MEP & HVAC Director",
    studioName: "Apex MEP Turnkey Labs",
    avatar: "VO",
    tenantId: "tenant_bk_01",
  },
};

interface AuthContextType {
  user: UserProfile;
  role: UserRole;
  isAuthenticated: boolean;
  login: (email: string, password?: string, role?: UserRole) => Promise<boolean>;
  quickLogin: (role: UserRole) => void;
  logout: () => void;
  switchRole: (role: UserRole) => void;
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
          roleTitle: res.user.role_title || "Studio Member",
          studioName: res.user.company_details?.name || "Basekraft Studio",
          avatar: res.user.avatar_initials || "BK",
          tenantId: res.user.company || undefined,
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
        isAuthenticated: true,
        login,
        quickLogin,
        logout,
        switchRole,
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
