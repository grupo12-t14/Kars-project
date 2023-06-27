"use client";
import { Footer } from "@/components/footer";
import { FormComponent } from "@/components/formComponent";
import { InputContainer } from "@/components/formInput";
import { Navbar } from "@/components/navBar";
import { UserContext } from "@/contexts/contexts";
import { formSchema } from "@/schemas/loginSchema";
import { iLoginForm } from "@/types/types";
import { yupResolver } from "@hookform/resolvers/yup";
import { NextPage } from "next";
import Link from "next/link";
import { useContext } from "react";
import { useForm } from "react-hook-form";

const Login: NextPage = () => {
  const { getLoginData, token }: any = useContext(UserContext);
  token && localStorage.removeItem("@TOKEN");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<iLoginForm>({
    resolver: yupResolver(formSchema),
  });
  return (
    <main className="flex flex-col justify-between h-screen w-full bg-gray-800">
      <Navbar />
      <div className="flex items-center h-full justify-center">
        <FormComponent handleSubmit={handleSubmit} formData={getLoginData}>
          <h1 className="font-semibold text-typography-25">Login</h1>
          <InputContainer
            label="Email"
            placeholder="Digitar email"
            type="email"
            register={register("email")}
          />
          {errors.email?.message && (
            <span className="text-feedBack-alert-100 text-[14px] my-[-25px]">
              {errors.email.message}
            </span>
          )}
          <InputContainer
            label="Senha"
            placeholder="Digitar senha"
            type="password"
            register={register("password")}
          />
          {errors.password?.message && (
            <span className="text-feedBack-alert-100 text-[14px] my-[-25px]">
              {errors.password.message}
            </span>
          )}
          <div className="flex justify-end items-center w-full font-semibold">
            <Link href={"/recoverPassword"}>Esqueci minha senha</Link>
          </div>
          <button
            type="submit"
            className="flex
                  justify-center
                  items-center
                  rounded-sm
                  font-semibold
                  h-[44px]
                  w-full
                  text-white
                  bg-brand-100"
          >
            Entrar
          </button>
          <div className="flex justify-center w-full">
            <p>Ainda não possui conta?</p>
          </div>
          <Link
            href={"register"}
            type="button"
            className="flex
                  justify-center
                  items-center
                  rounded-sm
                  font-semibold
                  h-[44px]
                  w-full
                  border-[1px]
                  border-gray-500
                  text-black
                  bg-white
                  hover:bg-brand-100
                  hover:text-white
                  hover:border-none"
          >
            Cadastrar
          </Link>
        </FormComponent>
      </div>
      <Footer />
    </main>
  );
};

export default Login;
