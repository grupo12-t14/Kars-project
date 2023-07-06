"use client";
import { NextPage } from "next";
import car from "../../assets/gtr.jpg";
import Image from "next/image";
import {
  FilterContainer,
  KmAndPriceContainer,
} from "@/components/filterContainer";
import ProductCard from "@/components/productCard";
import { useEffect, useState } from "react";
import { iAnnouncement } from "../profile/page";
import { useAnnouncementContext } from "../contexts/announcement";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/navBar";

export interface iPaginatedAnnouncementResults {
  prevPage: string | null;
  nextPage: string | null;
  count: number;
  data: iAnnouncement[];
}

export const LoadingSpinner = () => {
  return (
    <>
      <div className="flex w-fit mx-auto h-fit my-[25%]" role="status">
        <svg
          aria-hidden="true"
          className="w-24 h-24 mr-2 mx-auto text-white animate-spin dark:text-gray-600 fill-brand-100"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
        <span className="sr-only text-brand-100">Loading...</span>
      </div>
    </>
  );
};

const Home: NextPage = () => {
  const [filters, setFilters] = useState(false);
  const {
    isLoading,
    getAnnouncements,
    getAnnouncementsRequest,
    queryParamsString,
    setQueryParamsString,
    getFilterOptionsFromDistinctRoute,
  }: any = useAnnouncementContext();

  const router = useRouter();
  useEffect(() => {
    getAnnouncementsRequest(queryParamsString);
    getFilterOptionsFromDistinctRoute();
  }, []);
  useEffect(() => {
    getAnnouncementsRequest(queryParamsString);
  }, []);
  const filterOptions = ["Marca", "Modelo", "Cor", "Ano", "Combustível"];

  return (
    <>
      <>
        <Navbar></Navbar>
        {filters && (
          <div className="fixed top-0 flex flex-col justify-between items-center bg-[#f2f2f2] w-full h-[90%] z-10 rounded-b-[38px]">
            <div className="flex items-center justify-end w-full h-[50px] bg-white px-3">
              <button
                className="w-[30px] h-[30px] flex items-center justify-center bg-gray-800 rounded-sm text-gray-200"
                onClick={() => setFilters(false)}
              >
                X
              </button>
            </div>
            <div className="w-[98%] h-full overflow-y-scroll px-3 scroll-smooth">
              <>
                {filterOptions &&
                  filterOptions.map((e, i) => {
                    return <FilterContainer key={i} title={e} />;
                  })}
              </>
              <KmAndPriceContainer title="Km" />
              <KmAndPriceContainer title="Preço" />
            </div>
            <div className="w-full h-[38px] flex justify-center items-center">
              <div className="w-20 h-1 bg-gray-500 rounded-lg" />
            </div>
          </div>
        )}
        <main className="flex flex-col w-full">
          <div className="flex justify-center items-end">
            <div className="w-full h-fit relative">
              <div
                className="absolute
            z-0
            top-0
            flex
            flex-col
            justify-center
            items-center
            h-full
            w-full
            text-white
            drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]
            bg-gradient-to-b
            from-transparent
            from-60%
            to-[#00000095]
            "
              >
                <h1 className="text-typography-20 font-semibold sm:text-typography-30">
                  Motors Shop
                </h1>
                <p className="w-[95%] font-semibold text-center sm:text-xs sm:w-full">
                  A melhor plataforma de anúncios de carros do país
                </p>
              </div>
              <Image
                className="w-full h-[250px] object-cover sm:object-fill sm:h-[30%]"
                src={car}
                alt="carro"
              />
            </div>
          </div>
          <div className="flex w-full p-1 sm:p-6">
            <aside className="hidden sm:flex flex-col w-1/5 gap-5">
              <>
                {filterOptions &&
                  filterOptions.map((e, i) => {
                    return <FilterContainer key={i} title={e} />;
                  })}
              </>
              <KmAndPriceContainer title="Km" />
              <KmAndPriceContainer title="Preço" />
            </aside>

            {isLoading ? (
              <LoadingSpinner />
            ) : (
              <ul className="w-full flex overflow-x-scroll sm:overflow-x-hidden my-2 py-4 sm:w-4/5 sm:grid md:grid-cols-3 sm:grid-cols-2 gap-5 h-fit scroll-smooth">
                {getAnnouncements.length > 0 ? (
                  getAnnouncements.map((elem: any, index: any) => {
                    return <ProductCard key={index} announcement={elem} />;
                  })
                ) : (
                  <>
                    <div>
                      Não foram encontrados resultados!{" "}
                      <button
                        className="bg-brand-100 p-1 text-white"
                        onClick={() => {
                          router.replace("dashboard");
                          setQueryParamsString("");
                        }}
                      >
                        Redefinir
                      </button>{" "}
                    </div>
                  </>
                )}
              </ul>
            )}
          </div>
          <button
            className="bg-brand-200 text-white font-semibold w-[95%] h-[35px] sm:hidden flex items-center justify-center mx-auto rounded-sm"
            onClick={() => setFilters(true)}
          >
            Filtros
          </button>
          <div className="w-full h-9 flex justify-center items-center gap-5 p-11 font-bold">
            <span className="text-brand-100 cursor-pointer whitespace-nowrap">
              &#60; Anterior
            </span>
            <p className="text-gray-500 whitespace-nowrap">
              <span className="text-gray-300">1</span> de <span>2</span>
            </p>
            <span className="text-brand-100 cursor-pointer whitespace-nowrap">
              Seguinte &#62;
            </span>
          </div>
        </main>
      </>
    </>
  );
};

export default Home;
