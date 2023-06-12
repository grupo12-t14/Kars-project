import { NextPage } from "next";
import car from "../assets/gtr.jpg";
import Image from "next/image";
import {
  FilterContainer,
  KmAndPriceContainer,
} from "@/components/filterContainer";
import ProductCard from "@/components/productCard";
import { mock } from "../components/mock";
import { useState } from "react";

const Home: NextPage = () => {
  const [filters, setFilters] = useState(false);
  return (
    <>
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
            <FilterContainer title="Marca" />
            <FilterContainer title="Modelo" />
            <FilterContainer title="Cor" />
            <FilterContainer title="Ano" />
            <FilterContainer title="Combustível" />
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
            <FilterContainer title="Marca" />
            <FilterContainer title="Modelo" />
            <FilterContainer title="Cor" />
            <FilterContainer title="Ano" />
            <FilterContainer title="Combustível" />
            <KmAndPriceContainer title="Km" />
            <KmAndPriceContainer title="Preço" />
          </aside>
          <ul className="w-full flex overflow-x-scroll sm:overflow-x-hidden my-2 py-4 sm:w-4/5 sm:grid md:grid-cols-3 sm:grid-cols-2 gap-5 h-fit scroll-smooth">
            {mock.map((elem, index) => {
              return <ProductCard key={index} announcement={elem} />;
            })}
          </ul>
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
  );
};

export default Home;
