"use client";

import React, { createContext, useState, useContext, ReactNode } from "react";

interface UserTokenContextProps {
  token: string | null;
  setToken: (token: string | null) => void;
}

const UserTokenContext = createContext<UserTokenContextProps | undefined>(
  undefined
);

export const UserTokenProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState<string | null>(null);

  return (
    <UserTokenContext.Provider value={{ token, setToken }}>
      {children}
    </UserTokenContext.Provider>
  );
};

export const useUserToken = (): UserTokenContextProps => {
  const context = useContext(UserTokenContext);
  if (context === undefined) {
    throw new Error("useUserToken must be used within a UserTokenProvider");
  }
  return context;
};
