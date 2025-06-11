"use client";

import {createContext, useContext} from "react";
import {useSession, signOut as nextAuthSignOut} from "next-auth/react";

type AuthContextType = {
  user: any | null;
  isLoading: boolean;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({children}: {children: React.ReactNode}) {
  const {data: session, status} = useSession();

  const user = session?.user ?? null;
  const isLoading = status === "loading";

  const signOut = () => {
    nextAuthSignOut({callbackUrl: "/"});
  };

  return (
    <AuthContext.Provider value={{user, isLoading, signOut}}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
