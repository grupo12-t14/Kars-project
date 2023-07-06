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
import { toast } from "react-toastify";

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
        const response = await localApi.post("users/", data);
        console.log(response);
        setRegisterSuccess(true);
        toast.success("Conta criada com sucesso.")
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
        toast.success("Login efetuado com sucesso.")
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  };

  const updateInfoUser = async (data: IFormUpdateInfoUser) => {
    try {
      data.cpf = data.cpf?.replace(/\D/g, "");
      data.telephone = data.telephone?.replace(/\D/g, "");
      await localApi.patch(`users/${decodedToken!.sub}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Informações pessoais atualizadas com sucesso.")
    } catch (error:any) {
      toast.error(error.message)
    }
  };
  const updateCepUser = async (data: IFormUpdateCep) => {
    try {
      data.cep = data.cep.replace(/\D/g, "");
      await localApi.patch(`users/${decodedToken!.sub}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Informações de endereço atualizadas com sucesso.")
    } catch (error:any) {
      toast.error(error.message)
    }
  };

  const deleteUser = async () => {
    try {
      const response = await localApi.delete(`users/${decodedToken!.sub}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Sua conta foi deletada sucesso.")
      router.push("/login");
      console.log({respostaDelete: response})
      localStorage.removeItem("@TOKEN");
    } catch (error:any) {
      toast.error(error.message)
    }
  };

  const forgotPassword = async (data: IFormUpdateInfoUser) => {
    try {
      await localApi.patch("recovery", data);
      toast.success("Confira seu email redefinir sua senha.")
    } catch (error:any) {
      toast.error(error.message)
    }
  };

  const resetPassword = async (data: IFormUpdateInfoUser, id: string) => {
    try {
      await localApi.patch(`reset/${id}`, data);
      toast.success("Sua senha foi atualizada com sucesso.")
    } catch (error:any) {
      toast.error(error.message)
    }
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
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
