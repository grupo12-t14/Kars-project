import Image from "next/image";
import imageMainCar from "../../../mainImageDetail.png";

const Detail = () => {
  const images = [
    imageMainCar,
    imageMainCar,
    imageMainCar,
    imageMainCar,
    imageMainCar,
    imageMainCar,
  ];

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <p className="bg-brand-100">Kars project</p>

      <div className="relative bg-gray-500 w-full">
        <div className="bg-brand-100 w-full h-[436px]"></div>
        <div className="absolute mt-[-400px] left-1/2 transform -translate-x-1/2 w-[90%] md:w-[85%] md:flex md:justify-between">
          <div className="w-full md:w-[60%] md:mt-0">
            <div className="w-full h-[355px] flex justify-center items-center p[10px] bg-gray-950 rounded ">
              <Image
                src={imageMainCar}
                width={100}
                className="w-min-[300px] object-cover"
                alt={"imagem do carro"}
              />
            </div>
            <div
              id="purchase"
              className="bg-gray-950 w-full rounded p-[44px] mt-[20px] "
            >
              <h2 className="text-gray-1 font-bold text-20px">
                Mercedes Benz A 200 CGI ADVANCE SEDAN Mercedes Benz A 200
              </h2>
              <div className="flex flex-col w-full gap-3 mt-[43px] md:flex-row md:items-center md:justify-between">
                <div className="flex gap-3">
                  <span className="text-brand-100 bg-brand-400 py-[4px] px-[8px] rounded">
                    2013
                  </span>
                  <span className="text-brand-100 bg-brand-400 py-[4px] px-[8px] rounded">
                    0 km
                  </span>
                </div>
                <span className="text-gray-1 font-bold justify-end">
                  R$ 00.000,00
                </span>
              </div>
              <button className="bg-brand-100 text-gray-950 font-bold h-[38px] w-[100px] rounded mt-[24px]">
                Comprar
              </button>
            </div>
            <div
              id="description"
              className="w-full rounded mt-[24px] p-[36px] bg-gray-950 "
            >
              <h2 className="text-gray-1 font-bold text-20px">Descrição</h2>
              <p className="mt-[32px]">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta
                quam explicabo ullam obcaecati vero, doloremque beatae illum
                corrupti. Sint cum magni odit provident aperiam veritatis
                laudantium nisi sequi, modi quos.
              </p>
            </div>
          </div>

          <div
            id="totalInfosUser"
            className="w-full mt-[32px] md:w-[35%] md:mt-[0px]"
          >
            <div id='fotos' className="bg-gray-950 rounded w-full p-[26px]">
              <h2 className="text-gray-1 font-bold text-20px">Fotos</h2>
              <div className=" grid grid-cols-3 gap-3 w-full p-7">
                {images.map((fotos, index) => {
                  return (
                    <figure
                      key={index}
                      className="bg-gray-700 w-auto h-auto p-3 flex justify-center items-center"
                    >
                      <Image
                        src={fotos}
                        width={100}
                        className="w-auto h-auto"
                        alt={"imagem do carro"}
                      />
                    </figure>
                  );
                })}
              </div>
            </div>

            <div
              id="user"
              className="bg-gray-950 rounded w-full p-[40px] mt-[52px] flex flex-col justify-center"
            >
              <div className="bg-brand-100 w-[77px] h-[77px] rounded-full flex justify-center items-center mx-auto">
                <p className="text-gray-1 font-bold">HR</p>
              </div>
              <h2 className="text-gray-1 font-bold text-20px text-center mt-[28px]">
                Hugo Raphael
              </h2>
              <p className="mt-[28px] mx-auto">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni
                voluptatibus officia architecto assumenda unde reprehenderit
                recusandae, quaerat possimus iusto fuga sint dignissimos nam?
                Commodi modi eius mollitia quae! Eius, ullam?
              </p>
              <button className="bg-gray-0 text-gray-950 font-bold py-[12px] px-[28px] rounded mt-[28px] max-w-[206px] mx-auto">
                Ver Todos anúncios
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Detail;
