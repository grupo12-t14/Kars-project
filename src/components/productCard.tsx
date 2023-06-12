"use client";
import Image from "next/image";

interface iProduct {
  id: string;
  brand: string;
  model: string;
  year: string;
  fuelType: number;
  mileage: string;
  color: string;
  fipePrice: string;
  sellPrice: string;
  isActive: boolean;
  description: string;
  coverImage: string;
}
const ProductCard = ({ announcement }: { announcement: iProduct }) => {
  const sellValueNumber = parseInt(announcement.sellPrice);
  const fipeValueNumber = parseInt(announcement.fipePrice);
  const isSellProfitable =
    sellValueNumber + fipeValueNumber * 0.05 <= fipeValueNumber;
  return (
    <>
      <div className="max-w-[312px] max-md:w-5/6 max-sm:text-sm relative">
        <p
          className={
            announcement.isActive
              ? "bg-brand-100 text-sm text-white w-fit absolute left-2 top-2 p-1"
              : "bg-gray-400 text-white text-sm w-fit p-1 absolute left-2 top-2"
          }
        >
          {announcement.isActive ? "Ativo" : "Inativo"}
        </p>
        <p
          className={
            isSellProfitable
              ? "bg-random-700 text-sm rounded-sm p-1 w-fit absolute right-1 top-1 text-white"
              : ""
          }
        >
          {isSellProfitable && "$"}
        </p>
        <div className="hover:border-brand-100 hover:border-2 border-2 border-transparent mb-5">
          <Image className="bg-gray-500" src="" alt="coverImage" />
        </div>
        <div className="flex flex-col gap-2 ">
          <p className="font-semibold">{announcement.model}</p>
          <p className="truncate ...">{announcement.description}</p>
          <div className="flex place-items-center gap-2">
            <p className="bg-brand-100 text-white h-8 w-8 rounded-full flex place-items-center justify-center">
              U
            </p>
            <p>Usuário</p>
          </div>
          <div className="flex gap-3 relative">
            <p className="p-1 rounded-md text-brand-100 bg-brand-400">
              {announcement.mileage} KM
            </p>
            <p className="p-1 rounded-md text-brand-100 bg-brand-400">
              {announcement.year}
            </p>
            <p className="absolute font-semibold right-0">
              R${" "}
              {sellValueNumber.toLocaleString("pt-br", {
                minimumFractionDigits: 2,
              })}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
