import React, {
  ChangeEventHandler,
  useCallback,
  useEffect,
  useState,
} from "react";
import { Modal } from "../Modal/modal";
import { useAnnouncementContext } from "@/app/contexts/announcement";
import { LoadingSpinner } from "@/app/dashboard/page";
import { iAnnouncement } from "@/app/profile/page";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  UpdatableAnnouncementData,
  updatableAnnouncementSchema,
} from "../Modal/validation";
import { handleMoneyChange } from "./createAnnouncementModal";
import { useRouter } from "next/navigation";

interface EditAnnouncementProps {
  toggleModal: () => void;
  announcementId: string;
}

const EditAnnouncementModalForm = ({
  announcement,
  toggleModal,
}: {
  announcement: iAnnouncement | null;
  toggleModal: () => void;
}) => {
  const router = useRouter();

  const [isActiveOption, setIsActiveOption] = useState(announcement?.isActive);
  const [mileageValue, setMileageValue] = useState(announcement?.mileage);
  const [sellPriceValue, setSellPriceValue] = useState(announcement?.sellPrice);
  const [isDeletionModalOpen, setIsDeletionModalOpen] = useState(false);
  const {
    isLoading,
    deleteAnnouncementById,
    isAnnouncementDeleted,
    setIsAnnouncementDeleted,
    updateAnnouncementRequest,
  } = useAnnouncementContext();

  const DeletionModal = () => {
    const handleDelete = async () => {
      const deletion = await deleteAnnouncementById(announcement?.id!);
    };
    return (
      <div className="p-4 gap-4 flex flex-col">
        {isAnnouncementDeleted ? (
          <>
            <div>Anúncio excluído com sucesso!</div>
          </>
        ) : (
          <>
            {" "}
            <h1>
              <span className="font-bold">
                {" "}
                Tem certeza que deseja remover este anúncio?
              </span>
              <br />
              <br />
              <span>
                Essa ação não pode ser desfeita. Isso excluirá permanentemente
                sua conta e removerá seus dados de nossos servidores.
              </span>
            </h1>
            <div className="flex w-full gap-3 justify-end">
              {" "}
              <button
                onClick={() => {
                  setIsDeletionModalOpen(false);
                }}
                className=""
              >
                Cancelar
              </button>
              <button
                onClick={() => handleDelete()}
                className="text-feedBack-alert-100 font-semibold p-2 px-3 rounded-md"
              >
                Sim, excluir anúncio
              </button>
            </div>
          </>
        )}
      </div>
    );
  };
  const handleFuel = (value: number) => {
    return announcement?.fuelType == 1
      ? "Gasolina"
      : announcement?.fuelType == 2
      ? "Etanol"
      : "Gasolina / Etanol";
  };

  const formatText = (value: string) =>
    value?.charAt(0).toUpperCase() + value?.slice(1);
  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setIsActiveOption(event.target.value === "active");
  const handleCurrency = (value: number): string => {
    const newValue = value.toLocaleString("pt-br", {
      minimumFractionDigits: 2,
    });
    return `R$ ` + newValue;
  };
  const onSubmit = async (data: UpdatableAnnouncementData) => {
    updateAnnouncementRequest(announcement?.id!, data);
    setTimeout(() => {
      window.location.reload();
    }, 1500);
  };

  const parsedAnnouncement = updatableAnnouncementSchema
    .noUnknown()
    .cast({ ...announcement });
  const defaultValues = parsedAnnouncement;
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { isValid },
  } = useForm({
    defaultValues,
    resolver: yupResolver(updatableAnnouncementSchema),
  });

  return !isDeletionModalOpen ? (
    <form
      className="pt-4 flex flex-col gap-2 md:max-w-[450px]"
      onSubmit={handleSubmit(onSubmit)}
    >
      <label htmlFor="Marca">Marca</label>
      <input
        defaultValue={formatText(announcement?.brand!)}
        className="border-gray-700 bg-gray-300/50 w-full pl-2 border-[2px] rounded-md h-8"
        type="text"
        disabled
      />
      <label htmlFor="Modelo">Modelo</label>
      <input
        className="border-gray-700 bg-gray-300/50 w-full pl-2 border-[2px] rounded-md h-8"
        defaultValue={formatText(announcement?.model!)}
        type="text"
        disabled
      />
      <div className="flex gap-6 w-full max-w-[75%] justify-between">
        <div className="flex gap-1 flex-col">
          <label className="w-fit" htmlFor="Ano">
            Ano
          </label>
          <input
            type="text"
            defaultValue={announcement?.year}
            disabled
            className="border-gray-700 bg-gray-300/50 max-w-[150px] pl-2 border-[2px] rounded-md h-8"
          />
        </div>
        <div className="flex gap-1 flex-col">
          {" "}
          <label htmlFor="Combustível">Combustível</label>
          <input
            className="border-gray-700 bg-gray-300/50 max-w-[150px] pl-2 border-[2px] rounded-md h-8"
            disabled
            defaultValue={handleFuel(announcement?.fuelType!)}
            type="text"
          />
        </div>
      </div>

      <div className="flex gap-6 w-full max-w-[75%] justify-between">
        <div className="flex gap-1  flex-col">
          <label className="w-fit" htmlFor="Quilometragem">
            Quilometragem
          </label>
          <input
            type="text"
            {...register("mileage")}
            maxLength={6}
            className="border-gray-500 max-w-[150px] pl-2 border-[2px] rounded-md h-8"
          />
        </div>
        <div className="flex gap-1  flex-col">
          {" "}
          <label htmlFor="Cor">Cor</label>
          <input
            className="border-gray-700 bg-gray-300/50 max-w-[150px] pl-2 border-[2px] rounded-md h-8"
            disabled
            defaultValue={formatText(announcement?.color!)}
            type="text"
          />
        </div>
      </div>

      <div className="flex gap-6 w-full max-w-[75%] justify-between">
        <div className="flex gap-1  flex-col">
          <label className="w-fit" htmlFor="PreçoFIPE">
            Preço tabela FIPE
          </label>
          <input
            type="text"
            defaultValue={handleCurrency(parseInt(announcement?.fipePrice!))}
            disabled
            className="border-gray-700 bg-gray-300/50 max-w-[150px] pl-2 border-[2px] rounded-md h-8"
          />
        </div>
        <div className="flex gap-1  flex-col">
          {" "}
          <label htmlFor="Preço de Venda">Preço</label>
          <input
            type="text"
            maxLength={13}
            className="border-gray-500 max-w-[150px] pl-2 border-[2px] rounded-md h-8"
            {...register("sellPrice")}
            onChange={(e) => {
              handleMoneyChange(e);
            }}
            placeholder="R$ 0,00"
          />
        </div>
      </div>
      <label className="mt-1" htmlFor="description">
        Descrição
      </label>
      <textarea
        className="p-2 border-[1px] border-gray-500 rounded-md"
        {...register("description")}
        id=""
        placeholder="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s..."
      ></textarea>
      <label className="font-semibold mb-2" htmlFor="isActive">
        Publicado
      </label>

      <div className="h-fit flex gap-3 w-full">
        <label
          className={`px-4 flex place-content-center w-1/2  cursor-pointer py-2 rounded-sm ${
            isActiveOption
              ? "text-white bg-brand-100 rounded-sm"
              : "py-1 rounded-sm border-[1px] border-gray-500"
          }`}
          onClick={() => {
            setValue("isActive", true);
          }}
        >
          <input
            type="radio"
            value="active"
            checked={isActiveOption}
            onChange={handleRadioChange}
            className="sr-only"
          />
          Sim
        </label>
        <label
          className={`px-4 flex place-content-center w-1/2  cursor-pointer py-2 rounded-md ${
            !isActiveOption
              ? "text-white bg-brand-100 rounded-sm"
              : " py-1 rounded-sm border-[1px] border-gray-500"
          }`}
          onClick={() => {
            setValue("isActive", false);
          }}
        >
          <input
            type="radio"
            value="inactive"
            checked={!isActiveOption}
            onChange={handleRadioChange}
            className="sr-only"
          />
          Não
        </label>
      </div>
      <label className="font-bold mt-3" htmlFor="Imagem da capa">
        Imagem da capa
      </label>
      <input
        className="border-gray-500 pl-2 border-[2px] rounded-md w-full h-8"
        placeholder="https://image.com"
        {...register("coverImage")}
      />
      <div className="flex mt-4 w-full gap-2 justify-between">
        {" "}
        <button
          onClick={() => setIsDeletionModalOpen(true)}
          className="w-1/2 py-2"
        >
          Excluir anúncio
        </button>
        <button
          type="submit"
          disabled={!isValid}
          className="w-1/2 py-2 rounded-sm bg-brand-200 disabled:bg-brand-100/50 text-white"
        >
          Salvar alterações
        </button>
      </div>
    </form>
  ) : (
    <DeletionModal />
  );
};

export const EditAndExcludeAnnouncementModal = ({
  toggleModal,
  announcementId,
}: EditAnnouncementProps) => {
  const {
    retrieveAnnouncementById,
    isLoading,
    retrievedAnnouncement,
    isAnnouncementDeleted,
    setIsAnnouncementDeleted,
  } = useAnnouncementContext();

  useEffect(() => {
    isAnnouncementDeleted && console.log(`foi`);
  }, [isAnnouncementDeleted]);
  useEffect(() => {
    retrieveAnnouncementById(announcementId);
  }, []);
  return (
    <Modal toggleModal={toggleModal}>
      {isAnnouncementDeleted ? (
        <>
          <div className="p-6">Anúncio excluído com sucesso!</div>
        </>
      ) : (
        <div className="">
          <div className="relative flex">
            <h2>Editar Anúncio</h2>
            <button
              onClick={() => toggleModal()}
              className="absolute right-0 top-1"
            >
              X
            </button>
          </div>
          {!isLoading ? (
            <EditAnnouncementModalForm
              toggleModal={toggleModal}
              announcement={retrievedAnnouncement}
            />
          ) : (
            <LoadingSpinner />
          )}
        </div>
      )}
    </Modal>
  );
};
