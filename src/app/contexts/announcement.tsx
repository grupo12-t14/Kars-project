"use client";

import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";
import { iAnnouncement } from "../profile/page";
import { iPaginatedAnnouncementResults } from "../dashboard/page";
import { localApi } from "../../api";
import { useParams } from "next/navigation";

interface Props {
  children: ReactNode;
}
export interface iFilterOptions {
  brand: string[];
  model: string[];
  color: string[];
  fuelType: string[];
  mileage: string[];
  year: string[];
  sellPrice: string[];
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
  retriveSellerAnnouncements: (userId: string) => Promise<void>;
  sellerAnnouncements: iAnnouncement[];
  setSellerAnnouncements: Dispatch<SetStateAction<iAnnouncement[]>>;
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
  const { id } = useParams();
  const [queryParamsString, setQueryParamsString] = useState<string>("");
  const [filterOptions, setFilterOptions] = useState<iFilterOptions | []>([]);
  const [sellerAnnouncements, setSellerAnnouncements] = useState<
    iAnnouncement[]
  >([]);

  const getAnnouncementsRequest = async () => {
    try {
      setIsLoading(true);
      const response = await localApi.get(
        `announcements/?${queryParamsString}`,
        {}
      );
      const paginatedResponse = await localApi.get(
        "announcements/?page=1&perPage=12"
      );
      setPaginatedAnnouncements(paginatedResponse.data);
      setGetAnnouncements(response.data);
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
      const response = await localApi.get("announcements/distinct");
      setFilterOptions(response.data[0]);
    } catch (err) {
      console.error(err);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  };
 
  const retriveSellerAnnouncements = async (userId: string) => {
    try {
      setIsLoading(true);
      const response = await localApi.get(`/announcements/user/${userId}`);
      setSellerAnnouncements(response.data);
    } catch (err) {
      console.error(err);
    } finally {
      setTimeout(() => {
        setIsLoading(true);
      }, 1500);
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
        retriveSellerAnnouncements,
        sellerAnnouncements,
        setSellerAnnouncements,
      }}
    >
      {children}
    </AnnouncementContext.Provider>
  );
};

export const useAnnouncementContext = () => useContext(AnnouncementContext);
