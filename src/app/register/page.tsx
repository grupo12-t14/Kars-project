"use client";
import { Footer } from "@/components/footer";
import { InputContainer } from "@/components/formInput";
import { Navbar } from "@/components/navBar";
import { iRegisterForm } from "@/types/types";
import { NextPage } from "next";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { formSchema } from "../../schemas/registerSchema";
import { UserContext } from "../../contexts/contexts";
import { FormComponent } from "@/components/formComponent";

const Register: NextPage = () => {
  const { getRegisterData, registerSuccess, setRegisterSuccess, router, token }: any =
    useContext(UserContext);
  token && localStorage.removeItem("@TOKEN");

  const [activeButton, setActiveButton] = useState("buyer");

  const [cpf, setCpf] = useState("");
  const handleCpfChange = (event: any) => {
    let value = event.target.value;
    value = value.replace(/\D/g, "");
    setCpf(formatCPF(value));
  };
  const formatCPF = (cpf: string) => {
    cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
    cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
    cpf = cpf.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    return cpf;
  };

  const [phoneNumber, setPhoneNumber] = useState("");
  const handlePhoneChange = (event: any) => {
    let value = event.target.value;
    value = value.replace(/\D/g, "");
    setPhoneNumber(formatPhoneNumber(value));
  };
  const formatPhoneNumber = (phoneNumber: string) => {
    if (phoneNumber.length <= 2) {
      return phoneNumber;
    } else if (phoneNumber.length <= 5) {
      return `(${phoneNumber.slice(0, 2)}) ${phoneNumber.slice(2)}`;
    } else if (phoneNumber.length <= 10) {
      return `(${phoneNumber.slice(0, 2)}) ${phoneNumber.slice(
        2,
        6
      )}-${phoneNumber.slice(6)}`;
    } else {
      return `(${phoneNumber.slice(0, 2)}) ${phoneNumber.slice(
        2,
        7
      )}-${phoneNumber.slice(7, 11)}`;
    }
  };

  const checkCEP = (e: any) => {
    const cep = e.target.value.replace(/\D/g, "");
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then((res) => res.json())
      .then((data) => {
        setValue("state", data.uf);
        setValue("city", data.localidade);
        setValue("street", data.logradouro);
        setFocus("number");
      });
  };

  const {
    register,
    handleSubmit,
    setValue,
    setFocus,
    formState: { errors },
  } = useForm<iRegisterForm>({
    resolver: yupResolver(formSchema),
  });

  return (
    <>
      {registerSuccess && (
        <div className="fixed top-0 z-10 flex justify-center w-screen h-screen bg-[#00000070]">
          <div className="relative top-[65px] flex flex-col justify-between p-4 w-[90%] max-h-[300px] sm-[60%] lg:w-[35%] bg-white rounded-lg sm:p-8">
            <div className="flex justify-between items-center text-typography-20">
              <h3 className="font-bold">Sucesso!</h3>
              <p
                className="text-gray-300 cursor-pointer"
                onClick={() => setRegisterSuccess(false)}
              >
                X
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <h3 className="font-bold">Sua conta foi criada com sucesso!</h3>
              <p>
                Agora você poderá ver seus negócios crescendo em grande escala
              </p>
              <button
                onClick={() => router.push("/login")}
                className="flex justify-center items-center w-[180px] h-[50px] rounded-md bg-brand-100 text-white font-bold"
              >
                Ir para o login
              </button>
            </div>
          </div>
        </div>
      )}
      <main className="flex flex-col w-full bg-gray-800">
        <Navbar />
        <div className="flex items-center justify-center py-9">
          <FormComponent handleSubmit={handleSubmit} formData={getRegisterData}>
            <h1 className="font-semibold text-typography-25">Cadastro</h1>
            <p className="font-bold text-[18px]">Informações Pessoais</p>
            <InputContainer
              label="Nome"
              placeholder="Ex: Samuel Leão"
              type="input"
              register={register("name")}
            />
            {errors.name?.message && (
              <span className="text-feedBack-alert-100 text-[14px] my-[-25px]">
                {errors.name.message}
              </span>
            )}
            <InputContainer
              label="Email"
              placeholder="Ex: samuel@kenzie.com"
              type="email"
              register={register("email")}
            />
            {errors.email?.message && (
              <span className="text-feedBack-alert-100 text-[14px] my-[-25px]">
                {errors.email.message}
              </span>
            )}
            <InputContainer
              label="CPF"
              placeholder="000.000.000-00"
              type="text"
              value={cpf}
              maxlength={14}
              onInput={handleCpfChange}
              register={register("cpf")}
            />
            {errors.cpf?.message && (
              <span className="text-feedBack-alert-100 text-[14px] my-[-25px]">
                {errors.cpf.message}
              </span>
            )}
            <InputContainer
              label="Celular"
              placeholder="(DDD) 90000-0000"
              type="text"
              value={phoneNumber}
              maxlength={15}
              onInput={handlePhoneChange}
              register={register("phone")}
            />
            {errors.phone?.message && (
              <span className="text-feedBack-alert-100 text-[14px] my-[-25px]">
                {errors.phone.message}
              </span>
            )}
            <InputContainer
              label="Data de nascimento"
              placeholder="00/00/00"
              type="date"
              register={register("birthDate")}
            />
            {/* {errors.birthDate?.message && (
              <span className="text-feedBack-alert-100 text-[14px] my-[-25px]">
                {errors.birthDate.message}
              </span>
            )} */}
            <InputContainer
              label="Descrição"
              placeholder="Digitar Descrição"
              type="text"
              register={register("description")}
            />
            {errors.description?.message && (
              <span className="text-feedBack-alert-100 text-[14px] my-[-25px]">
                {errors.description.message}
              </span>
            )}
            <p className="font-bold text-[18px]">Informações de endereço</p>
            <InputContainer
              label="CEP"
              placeholder="00000.000"
              type="input"
              register={register("cep")}
              onBlur={checkCEP}
            />
            {errors.cep?.message && (
              <span className="text-feedBack-alert-100 text-[14px] my-[-25px]">
                {errors.cep.message}
              </span>
            )}
            <div className="flex justify-between gap-2 w-full">
              <InputContainer
                label="Estado"
                placeholder="Digitar Estado"
                type="input"
                register={register("state")}
              />
              <InputContainer
                label="Cidade"
                placeholder="Digitar cidade"
                type="input"
                register={register("city")}
              />
            </div>
            {errors.state?.message && (
              <span className="text-feedBack-alert-100 text-[14px] my-[-25px]">
                {errors.state.message}
              </span>
            )}
            {errors.city?.message && (
              <span className="text-feedBack-alert-100 text-[14px] my-[-10px]">
                {errors.city.message}
              </span>
            )}
            <InputContainer
              label="Rua"
              placeholder="Digitar rua"
              type="input"
              register={register("street")}
            />
            {errors.street?.message && (
              <span className="text-feedBack-alert-100 text-[14px] my-[-25px]">
                {errors.street.message}
              </span>
            )}
            <InputContainer
              label="Número da casa"
              placeholder="Digitar número"
              type="input"
              register={register("number")}
            />
            {errors.number?.message && (
              <span className="text-feedBack-alert-100 text-[14px] my-[-25px]">
                {errors.number.message}
              </span>
            )}
            <InputContainer
              label="Complemento"
              placeholder="Ex: apart 307"
              type="input"
              register={register("complement")}
            />
            {errors.complement?.message && (
              <span className="text-feedBack-alert-100 text-[14px] my-[-25px]">
                {errors.complement.message}
              </span>
            )}
            <p className="font-bold text-[18px]">Tipo de conta</p>
            <div className="flex justify-between gap-2 w-full">
              <button
                type="button"
                onClick={() => setActiveButton("buyer")}
                className={`flex
                justify-center
                items-center
                rounded-sm
                font-semibold
                h-[44px]
                w-1/2
                border-[1px]
                border-gray-500
              ${
                activeButton === "buyer"
                  ? `bg-brand-100 text-white border-none`
                  : `bg-white text-black`
              }`}
              >
                Comprador
              </button>
              <button
                type="button"
                onClick={() => setActiveButton("seller")}
                className={`flex
                justify-center
                items-center
                rounded-sm
                font-semibold
                h-[44px]
                w-1/2
                border-[1px]
                border-gray-500
              ${
                activeButton === "seller"
                  ? `bg-brand-100 text-white border-none`
                  : `bg-white text-black`
              }`}
              >
                Anunciante
              </button>
            </div>
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
            <InputContainer
              label="Confirmar Senha"
              placeholder="Confirmar senha"
              type="password"
              register={register("confirmPassword")}
            />
            {errors.confirmPassword?.message && (
              <span className="text-feedBack-alert-100 text-[14px] my-[-25px]">
                {errors.confirmPassword.message}
              </span>
            )}
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
              Finalizar cadastro
            </button>
          </FormComponent>
        </div>
        <Footer />
      </main>
    </>
  );
};

export default Register;
