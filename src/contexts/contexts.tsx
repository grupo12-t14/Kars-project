"use client";
import { api } from "@/services/services";
import {
  IFormUpdateCep,
  IFormUpdateInfoUser,
  iLoginForm,
  iRegisterForm,
} from "@/types/types";
import { createContext, useState } from "react";
import { useRouter } from "next/navigation";

export const UserContext = createContext({});

export const UserProvider = ({ children }: any) => {
  const router = useRouter();
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const token = localStorage.getItem("@TOKEN");

  const getRegisterData = (data: iRegisterForm) => {
    async function fetchData() {
      try {
        console.log(data);
        const response = await api.post("register", data);
        response.status === 201 && setRegisterSuccess(true);
        console.log(response);
        setRegisterSuccess(true);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  };

  const getLoginData = (data: iLoginForm) => {
    async function fetchData() {
      try {
        const response = await api.post("login", data);
        response.status === 200 &&
          router.push(`dashboard/${response.data.user.name}`);
        localStorage.setItem("@TOKEN", response.data.accessToken);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  };

  const updateInfoUser = async (data: IFormUpdateInfoUser) => {
    try {
      await api.patch("users", data);
    } catch (error) {}
  };

  const updateCepUser = async (data: IFormUpdateCep) => {
    try {
      await api.patch("users", data);
    } catch (error) {}
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
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
