"use client";
import { UserContext } from "@/contexts/contexts";
import { recoverPasswordSubmitEmailSchema } from "@/schemas/recoverPasswordSchema";
import { IFormEmailtoResetPassword } from "@/types/types";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState, ChangeEvent, FormEvent, useContext } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

const RecoverPassword = () => {
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(recoverPasswordSubmitEmailSchema),
  });

  const { forgotPassword }: any = useContext(UserContext);

  const submit: SubmitHandler<IFormEmailtoResetPassword> = async (formData) => {
    await forgotPassword(formData);
    reset();
  };

  return (
    <div className="w-full h-screen bg-gray-500 flex justify-center items-center">
      <div className="bg-gray-900 w-full md:max-w-[400px] p-8 flex flex-col gap-4">
        <h2 className="text-brand-100 font-bold">Recuperação de senha</h2>
        <form
          className="w-full flex flex-col gap-3"
          onSubmit={handleSubmit(submit)}
        >
          <h2>Informe seu email para gerar um token de recuperação.</h2>
          <input
            type="text"
            className="h-[48px] w-full rounded border-gray-300 border-[2px] pl-1"
            placeholder="Digite seu email aqui."
           {...register("email")}
          />
          {errors.email?.message && (
            <span className="text-red-500">{errors.email.message}</span>
          )}
          <button
            type="submit"
            className="bg-brand-100 text-gray-700 hover:bg-brand-300 p-[10px] rounded w-[100px]"
          >
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
};

export default RecoverPassword;
