import { useContext, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Modal } from "./Modal/modal";
import axios from "axios";
import { SubmitHandler, useForm } from "react-hook-form";
import { IFormUpdateCep } from "@/types/types";
import { yupResolver } from "@hookform/resolvers/yup";
import { editAddresSchema } from "@/schemas/editAddresSchema";
import { UserContext } from "@/contexts/contexts";

interface ModalEditAddresProps {
  toggleModal: () => void;
}

export const ModalEditAddress = ({ toggleModal }: ModalEditAddresProps) => {
  const [cep, setCep] = useState("");
  const [estado, setEstado] = useState("");
  const [cidade, setCidade] = useState("");
  const [logradouro, setLogradouro] = useState("");

  const { updateCepUser }: any = useContext(UserContext);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset
  } = useForm<IFormUpdateCep | any>({
    resolver: yupResolver(editAddresSchema),
  });

  const handleCepChange = async (cep: string) => {
    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);

      const { logradouro, localidade, uf } = response.data;
      setValue("street", logradouro);
      setValue("city", localidade);
      setValue("state", uf);
    } catch (error) {
      console.log("Erro ao obter informações do CEP:", error);
    }
  };

  useEffect(() => {
    setValue("state", estado);
    setValue("city", cidade);
    setValue("street", logradouro);
  }, [estado, cidade, logradouro, setValue]);

  const submit : SubmitHandler<IFormUpdateCep> = async(formData) => {
    await updateCepUser(formData)
    reset()
  }

  return (
    <>
      <Modal toggleModal={toggleModal}>
        <div>
          <div className="flex justify-between">
            <h2>Editar Endereço</h2>
            <button onClick={toggleModal}>X</button>
          </div>
          <h4 className="mt-5">Informações de endereço</h4>
          <form
            className="flex flex-col gap-5 mt-6"
            onSubmit={handleSubmit(submit)}
          >
            <fieldset className="flex flex-col gap-1">
              <label>CEP</label>
              <input
                {...register("cep")}
                type="text"
                className="h-[48px] rounded w-full border-gray-300 border-[2px]"
                onChange={(e) => handleCepChange(e.target.value)}
              />
              {errors.cep && (
                <span className="text-red-500">{errors.cep.message}</span>
              )}
            </fieldset>
            <div className="flex w-full justify-between">
              <fieldset className="flex flex-col w-[47%] gap-1">
                <label>Estado</label>
                <input
                  type="text"
                  className="h-[48px] rounded w-full border-gray-300 border-[2px]"
                  value={estado}
                  readOnly
                  {...register("state")}
                />
              </fieldset>
              <fieldset className="flex flex-col w-[47%] gap-1">
                <label>Cidade</label>
                <input
                  type="text"
                  className="h-[48px] rounded w-full border-gray-300 border-[2px]"
                  value={cidade}
                  readOnly
                  {...register("city")}
                />
              </fieldset>
            </div>
            <fieldset className="flex flex-col gap-1">
              <label>Rua</label>
              <input
                type="text"
                className="h-[48px] rounded border-gray-300 border-[2px]"
                value={logradouro}
                readOnly
                {...register("street")}
              />
            </fieldset>
            <div className="flex w-full justify-between">
              <fieldset className="flex flex-col w-[47%] gap-1">
                <label>Número</label>
                <input
                  type="text"
                  className="h-[48px] rounded w-full border-gray-300 border-[2px]"
                  {...register("number")}
                />
              </fieldset>
              <fieldset className="flex flex-col w-[47%] gap-1">
                <label>Complemento</label>
                <input
                  type="text"
                  className="h-[48px] rounded w-full border-gray-300 border-[2px]"
                  {...register("complement")}
                />
              </fieldset>
            </div>
            <div className="w-full flex justify-center gap-[10px] md:justify-end">
              <button
                className="bg-gray-600 text-gray-200 p-[15px] text-center align-middle rounded"
                onClick={toggleModal}
              >
                Cancelar
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
    </>
  );
};
