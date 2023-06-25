import { iPaginatedAnnouncementResults } from "@/app/dashboard/page";
import { iAnnouncement } from "@/app/profile/page";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useAnnouncementContext } from "@/app/contexts/announcement";

export const KmAndPriceContainer = ({ title }: any) => {
  return (
    <div className="flex flex-col gap-2 font-semibold">
      <h2 className="text-typography-20">{title}</h2>
      <div className="w-full flex gap-2">
        <button className="bg-gray-500 text-gray-300 px-5 py-1">Mínima</button>
        <button className="bg-gray-500 text-gray-300 px-5 py-1">Máxima</button>
      </div>
    </div>
  );
};
interface iFilterProps {
  title: string;
  key: number;
}

export const FilterContainer = ({ title, key }: iFilterProps) => {
  const router = useRouter();
  const { setQueryParamsString, isLoading, filterOptions } =
    useAnnouncementContext();

  const FilterOption = ({ option, context }: any) => {
    let pathname = usePathname();
    let searchParams: any = useSearchParams();
    const createQueryString = useCallback(
      (name: string, value: string) => {
        const params = new URLSearchParams(searchParams);
        params.set(name, value);
        setQueryParamsString(params.toString());
        return params.toString();
      },
      [searchParams]
    );

    const handleChange = (e: any) => {
      if (context === "fuelType") {
        let newFuel;
        option == "Gasolina"
          ? (newFuel = "1")
          : option == "Etanol"
          ? (newFuel = "2")
          : (newFuel = "3");
        e.target.value &&
          router.push(pathname + "?" + createQueryString(context, newFuel));
      } else {
        e.target.value &&
          router.push(pathname + "?" + createQueryString(context, option));
      }
    };
    return (
      <div className="flex items-center gap-1">
        <input
          onChange={(e) => handleChange(e)}
          className="cursor-pointer"
          type="checkbox"
        />
        <label className="whitespace-nowrap overflow-hidden text-ellipsis">
          {option}
        </label>
      </div>
    );
  };

  let brandOptions = [
    "General Motors",
    "Fiat",
    "Honda",
    "Porsche",
    "Volswagen",
  ];
  let brands: any = [];
  // if (announcementResults) {
  //   announcementResults.forEach((elem) => {
  //     if (!brands.includes(elem.brand)) {
  //       brands.push(elem.brand);
  //     }
  //   });
  // }
  const modelOptions = [
    "Civic",
    "Corolla",
    "Cruze",
    "Fit",
    "Gol",
    "Ka",
    "Onix",
    "Porsche 718",
  ];
  let models: any = [];
  // if (announcementResults) {
  //   announcementResults.forEach((elem) => {
  //     if (!models.includes(elem.model)) {
  //       models.push(elem.model);
  //     }
  //   });
  // }
  const colorOptions = ["Azul", "Branco", "Cinza", "Prata", "Preto", "Verde"];
  let colors: any = [];
  // if (announcementResults) {
  //   announcementResults.forEach((elem) => {
  //     if (!colors.includes(elem.color)) {
  //       colors.push(elem.color);
  //     }
  //   });
  // }

  const yearOptions = [
    "2023",
    "2022",
    "2021",
    "2020",
    "2019",
    "2018",
    "2017",
    "2016",
    "2015",
    "2014",
    "2013",
    "2012",
    "2011",
    "2010",
    "2009",
    "2008",
    "2007",
  ];

  let years: any = [];
  // if (announcementResults) {
  //   announcementResults.forEach((elem) => {
  //     if (!years.includes(elem.year)) {
  //       years.push(elem.year);
  //     }
  //   });
  // }
  const fuelOptions = ["Gasolina", "Etanol", "Flex"];
  return (
    <>
      {console.log(filterOptions)}
      {!isLoading && (
        <div className="flex flex-col">
          <h2 className="font-semibold text-typography-20">{title}</h2>
          <div className="flex flex-col font-semibold text-slate-500">
            {title === "Marca" &&
              brands.map((elem: any, index: any) => {
                return (
                  <FilterOption context={"brand"} key={index} option={elem} />
                );
              })}
            {title === "Modelo" &&
              models.map((elem: any, index: any) => {
                return (
                  <FilterOption context={"model"} key={index} option={elem} />
                );
              })}
            {title === "Cor" &&
              colors.map((elem: any, index: any) => {
                return (
                  <FilterOption context={"color"} key={index} option={elem} />
                );
              })}
            {title === "Ano" &&
              years.map((elem: any, index: any) => {
                return (
                  <FilterOption context={"year"} key={index} option={elem} />
                );
              })}
            {title === "Combustível" &&
              fuelOptions.map((elem: any, index: any) => {
                return (
                  <FilterOption
                    context={"fuelType"}
                    key={index}
                    option={elem}
                  />
                );
              })}
          </div>
        </div>
      )}
    </>
  );
};
