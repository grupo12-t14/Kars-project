import Image from "next/image";
import carro from "../../assets/car.webp";
import { iAnnouncement } from "../../app/profile/page";
import { Dispatch, SetStateAction, useContext, useState } from "react";
import { UserContext } from "@/contexts/contexts";
import jwt from "jsonwebtoken";

interface iAnnouncementCardProps {
  element: any;
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
  const { router }: any = useContext(UserContext);
  const { token }: any = useContext(UserContext);
  const decodedToken: any = jwt.decode(token);
  const [auxImgSrc, setAuxImgSrc] = useState("");
  let check;
  if (token) {
    check = decodedToken.sub === params;
  }
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

      <img
        className="bg-gray-500"
        onError={(e) => {
          e.currentTarget.src =
            "https://images.cars.com/cldstatic/wp-content/uploads/1673941437-1425510881103.jpeg";
        }}
        src={element.coverImage}
        alt="coverImg"
      />
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
          <button
            onClick={() => router.push(`/details/${element.id}`)}
            className="border-[2px] rounded-md h-fit w-[120px] p-1"
          >
            Ver detalhes
          </button>
        </div>
      )}
    </li>
  );
};
