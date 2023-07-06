"use client";
import { UserContext } from "@/contexts/contexts";
import { recoverPasswordSchema } from "@/schemas/recoverPasswordSchema";
import { IFormNewPassword } from "@/types/types";
import { yupResolver } from "@hookform/resolvers/yup";
import { useContext } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

const ResetPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(recoverPasswordSchema),
  });

  const { resetPassword }: any = useContext(UserContext);

  const submit: SubmitHandler<IFormNewPassword> = async (formData) => {
    await resetPassword(formData);
    reset();
  };

  return (
    <div className="w-full h-screen bg-gray-600 flex justify-center items-center">
      <div className="bg-gray-900 w-full md:max-w-[400px] p-8 flex flex-col gap-4">
        <h1 className="text-brand-100 font-bold ">Redefinição de senha</h1>
        <form
          className="w-full flex flex-col gap-3"
          onSubmit={handleSubmit(submit)}
        >
          <h3>Digite sua nova senha.</h3>
          <input
            type="password"
            className="h-[48px] w-full rounded border-gray-300 border-[2px] pl-1"
            placeholder="Digite sua nova senha."
            {...register("password")}
          />
          {errors.password?.message && (
            <span className="text-red-500">{errors.password.message}</span>
          )}
          <input
            type="password"
            className="h-[48px] w-full rounded border-gray-300 border-[2px] pl-1"
            placeholder="Confirme sua nova senha."
            {...register("confirmPassword")}
          />
          {errors.confirmPassword?.message && (
            <span className="text-red-500">{errors.confirmPassword.message}</span>
          )}
          <button
            type="submit"
            className="bg-brand-100 text-gray-700 hover:bg-brand-300 p-[10px] rounded w-[100px]"
          >
            Redefinir
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
