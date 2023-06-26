"use client";
import { useState, ChangeEvent, FormEvent } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const RecoverPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleNewPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };

  const handleEmailSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) {
      setEmailError("Email é obrigatório.");
    } else if (!isValidEmail(email)) {
      setEmailError("Digite um email válido.");
    } else {
      setEmailError("");
      
    }
  };

  const handlePasswordSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newPassword.length < 8) {
      setPasswordError("A senha precisa ter no mínimo 8 caracteres.");
    } else if (newPassword !== confirmPassword) {
      setConfirmPasswordError("As senhas precisam coincidir.");
    } else {
      setPasswordError("");
      setConfirmPasswordError("");
      // Lógica para alterar a senha
    }
  };

  const isValidEmail = (email: string) => {
    // Implemente sua lógica de validação de email aqui
    // Retorne true se o email for válido, caso contrário, retorne false
    return true;
  };

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
            <form
              className="w-full flex flex-col gap-3"
              onSubmit={handleEmailSubmit}
            >
              <h2>Informe seu email para gerar um token de recuperação.</h2>
              <input
                type="text"
                className="h-[48px] w-full rounded border-gray-300 border-[2px] pl-1"
                placeholder="Digite seu email aqui."
                value={email}
                onChange={handleEmailChange}
              />
              {emailError && <p className="text-red-500">{emailError}</p>}
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
              className="w-full flex flex-col gap-3"
              onSubmit={handlePasswordSubmit}
            >
              <h2>Digite sua nova senha.</h2>
              <input
                type="password"
                className="h-[48px] w-full rounded border-gray-300 border-[2px] pl-1"
                placeholder="Digite sua nova senha."
                value={newPassword}
                onChange={handleNewPasswordChange}
              />
              {passwordError && <p className="text-red-500">{passwordError}</p>}
              <input
                type="password"
                className="h-[48px] w-full rounded border-gray-300 border-[2px] pl-1"
                placeholder="Confirme sua nova senha."
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
              />
              {confirmPasswordError && (
                <p className="text-red-500">{confirmPasswordError}</p>
              )}
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

export default RecoverPassword;
