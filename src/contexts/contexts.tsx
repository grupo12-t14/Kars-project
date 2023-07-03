"use client";
import {
  IFormUpdateCep,
  IFormUpdateInfoUser,
  iLoginForm,
  iRegisterForm,
} from "@/types/types";
import { createContext, useState } from "react";
import { useRouter } from "next/navigation";
import jwt from "jsonwebtoken";
import { localApi } from "@/api";

export const UserContext = createContext({});

export const UserProvider = ({ children }: any) => {
  const router = useRouter();
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const token = localStorage.getItem("@TOKEN");
  const tokenString = token + "";
  const decodedToken = jwt.decode(tokenString);
  
  const getRegisterData = (data: iRegisterForm) => {
    async function fetchData() {
      try {
        data.cep = data.cep.replace(/\D/g, "");
        data.cpf = data.cpf.replace(/\D/g, "");
        data.telephone = data.telephone.replace(/\D/g, "");
        const response = await localApi.post("register", data);

        response.status === 201 && setRegisterSuccess(true);
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
        const response = await localApi.post("login", data);
        response.status === 200 && router.push(`dashboard`);
        localStorage.setItem("@TOKEN", response.data.token);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
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
