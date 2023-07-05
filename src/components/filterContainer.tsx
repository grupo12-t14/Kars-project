import { ChangeEvent, useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  iFilterOptions,
  useAnnouncementContext,
} from "@/app/contexts/announcement";

export const KmAndPriceContainer = ({ title }: any) => {
  const handleInputChange = () => {};
  return (
    <div className="flex flex-col gap-2 font-semibold">
      <h2 className="text-typography-20">{title}</h2>
      <div className="flex">
        <div className="flex flex-col">
          <label htmlFor="MileageRange">Min</label>
          <input
            onChange={(e) => {
              handleInputChange();
            }}
            type="text"
            pattern="\d*"
            maxLength={6}
            className="bg-gray-500 text-gray-300 pl-2 py-1 w-[90%]"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="PriceRange">Max</label>
          <input
            onChange={(e) => {
              handleInputChange();
            }}
            type="text"
            pattern="\d*"
            maxLength={6}
            className="bg-gray-500 text-gray-300 pl-2 py-1 w-[90%]"
          />
        </div>
      </div>
    </div>
  );
};
interface iFilterProps {
  title: string;
  key: number;
}
export const FilterContainer = ({ title }: iFilterProps) => {
  const { filterOptions } =
    useAnnouncementContext();
  const options = filterOptions as iFilterOptions;

  const FilterOption = ({ option, context }: any) => {
    const { setQueryParamsString } =
      useAnnouncementContext();
    let pathname = usePathname();
    let searchParams: any = useSearchParams();
    const router = useRouter();

    const createQueryString = useCallback(
      (name: string, value: string) => {
        const params = new URLSearchParams(searchParams);
        params.set(name, value);
        setQueryParamsString(params.toString());
        return params.toString();
      },
      [searchParams, setQueryParamsString]
    );

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      if (context === "fuelType") {
        let newFuel;
        option == "Gasolina"
          ? (newFuel = "1")
          : option == "Etanol"
          ? (newFuel = "2")
          : (newFuel = "3");
        router.push(pathname + "?" + createQueryString(context, newFuel));
      } else {
        router.push(pathname + "?" + createQueryString(context, option));
      }
      return e.target.checked;
    };
    return (
      <div className="flex items-center gap-1">
        <input
          onChange={(e) => {
            const isChecked = handleChange(e);
            e.target.checked = isChecked;
          }}
          className="cursor-pointer"
          type="checkbox"
        />
        <label className="whitespace-nowrap overflow-hidden text-ellipsis">
          {option}
        </label>
      </div>
    );
  };
  const fuelOptions = ["Gasolina", "Etanol", "Flex"];
  return (
    <>
      <div className="flex flex-col">
        <h2 className="font-semibold text-typography-20">{title}</h2>
        <div className="flex flex-col font-semibold text-slate-500">
          {options && (
            <>
              {title === "Marca" &&
                options &&
                options.brand &&
                options.brand.map((elem: any, index: any) => {
                  return (
                    <FilterOption context={"brand"} key={index} option={elem} />
                  );
                })}
              {title === "Modelo" &&
                options &&
                options.model &&
                options.model.map((elem: any, index: any) => {
                  return (
                    <FilterOption context={"model"} key={index} option={elem} />
                  );
                })}
              {title === "Cor" &&
                options &&
                options.color &&
                options.color.map((elem: any, index: any) => {
                  return (
                    <FilterOption context={"color"} key={index} option={elem} />
                  );
                })}
              {title === "Ano" &&
                options &&
                options.year &&
                options.year.map((elem: any, index: any) => {
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
            </>
          )}
        </div>
      </div>
    </>
  );
};
