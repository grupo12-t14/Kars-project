"use client";
import {
  IFormUpdateCep,
  IFormUpdateInfoUser,
  iCommentForm,
  iLoginForm,
  iRegisterForm,
} from "@/types/types";
import { createContext, useState } from "react";
import { useRouter } from "next/navigation";
import jwt from "jsonwebtoken";
import { localApi } from "@/api";
import { iUser } from "@/app/profile/page";

export const UserContext = createContext({});

export const UserProvider = ({ children }: any) => {
  const router = useRouter();

  const [registerSuccess, setRegisterSuccess] = useState(false);
  const token = localStorage.getItem("@TOKEN");
  const tokenString = token + "";
  const decodedToken = jwt.decode(tokenString);
  const [userInfo, setUserInfo] = useState<iUser | undefined>(undefined);
  const [isUserLoading, setIsUserLoading] = useState(false);

  const getRegisterData = (data: iRegisterForm) => {
    async function fetchData() {
      try {
        data.cep = data.cep.replace(/\D/g, "");
        data.cpf = data.cpf.replace(/\D/g, "");
        data.telephone = data.telephone.replace(/\D/g, "");
        const response = await localApi.post("users/", data);
        setRegisterSuccess(true);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  };
  const retrieveUserInfo = async (token: string) => {
    const tokenString = token + "";
    const decodedToken = jwt.decode(tokenString);

    try {
      setIsUserLoading(true);
      if (token.length === 36) {
        const response = await localApi.get(`users/${token}`);
        if (response.status === 200) {
          return response.data;
        }
      } else {
        const response = await localApi.get(`users/${decodedToken!.sub}`);
        if (response.status === 200) {
          setUserInfo(response.data);
          return response.data;
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsUserLoading(false);
    }
  };
  const getLoginData = (data: iLoginForm) => {
    async function fetchData() {
      try {
        const response = await localApi.post("login", data);
        response.status === 200 && router.push(`dashboard`);
        localStorage.setItem("@TOKEN", response.data.token);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  };

  const logout = async () => {
    localStorage.clear();
    setUserInfo(undefined);
    router.push(`/login`);
  };
  const updateInfoUser = async (data: IFormUpdateInfoUser) => {
    try {
      await localApi.patch(`users/${decodedToken!.sub}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (error) {}
  };
  const updateCepUser = async (data: IFormUpdateCep) => {
    try {
      await localApi.patch(`users/${decodedToken!.sub}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (error) {}
  };

  const deleteUser = async () => {
    try {
      await localApi.delete(`users/${decodedToken!.sub}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      router.push("/login");
      localStorage.removeItem("@TOKEN");
    } catch (error) {}
  };

  const forgotPassword = async (data: IFormUpdateInfoUser) => {
    try {
      const response = await localApi.patch("recovery", data);
    } catch (error) {}
  };
  const resetPassword = async (data: IFormUpdateInfoUser, id: string) => {
    try {
      await localApi.patch(`reset/${id}`, data);
    } catch (error) {}
  };

  const getCommentData = async (data: iCommentForm) => {
    if (token) {
      try {
        //const response = await localApi.post(`${1}/comments`, data);
      } catch (error) {
        console.log(error);
      }
    } else {
      router.push("/login");
    }
  };

  return (
    <UserContext.Provider
      value={{
        getRegisterData,
        getLoginData,
        registerSuccess,
        setRegisterSuccess,
        router,
        token,
        updateInfoUser,
        updateCepUser,
        forgotPassword,
        resetPassword,
        deleteUser,
        getCommentData,
        retrieveUserInfo,
        userInfo,
        logout,
        isUserLoading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
