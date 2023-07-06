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

  const submit: SubmitHandler<IFormUpdateInfoUser> = async (formData) => {
    await updateInfoUser(formData);
    reset();
  };

  const handleDeleteProfile = () => {
    deleteUser();
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
                className="h-[48px] rounded w-full border-gray-300 border-[2px]"
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
                type="text"
                className="h-[48px] rounded w-full border-gray-300 border-[2px]"
                {...register("birthDate")}
              />
              {errors.birthDate && (
                <span className="text-red-500">Deve ser uma data válida.</span>
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
                className="bg-red-200 text-red-700 hover:bg-red-500 md:text-gray-700 p-[8px]  rounded"
                onClick={handleDeleteProfile}
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
