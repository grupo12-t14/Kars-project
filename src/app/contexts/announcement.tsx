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
import { localApi } from "@/api";
import { UpdatableAnnouncementData } from "@/components/Modal/validation";

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
  retrieveAnnouncementById: (announcementId: string) => void;
  retrievedAnnouncement: iAnnouncement | null;
  deleteAnnouncementById: (announcementId: string) => Promise<boolean>;
  isAnnouncementDeleted: boolean;
  setIsAnnouncementDeleted: Dispatch<SetStateAction<boolean>>;
  updateAnnouncementRequest: (
    announcementId: string,
    data: UpdatableAnnouncementData
  ) => Promise<void>;
}

export const AnnouncementContext = createContext<announcementProviderData>(
  {} as announcementProviderData
);

export const AnnouncementProvider = ({ children }: Props) => {
  const token = localStorage.getItem("@TOKEN");
  localApi.defaults.headers.common.authorization = `Bearer ${token}`;
  const [isLoading, setIsLoading] = useState(false);
  const [getAnnouncements, setGetAnnouncements] = useState<
    iAnnouncement[] | []
  >([]);
  const [paginatedAnnouncements, setPaginatedAnnouncements] = useState<
    iPaginatedAnnouncementResults | []
  >([]);
  const [queryParamsString, setQueryParamsString] = useState<string>("");
  const [filterOptions, setFilterOptions] = useState<iFilterOptions | []>([]);
  const [sellerAnnouncements, setSellerAnnouncements] = useState<
    iAnnouncement[]
  >([]);
  const [isAnnouncementDeleted, setIsAnnouncementDeleted] = useState(false);
  const [retrievedAnnouncement, setRetrievedAnnouncement] =
    useState<iAnnouncement | null>(null);

  const getAnnouncementsRequest = async () => {
    try {
      setIsLoading(true);
      const response = await localApi.get(
        `announcements/?${queryParamsString}`,
        {}
      );
      const paginatedResponse = await localApi.get(
        "http://localhost:3000/announcements/"
      );
      console.log(response.data);
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

  const retrieveAnnouncementById = async (announcementId: string) => {
    try {
      setIsLoading(true);
      const response = await localApi.get(`/announcements/${announcementId}`);
      if (response.status === 200) {
        setRetrievedAnnouncement(response.data);
        return true;
      }
    } catch (err) {
      console.error(err);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 900);
    }
  };

  const deleteAnnouncementById = async (announcementId: string) => {
    try {
      setIsLoading(true);
      const response = await localApi.delete(`announcements/${announcementId}`);
      if (response.status === 204) {
        setTimeout(() => {
          setIsAnnouncementDeleted(true);
          setIsLoading(false);
        }, 1200);
      }
    } catch (err) {
      console.error(err);
      return false;
    } finally {
      setTimeout(() => {
        window.location.reload();
      }, 2600);
      return true;
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
        setIsLoading(false);
      }, 1500);
    }
  };

  const updateAnnouncementRequest = async (
    announcementId: string,
    data: UpdatableAnnouncementData
  ) => {
    setIsLoading(true);
    const response = await localApi.patch(
      `announcements/${announcementId}`,
      data
    );
    if (response.status === 200) {
      setTimeout(() => {
        setIsLoading(false);
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
        retrieveAnnouncementById,
        retrievedAnnouncement,
        deleteAnnouncementById,
        setIsAnnouncementDeleted,
        isAnnouncementDeleted,
        updateAnnouncementRequest,
      }}
    >
      {children}
    </AnnouncementContext.Provider>
  );
};

export const useAnnouncementContext = () => useContext(AnnouncementContext);
