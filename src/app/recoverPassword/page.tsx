"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { recoverPasswordSchema, recoverPasswordSubmitEmailSchema } from "@/schemas/recoverPasswordSchema";
import { IFormEmailtoResetPassword } from "@/types/types";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from 'react-hook-form';

const recoverPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(recoverPasswordSubmitEmailSchema),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(recoverPasswordSchema),
  });

  return (
    <div className="w-full h-screen bg-gray-500 flex justify-center items-center">
      <div className="bg-gray-900 w-full md:max-w-[400px] h-[350px] p-4">
        <h2>Recuperação de senha</h2>
        <Tabs defaultValue="account">
          <TabsList>
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="password">Password</TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            <form className="w-full flex flex-col gap-3">
              <h2>Informe seu email para gerar um token de recuperação.</h2>
              <input
                type="text"
                className="h-[48px] w-full rounded border-gray-300 border-[2px] pl-1"
                placeholder="digite seu email aqui."
              />
              <button
                type="submit"
                className="bg-brand-100 text-gray-700 hover:bg-brand-300 p-[10px] rounded w-[100px]"
              >
                Enviar
              </button>
            </form>
          </TabsContent>
          <TabsContent value="password">
            <form
              onSubmit={handleSubmit((data) => console.log(data))}
              className="w-full flex flex-col gap-3"
            >
              <h2>Digite sua nova senha.</h2>
              <input
                type="text"
                className="h-[48px] w-full rounded border-gray-300 border-[2px] pl-1"
                placeholder="digite sua nova senha."
              />
              <input
                type="text"
                className="h-[48px] w-full rounded border-gray-300 border-[2px] pl-1"
                placeholder="confirme sua nova senha."
              />
              <button
                type="submit"
                className="bg-brand-100 text-gray-700 hover:bg-brand-300 p-[10px] rounded w-[100px]"
              >
                Enviar
              </button>
            </form>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default recoverPassword;
