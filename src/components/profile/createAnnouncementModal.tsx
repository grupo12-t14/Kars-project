import { Dispatch, SetStateAction, useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Modal } from "../Modal/modal";
import { carsApi, localApi } from "@/api";
import {
  CreateAnnouncementData,
  createAnnouncementSchema,
} from "../Modal/validation";
import { iAnnouncement, iCarFromApi } from "@/app/profile/page";
import { Input } from "./input";
import Select from "react-select";
import { AxiosResponse } from "axios";
import { boolean } from "zod";

interface CreateAnnouncementProps {
  toggleModal: () => void;
}
interface iInputOptions {
  value: string;
  label: string;
}
interface remainingCompleteCarFields {
  year: string;
  fuel: number;
  fipePrice: number;
}

export const ModalCreateAnnouncement = ({
  toggleModal,
}: CreateAnnouncementProps) => {
  const [selectInputOptions, setSelectInputOptions] = useState<
    iInputOptions[] | []
  >([]);
  const [selectedModel, setSelectedModel] = useState<iInputOptions | null>(
    null
  );
  const [availableCars, setAvailableCars] = useState<iCarFromApi[] | []>([]);
  const [availableCarsFromBrand, setAvailableCarsFromBrand] = useState<
    iCarFromApi[] | []
  >([]);
  const [moneyInputValue, setMoneyInputValue] = useState("");
  const [isSelectedOption, setIsSelectedOption] = useState(false);
  const [selectedBrandName, setSelectedBrandName] = useState("");
  const [isCreationSucceeded, setIsCreationSucceeded] = useState(false);
  const [remainingCompleteCarFields, setRemainingCompleteCarFields] =
    useState<remainingCompleteCarFields>({
      year: "",
      fuel: 3,
      fipePrice: 0,
    });

  const ModalSuccessCreation = ({ toggleModal }: CreateAnnouncementProps) => {
    return (
      <div className="gap-10 overflow-y-hidden h-[180px] flex flex-col">
        {document.body.className == "fixed"}
        <div className="flex w-full justify-between">
          <h2 className="font-semibold">Successo!</h2>
          <button
            onClick={() => {
              toggleModal();
              setIsCreationSucceeded(false);
            }}
            className="text-gray-400 font-semibold"
          >
            X
          </button>
        </div>

        <div className="flex flex-col gap-3">
          <h2 className="font-semibold">Seu anúncio foi criado com sucesso!</h2>
          <span>
            Agora você poderá ver seus negócios crescendo em grande escala.
          </span>
        </div>
      </div>
    );
  };
  const availableBrands = Object.keys(availableCars);
  const handleChange = async (selectedCar: iInputOptions | null) => {
    setSelectedModel(selectedCar);

    const findCar = availableCarsFromBrand.filter((e) => {
      return e.name == selectedCar?.value;
    })[0];
    setRemainingCompleteCarFields({
      year: findCar.year,
      fuel: findCar.fuel,
      fipePrice: findCar.value,
    });

    setTimeout(() => {
      setValue("year", findCar.year);
      setValue("fipePrice", findCar.value);
      setValue("fuelType", findCar.fuel);
      setValue("model", findCar!.name);
    }, 650);
  };

  const fetchCarsData = async () => {
    try {
      const response = await carsApi.get("");
      setAvailableCars(response.data);
    } catch (err) {
      console.error(err);
    } finally {
    }
  };
  useEffect(() => {
    fetchCarsData();
  }, []);
  const searchCarsFromSelectedBrand = async (selectedBrand: string) => {
    try {
      if (!selectedBrand) {
        setIsSelectedOption(false);
        setSelectInputOptions([
          {
            value: "",
            label: "",
          },
        ]);
        return;
      }
      setSelectedBrandName(selectedBrand);
      setIsSelectedOption(true);
      const response: AxiosResponse = await carsApi.get(``, {
        params: { brand: selectedBrand },
      });
      setAvailableCarsFromBrand(response.data);
      const data: iCarFromApi[] = response.data;
      setSelectInputOptions(
        data.map((e) => {
          return {
            value: e.name,
            label: e.name.charAt(0).toUpperCase() + e.name.slice(1),
          };
        })
      );
    } catch (err) {
      console.error(err);
    } finally {
    }
  };

  const handleMoneyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue = event.target.value;
    inputValue = inputValue.replace(/\D/g, "");
    inputValue = inputValue.replace(/(\d)(\d{2})$/, "$1,$2");
    inputValue = "R$ " + inputValue.replace(/(?=(\d{3})+(\D))\B/g, ".");
    event.currentTarget.value = inputValue;
    return event;
  };
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    control,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(createAnnouncementSchema),
  });

  const createAnnouncement = async (data: CreateAnnouncementData) => {
    const response = await localApi.post<iAnnouncement>("/announcements", {
      ...data,
      sellPrice: +data.sellPrice!,
    });
    setTimeout(() => {
      setIsCreationSucceeded(true);
    }, 500);
  };
  return (
    <Modal toggleModal={toggleModal}>
      {isCreationSucceeded ? (
        <ModalSuccessCreation toggleModal={toggleModal} />
      ) : (
        <>
          {" "}
          <div className="flex w-full  justify-between ">
            <h2 className="font-semibold text-gray-0">Criar anúncio</h2>
            <button
              onClick={() => {
                toggleModal();
              }}
              className="text-gray-400 font-semibold"
            >
              X
            </button>
          </div>
          <form
            className="pt-4 flex flex-col gap-4 md:max-w-[450px]"
            onSubmit={handleSubmit(createAnnouncement)}
          >
            <label htmlFor="">Marca</label>
            <select
              className="border-[1px] border-gray-300/40 rounded-md h-10"
              id=""
              {...register("brand")}
              onChange={(e) => {
                e.currentTarget.value &&
                  searchCarsFromSelectedBrand(
                    availableBrands[e.target.selectedIndex - 1]
                  );
              }}
            >
              <option
                value="
"
              >
                Selecione uma opção...{" "}
              </option>
              {availableBrands.map((e, i) => (
                <>
                  <option value={e} key={i}>
                    {e.charAt(0).toUpperCase() + e.slice(1)}
                  </option>
                </>
              ))}
            </select>
            <label htmlFor="">Modelo</label>
            <Controller
              name="model"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Select
                  isDisabled={!isSelectedOption}
                  placeholder=""
                  noOptionsMessage={({ inputValue }: { inputValue: string }) =>
                    `Sem opções disponíveis.`
                  }
                  {...register("model")}
                  value={selectedModel}
                  onChange={handleChange}
                  options={selectInputOptions}
                />
              )}
            />
            <div className="flex gap-6">
              <Input
                label="Ano"
                disabled={true}
                placeholder="YYYY"
                register={register("year")}
              />
              <input type="text" className="hidden" {...register("fuelType")} />
              <Input
                value={
                  remainingCompleteCarFields.fuel == 1
                    ? "Gasolina"
                    : remainingCompleteCarFields.fuel == 2
                    ? "Etanol"
                    : "Gasolina / Etanol"
                }
                label="Combustível"
                aria-disabled
                disabled={true}
              />
            </div>
            <div className="flex gap-6">
              <Input
                label="Quilometragem"
                maxLength={7}
                placeholder="KM"
                register={register("mileage")}
              />

              <Input
                label="Cor"
                maxLength={15}
                placeholder="Insira a Cor..."
                register={register("color")}
              />
            </div>
            <div className="flex justify-between gap-12">
              <Input
                disabled={true}
                label="Preço tabela FIPE"
                value={`R$ ${remainingCompleteCarFields.fipePrice.toLocaleString(
                  "pt-br",
                  {
                    minimumFractionDigits: 2,
                  }
                )}`}
                placeholder="R$"
                register={register("fipePrice")}
              />
              <Input
                label="Preço"
                placeholder="R$"
                maxLength={8}
                register={register("sellPrice")}
                onChange={(e) => handleMoneyChange(e)}
              />
            </div>
            <label htmlFor="description">Descrição</label>
            <textarea
              className="p-2"
              {...register("description")}
              id=""
              placeholder="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s..."
            ></textarea>
            <Input
              label="Imagem da capa"
              placeholder="https://image.com"
              register={register("coverImage")}
            />
            <Input
              label="Imagem da galeria 1"
              placeholder="https://image.com"
              register={register("coverImage")}
            />
            <Input
              label="Imagem da galeria 2"
              placeholder="https://image.com"
              register={register("coverImage")}
            />
            <div className="flex justify-end w-full mr-0">
              <span
                onClick={() => {
                  toggleModal();
                }}
                className="cursor-pointer bg-gray-800 rounded-sm p-1 px-8 "
              >
                Cancelar
              </span>
              <button
                disabled={!isValid}
                className="bg-brand-300 p-1 px-8 rounded-sm enabled:opacity-1 disabled:opacity-50 cursor-pointer"
                type="submit"
              >
                Criar Anúncio
              </button>
            </div>
          </form>
        </>
      )}
    </Modal>
  );
};
