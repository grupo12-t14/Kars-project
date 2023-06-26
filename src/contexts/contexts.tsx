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
import jwt from "jsonwebtoken";

export const UserContext = createContext({});

export const UserProvider = ({ children }: any) => {
  const router = useRouter();
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const token = localStorage.getItem("@TOKEN");
  const [tokenRecover, setRecover] = useState("");
  const tokenString = token + '';
  const decodedToken = jwt.decode(tokenString);

  const getRegisterData = (data: iRegisterForm) => {
    async function fetchData() {
      try {
        console.log(data);
        const response = await api.post("users", data);
        response.status === 201 && setRegisterSuccess(true);
        console.log(response);
        setRegisterSuccess(true);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  };
//router.push(`dashboard/${response.data.user.name}`);
  const getLoginData = (data: iLoginForm) => {
    async function fetchData() {
      try {
        const response = await api.post("login", data);
        response.status === 200 &&
        router.push(`dashboard`);
        localStorage.setItem("@TOKEN", response.data.token);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  };

  const updateInfoUser = async (data: IFormUpdateInfoUser) => {
    try {
      await api.patch(`users/${decodedToken!.sub}`, data, {
        headers:{Authorization: `Bearer ${token}`}
      });
    } catch (error) {}
  };

  const updateCepUser = async (data: IFormUpdateCep) => {
    try {
      await api.patch(`users/${decodedToken!.sub}`, data, {
        headers:{Authorization: `Bearer ${token}`}
      });
    } catch (error) {}
  };

  const deleteUser = async () => {
    try {
      await api.delete(`users/${decodedToken!.sub}`,  {
        headers:{Authorization: `Bearer ${token}`}
      });
      router.push("/login");
      localStorage.removeItem("@TOKEN");
    } catch (error) {}
  };

  const forgotPassword = async (data: IFormUpdateInfoUser) => {
    try {
      const response = await api.patch("recovery", data);
      setRecover(response.data.token);
    } catch (error) {}
  };

  const resetPassword = async (data: IFormUpdateInfoUser) => {
    try {
      await api.put(`reset/${tokenRecover}`, data);
    } catch (error) {
    } finally {
      setRecover("");
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
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
