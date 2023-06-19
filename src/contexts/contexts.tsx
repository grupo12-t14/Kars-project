"use client";
import { api } from "@/services/services";
import { iRegisterForm } from "@/types/types";
import { createContext, useState } from "react";
import { useRouter } from "next/navigation";

export const UserContext = createContext({});

export const UserProvider = ({ children }: any) => {
  const router = useRouter();
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const getRegisterData = (data: iRegisterForm) => {
    async function fetchData() {
      try {
        console.log(data);
        const response = await api.post("register", data);
        response.status === 201 && setRegisterSuccess(true)
        console.log(response)
        setRegisterSuccess(true);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  };

  return (
    <UserContext.Provider
      value={{ getRegisterData, registerSuccess, setRegisterSuccess, router }}
    >
      {children}
    </UserContext.Provider>
  );
};
