const FilterOption = ({ option }: any) => {
  return (
    <div className="flex items-center gap-1">
      <input className="cursor-pointer" type="checkbox" />
      <label className="whitespace-nowrap overflow-hidden text-ellipsis">
        {option}
      </label>
    </div>
  );
};

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

export const FilterContainer = ({ title }: { title: string }) => {
  const brandOptions = [
    "General Motors",
    "Fiat",
    "Honda",
    "Porsche",
    "Volswagen",
  ];
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
  const colorOptions = ["Azul", "Branco", "Cinza", "Prata", "Preto", "Verde"];
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
  const fuelOptions = ["Diesel", "Etanol", "Gasolina", "Flex"];
  return (
    <div className="flex flex-col">
      <h2 className="font-semibold text-typography-20">{title}</h2>
      <div className="flex flex-col font-semibold text-slate-500">
        {title === "Marca" &&
          brandOptions.map((elem, index) => {
            return <FilterOption key={index} option={elem} />;
          })}
        {title === "Modelo" &&
          modelOptions.map((elem, index) => {
            return <FilterOption key={index} option={elem} />;
          })}
        {title === "Cor" &&
          colorOptions.map((elem, index) => {
            return <FilterOption key={index} option={elem} />;
          })}
        {title === "Ano" &&
          yearOptions.map((elem, index) => {
            return <FilterOption key={index} option={elem} />;
          })}
        {title === "Combustível" &&
          fuelOptions.map((elem, index) => {
            return <FilterOption key={index} option={elem} />;
          })}
      </div>
    </div>
  );
};
