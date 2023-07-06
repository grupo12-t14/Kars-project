"use client";
import Image from "next/image";
import carro from "../assets/car.webp";
import Link from "next/link";
import { useState } from "react";
import { useContext } from "react";
import { UserContext } from "@/contexts/contexts";

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
  const { router }: any = useContext(UserContext);
  const ProductCard = ({ announcement }: { announcement: any }) => {
    const [customHref, setCustomHref] = useState(
      `profile/${announcement.user.id}`
    );
    const sellValueNumber = parseInt(announcement.sellPrice);
    const fipeValueNumber = parseInt(announcement.fipePrice);
    const isSellProfitable =
      sellValueNumber + fipeValueNumber * 0.05 <= fipeValueNumber;

    return (
      <>
        <div className="min-w-[80%] max-w-[312px] max-sm:text-sm relative cursor-pointer">
          <p
            className={
              isSellProfitable
                ? "bg-random-700 text-sm rounded-sm p-1 w-fit absolute right-1 top-1 text-white"
                : ""
            }
          >
            {isSellProfitable && "$"}
          </p>
          <div
            onClick={() => router.push(`/details/${announcement.id}`)}
            className="hover:border-brand-100 hover:border-2 border-2 border-transparent cursor-pointer"
          >
            <div className="flex object-contain">
              <img
                className="bg-gray-50"
                onError={(e) => {
                  e.currentTarget.src =
                    "https://images.cars.com/cldstatic/wp-content/uploads/1673941437-1425510881103.jpeg";
                }}
                src={announcement.coverImage}
                alt="coverImg"
              />
            </div>
          </div>
          <div className="flex flex-col gap-2 p-3">
            <p
              onClick={() => router.push(`/details/${announcement.id}`)}
              className="font-bold cursor-pointer"
            >
              {announcement.model}
            </p>
            <p
              onClick={() => router.push(`/details/${announcement.id}`)}
              className="truncate ... text-gray-200 text-[12px] cursor-pointer"
            >
              {announcement.description}
            </p>

            <div className="flex place-items-center gap-2">
              <p className="bg-brand-100 text-white h-8 w-8 rounded-full flex place-items-center justify-center">
                {announcement?.user?.name.charAt(0).toUpperCase()}
              </p>

              {
                <Link href={customHref}>
                  <p>{announcement?.user?.name}</p>
                </Link>
              }
            </div>
            <div className="flex items-center gap-3 sm:gap-1 relative text-[12px]">
              <p className="p-1 rounded-md text-brand-100 bg-brand-400 text-[10px]">
                {announcement.mileage} KM
              </p>
              <p className="p-1 rounded-md text-brand-100 bg-brand-400 text-[10px]">
                {announcement.year}
              </p>
              <p className="absolute font-bold right-0">
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
};
export default ProductCard;
