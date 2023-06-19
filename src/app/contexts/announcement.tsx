"use client";

import { ReactNode, createContext, useContext, useState } from "react";

interface Props {
  children: ReactNode;
}

interface announcementProviderData {
  nullValue: string;
}

const AnnouncementContext = createContext<announcementProviderData>(
  {} as announcementProviderData
);

export const AnnouncementProvider = ({ children }: Props) => {
  const [nullValue, setNullValue] = useState<string>("null");
  return (
    <AnnouncementContext.Provider value={{ nullValue }}>
      {children}
    </AnnouncementContext.Provider>
  );
};

export const useAnnouncementContext = () => useContext(AnnouncementContext);
