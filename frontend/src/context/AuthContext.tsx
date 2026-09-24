"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export type UserRole =
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
  studio_admin: {
    id: "usr_studio_admin",
    name: "Aman Tyagi",
    email: "admin@basekraft.in",
    role: "studio_admin",
    roleTitle: "Principal Architect & Founder",
    studioName: "Basekraft Studio Gurugram",
    avatar: "AT",
    tenantId: "tenant_bk_01",
  },
  architect: {
    id: "usr_architect",
    name: "Rohan Sharma",
    email: "architect@basekraft.in",
    role: "architect",
    roleTitle: "Senior Project Architect",
    studioName: "Basekraft Studio Gurugram",
    avatar: "RS",
    tenantId: "tenant_bk_01",
    assignedProjectCode: "P-101",
  },
  contractor: {
    id: "usr_contractor",
    name: "Durian Woodworks Team",
    email: "vendor@durianwoods.com",
    role: "contractor",
    roleTitle: "Millwork & Veneer Contractor",
    studioName: "Durian Fabrication Labs",
    avatar: "DW",
    tenantId: "tenant_bk_01",
  },
};

interface AuthContextType {
  user: UserProfile;
  role: UserRole;
  isAuthenticated: boolean;
  login: (email: string, role?: UserRole) => void;
  quickLogin: (role: UserRole) => void;
  logout: () => void;
  switchRole: (role: UserRole) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  // Safe default on server/client hydration
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

  const login = (email: string, targetRole?: UserRole) => {
    const matchedRole =
      targetRole ||
      (Object.keys(DEMO_PROFILES).find(
        (k) => DEMO_PROFILES[k as UserRole].email.toLowerCase() === email.toLowerCase()
      ) as UserRole) ||
      "studio_admin";

    const profile = DEMO_PROFILES[matchedRole];
    persistUser(profile);

    if (matchedRole === "contractor") {
      router.push("/orders");
    } else {
      router.push("/dashboard");
    }
  };

  const quickLogin = (role: UserRole) => {
    const profile = DEMO_PROFILES[role];
    persistUser(profile);

    if (role === "contractor") {
      router.push("/orders");
    } else {
      router.push("/dashboard");
    }
  };


  const switchRole = (newRole: UserRole) => {
    const profile = DEMO_PROFILES[newRole];
    persistUser(profile);
  };

  const logout = () => {
    try {
      localStorage.removeItem("basekraft_auth_user");
    } catch {
      // ignore
    }
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
