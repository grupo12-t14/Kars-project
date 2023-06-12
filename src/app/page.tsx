import Image from "next/image";
import imageMainCar from "../../mainImageDetail.png";

export default function Home() {

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
        <div className="absolute mt-[-400px] left-1/2 transform -translate-x-1/2 w-full">
          <div>
            <figure className="w-[90%] h-[355px] mx-auto p[10px] bg-gray-950 rounded md:min-w-[700px] md:w-[80%]">
              <Image
                src={imageMainCar}
                width={100}
                className="w-auto h-auto"
                alt={"imagem do carro"}
              />
            </figure>
            <div
              id="purchase"
              className="bg-gray-950 w-[90%] rounded mx-auto p-[44px] mt-[20px] md:min-w-[700px] md:w-[80%]"
            >
              <h2 className="text-gray-1 font-bold text-20px">
                Mercedes Benz A 200 CGI ADVANCE SEDAN Mercedes Benz A 200
              </h2>
              <div className="flex flex-col w-full gap-3 mt-[43px] md:min-w-[700px] md:flex-row  align-center justify-between">
                <div className="flex gap-3">
                  <span className="text-brand-100 bg-brand-400 py-[4px] px-[8px] rounded">
                    2013
                  </span>
                  <span className="text-brand-100 bg-brand-400 py-[4px] px-[8px] rounded">
                    0 km
                  </span>
                </div>
                <p className="text-gray-1 font-bold">R$ 00.000,00</p>
              </div>
              <button className="bg-brand-100 text-gray-950 font-bold h-[38px] w-[100px] rounded mt-[24px]">
                Comprar
              </button>
            </div>
            <div
              id="description"
              className="w-[90%] rounded mx-auto mt-[24px] p-[36px] bg-gray-950 md:min-w-[700px] md:w-[80%]"
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
          <div id="fotos">
            <div className="bg-gray-950 rounded mx-auto w-[80%] p-[36px] mt-[32px]">
              <h2 className="text-gray-1 font-bold text-20px">Fotos</h2>
              <div className="mt-[32px] grid grid-cols-3 gap-4">
                {images.map((fotos, index) => {
                  return (
                    <Image
                      key={index}
                      src={fotos}
                      width={100}
                      className="w-auto h-auto"
                      alt={"imagem do carro"}
                    />
                  );
                })}
              </div>
            </div>
            <div id="user" className="bg-gray-950 rounded mx-auto w-[80%]">
              <div className="bg-brand-100 w-[77px] h-[77px]">
                <p className="text-gray-1 font-bold">HR</p>
              </div>
              <h2 className="text-gray-1 font-bold text-20px">Hugo Raphael</h2>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni
                voluptatibus officia architecto assumenda unde reprehenderit
                recusandae, quaerat possimus iusto fuga sint dignissimos nam?
                Commodi modi eius mollitia quae! Eius, ullam?
              </p>
              <button>Ver Todos anúncios</button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
