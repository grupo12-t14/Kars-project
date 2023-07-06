import { yupResolver } from "@hookform/resolvers/yup";
import { Modal } from "./Modal/modal";
import { SubmitHandler, useForm } from "react-hook-form";
import { ediInfoUserSchema } from "@/schemas/editUserSchema";
import { IFormUpdateInfoUser } from "@/types/types";
import { ReactNode, useContext, useState } from "react";
import { UserContext } from "@/contexts/contexts";

interface ModalEditAddresProps {
  toggleModal: () => void;
}

export const ModalEditInfoUser = ({ toggleModal }: ModalEditAddresProps) => {
  const [modalDeleteMessage, setModalDeleteMessage] = useState(false);

  const toggleModalDelete = () => {
    setModalDeleteMessage(!modalDeleteMessage);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IFormUpdateInfoUser | any>({
    resolver: yupResolver(ediInfoUserSchema),
  });

  const { updateInfoUser, deleteUser }: any = useContext(UserContext);
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

  const [date, setDate] = useState("");
  const handleBirthDateChange = (event: any) => {
    let value = event.target.value;
    value = value.replace(/\D/g, "");
    setDate(formatBirthDate(value));
  };
  
  const formatBirthDate = (birthDate: string) => {
    birthDate = birthDate.replace(/(\d{2})(\d)/, "$1/$2");
    birthDate = birthDate.replace(/(\d{2})(\d)/, "$1/$2");
    birthDate = birthDate.replace(/(\d{4})(\d{1,2})$/, "$1-$2");
    return birthDate;
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

  const submit: SubmitHandler<IFormUpdateInfoUser> = async (formData) => {
    await updateInfoUser(formData);
    reset();
  };

  const confirmDeleteProfile = async () => {
    await deleteUser();
    toggleModalDelete();
  };

  return (
    <>
      <Modal toggleModal={toggleModal}>
        <div>
          <div className="flex justify-between">
            <h2>Editar Perfil</h2>
            <button onClick={toggleModal}>X</button>
          </div>
          <h4 className="mt-5">Informações pessoais</h4>
          <form
            onSubmit={handleSubmit(submit)}
            className="flex flex-col gap-5 mt-6"
          >
            <fieldset className="flex flex-col gap-1">
              <label>Nome</label>
              <input
                type="text"
                placeholder="Ex: Samuel Leão"
                className="h-[48px] rounded border-gray-300 border-[2px]"
                {...register("name")}
              />
              {errors.name?.message && (
                <span className="text-red-500">
                  {errors.name.message as ReactNode}
                </span>
              )}
            </fieldset>
            <fieldset className="flex flex-col w-full gap-1">
              <label>Email</label>
              <input
                type="text"
                placeholder="Ex: samuel@kenzie.com"
                className="h-[48px] rounded w-full border-gray-300 border-[2px]"
                {...register("email")}
              />
              {errors.email && (
                <span className="text-red-500">
                  {errors.email.message as ReactNode}
                </span>
              )}
            </fieldset>
            <fieldset className="flex flex-col w-full gap-1">
              <label>CPF</label>
              <input
                type="text"
                placeholder="000.000.000-00"
                className="h-[48px] rounded w-full border-gray-300 border-[2px]"
                maxLength={14}
                value={cpf}
                onInput={handleCpfChange}
                {...register("cpf")}
              />
              {errors.cpf && (
                <span className="text-red-500">
                  {errors.cpf.message as ReactNode}
                </span>
              )}
            </fieldset>
            <fieldset className="flex flex-col gap-1">
              <label>Celular</label>
              <input
                type="text"
                placeholder="(DDD) 90000-0000"
                value={phoneNumber}
                onInput={handlePhoneChange}
                className="h-[48px] rounded border-gray-300 border-[2px]"
                {...register("phone")}
              />
              {errors.phone && (
                <span className="text-red-500">
                  {errors.phone.message as ReactNode}
                </span>
              )}
            </fieldset>
            <fieldset className="flex flex-col w-full gap-1">
              <label>Data de nascimento</label>
              <input
                placeholder="00/00/0000"
                type="text"
                max={10}
                value={date}
                className="h-[48px] rounded w-full border-gray-300 border-[2px]"
                onInput={handleBirthDateChange}
                {...register("birthDate")}
              />
              {errors.birthDate && (
                <span className="text-red-500">
                  {errors.birthDate.message as ReactNode}
                </span>
              )}
            </fieldset>
            <div className="w-full flex justify-center gap-[10px] md:justify-end">
              <button
                className="bg-gray-600 text-gray-200 p-[15px] text-center align-middle rounded"
                onClick={toggleModal}
              >
                Cancelar
              </button>
              <button
                className="bg-red-200 text-red-700 hover:bg-red-500 md:text-gray-700 p-[8px]  rounded"
                onClick={toggleModalDelete}
              >
                Excluir Perfil
              </button>
              <button
                className="bg-brand-100 text-gray-700 hover:bg-brand-300 p-[15px] rounded"
                type="submit"
              >
                Salvar alterações
              </button>
            </div>
          </form>
        </div>
      </Modal>
      {modalDeleteMessage && (
        <Modal toggleModal={toggleModalDelete}>
          <div>
            <h2>Excluir Perfil</h2>
            <p>Tem certeza que deseja excluir o perfil?</p>
            <div className="flex justify-center gap-5 mt-6">
              <button
                className="bg-gray-600 text-gray-200 p-[15px] text-center align-middle rounded"
                onClick={toggleModalDelete}
              >
                Cancelar
              </button>
              <button
                onClick={confirmDeleteProfile}
                className="bg-red-200 text-red-700 hover:bg-red-500 md:text-gray-700 p-[8px]  rounded"
              >
                Confirmar
              </button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};
