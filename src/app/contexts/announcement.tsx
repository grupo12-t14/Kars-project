"use client";

import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { iAnnouncement } from "../profile/page";
import { iPaginatedAnnouncementResults } from "../dashboard/page";
import { api } from "@/services/services";

interface Props {
  children: ReactNode;
}
export interface iFilterOptions {
  brand?: string[];
  model?: string[];
  color?: string[];
  fuelType?: string[];
  mileage?: string[];
  year?: string[];
  sellPrice?: string[];
}

export interface announcementProviderData {
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  getAnnouncements: iAnnouncement[] | [];
  setGetAnnouncements: Dispatch<SetStateAction<iAnnouncement[] | []>>;
  paginatedAnnouncements: iPaginatedAnnouncementResults | [];
  setPaginatedAnnouncements: Dispatch<
    SetStateAction<[] | iPaginatedAnnouncementResults>
  >;
  getAnnouncementsRequest: () => Promise<void>;
  queryParamsString: string;
  setQueryParamsString: Dispatch<SetStateAction<string>>;
  filterOptions: iFilterOptions | [];
  getFilterOptionsFromDistinctRoute: () => void;
}

export const AnnouncementContext = createContext<announcementProviderData>(
  {} as announcementProviderData
);

export const AnnouncementProvider = ({ children }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [getAnnouncements, setGetAnnouncements] = useState<
    iAnnouncement[] | []
  >([]);
  const [paginatedAnnouncements, setPaginatedAnnouncements] = useState<
    iPaginatedAnnouncementResults | []
  >([]);
  const [queryParamsString, setQueryParamsString] = useState<string>("");
  const [filterOptions, setFilterOptions] = useState<iFilterOptions | []>([]);
  const getAnnouncementsRequest = async () => {
    try {
      setIsLoading(true);
      const response = await api.get(`announcements/?${queryParamsString}`, {});
      console.log(response.data, queryParamsString);
      const paginatedResponse = await api.get(
        "http://localhost:3000/announcements/?page=1&perPage=12"
      );
      setPaginatedAnnouncements(paginatedResponse.data);
      setGetAnnouncements(response.data);
      console.log(response.data);
    } catch (err) {
      console.error(err);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  };
  const getFilterOptionsFromDistinctRoute = async () => {
    try {
      setIsLoading(true);
      const response = await api.get("announcements/distinct");
      console.log(response.data);
      setFilterOptions(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <AnnouncementContext.Provider
      value={{
        isLoading,
        setIsLoading,
        getAnnouncements,
        setGetAnnouncements,
        paginatedAnnouncements,
        setPaginatedAnnouncements,
        getAnnouncementsRequest,
        queryParamsString,
        setQueryParamsString,
        getFilterOptionsFromDistinctRoute,
        filterOptions,
      }}
    >
      {children}
    </AnnouncementContext.Provider>
  );
};

export const useAnnouncementContext = () => useContext(AnnouncementContext);
