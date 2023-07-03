import Image from "next/image";
import carro from "../../assets/car.webp";
import { iAnnouncement } from "../../app/profile/page";
import { Dispatch, SetStateAction, useContext } from "react";
import { UserContext } from "@/contexts/contexts";
import jwt from "jsonwebtoken";
const VisitorUser = {
  id: "12",
  name: "",
  accountType: "",
};

const OwnerUser = {
  id: "12",
  name: "",
  accountType: "",
};
interface iAnnouncementCardProps {
  element: iAnnouncement;
  params: string;
  setEditModalOpen: Dispatch<SetStateAction<boolean>> | undefined;
  setAnnouncementId: Dispatch<SetStateAction<string>> | undefined;
}

export const AnnouncementCard = ({
  element,
  params,
  setEditModalOpen,
  setAnnouncementId,
}: iAnnouncementCardProps): JSX.Element => {
  console.log(params);
  const { token }: any = useContext(UserContext);
  const decodedToken: any = jwt.decode(token);
  let check;
  if (token) {
    check = decodedToken.sub === params;
  }
  // const check = OwnerUser.id === VisitorUser.id;
  const sellValueNumber: number = parseInt(element.sellPrice);
  return (
    <li className="flex flex-col gap-3 max-w-[250px] relative flex-shrink-0 ">
      {check && (
        <p
          className={
            element.isActive
              ? "bg-brand-100 text-sm text-white rounded-md w-fit absolute left-2 top-2 p-1"
              : "bg-gray-400 text-sm text-white rounded-md w-fit p-1 absolute left-2 top-2"
          }
        >
          {element.isActive ? "Ativo" : "Inativo"}
        </p>
      )}

      <Image
        className="object-cover"
        src={carro}
        alt="AnnouncementImage"
      ></Image>
      <p className="font-bold">
        {element.brand} - {element.model}
      </p>
      <span className="truncate">{element.description}</span>
      <div className="flex w-full justify-between place-items-center">
        <span className="text-brand-100 flex place-items-center gap-2 font-semibold">
          <span className="bg-brand-400 h-fit p-1 rounded-md">
            {element.mileage} KM
          </span>
          <span className="bg-brand-400 h-fit p-1 rounded-md">
            {element.year}
          </span>
        </span>
        <span className="font-bold">
          R$
          {` ${sellValueNumber.toLocaleString("pt-br", {
            minimumFractionDigits: 2,
          })}`}
        </span>
      </div>
      {check && (
        <div className="mt-2 flex gap-3">
          <button
            onClick={() => {
              setAnnouncementId!(element.id);
              setEditModalOpen!(true);
            }}
            className="border-[2px] rounded-md h-fit p-1 px-2"
          >
            Editar
          </button>
          <button className="border-[2px] rounded-md h-fit w-[120px] p-1">
            Ver detalhes
          </button>
        </div>
      )}
    </li>
  );
};
