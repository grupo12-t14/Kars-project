"use client";
import Image from "next/image";
import imageMainCar from "../../../assets/mainImageDetail.png";
import Comment from "@/components/comment";
import { useContext, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { commentSchema } from "@/schemas/commentSchema";
import { UserContext } from "@/contexts/contexts";
import { iCommentForm } from "@/types/types";

const Detail = () => {
  const { getCommentData, commentsList, user, announcement }: any =
    useContext(UserContext);
  const refElem = useRef<any>(null);
  const [padding, setPadding] = useState(0);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    if (refElem.current) {
      const heightRefElem = refElem.current.offsetHeight;
      const novoPadding = heightRefElem * 1.1;
      setPadding(novoPadding);
    }
  }, []);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(commentSchema),
  });

  const handleSuggest = (e: any) => {
    setInputValue(e.target.textContent);
    setValue("content", e.target.textContent);
  };

  const handleClickWhatsapp = () => {
    const phoneNumber = 40028922
    const message = `Olá vi seu anuncio sobre a venda do NomedoCarro, e gostaria de `;
    const url = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(url, '_blank');
  };

  const handleInput = (e: any) => {
    setInputValue(e.target.value);
  };

  const images = [
    imageMainCar,
    imageMainCar,
    imageMainCar,
    imageMainCar,
    imageMainCar,
    imageMainCar,
  ];

  const onSubmit = (formData: any) => {
    getCommentData(formData);
    setValue("content", "");
    setInputValue("");
  };

  return (
    <main
      style={{ paddingBottom: `${padding}px` }}
      className={`flex min-h-screen flex-col items-center justify-between`}
    >
      <div className="relative w-full">
        <div className="bg-brand-100 w-full h-[436px]"></div>
        <div
          ref={refElem}
          className="absolute mt-[-400px] left-1/2 transform -translate-x-1/2 w-[90%] md:w-[85%] md:flex md:justify-between"
        >
          <div className="w-full md:w-[60%] md:mt-0">
            <div className="w-full h-[355px] flex justify-center items-center p[10px] bg-gray-950 rounded ">
              <Image
                src={`/${announcement?.coverImage}`}
                width={100}
                height={100}
                className="w-min-[300px] object-cover"
                alt={"imagem do carro"}
              />
            </div>
            <div
              id="purchase"
              className="bg-gray-950 w-full rounded p-[44px] mt-[20px] "
            >
              <h2 className="text-gray-1 font-bold text-20px">
                {announcement?.model}
              </h2>
              <div className="flex flex-col w-full gap-3 mt-[43px] md:flex-row md:items-center md:justify-between">
                <div className="flex gap-3">
                  <span className="text-brand-100 bg-brand-400 py-[4px] px-[8px] rounded">
                    {announcement?.year}
                  </span>
                  <span className="text-brand-100 bg-brand-400 py-[4px] px-[8px] rounded">
                    {announcement?.mileage} km
                  </span>
                </div>
                <span className="text-gray-1 font-bold justify-end">
                  R$ {announcement?.sellPrice}
                </span>
              </div>
              <button onClick={handleClickWhatsapp} 
                className="bg-brand-100 text-gray-950 font-bold h-[38px] w-[100px] rounded mt-[24px]">
                Comprar
              </button>
            </div>
            <div
              id="description"
              className="w-full rounded mt-[24px] p-[36px] bg-gray-950 "
            >
              <h2 className="text-gray-1 font-bold text-20px">Descrição</h2>
              <p className="mt-[32px]">{announcement?.description}</p>
            </div>

            <div className="w-full mt-[24px] rounded p-[36px] mb-[24px] bg-gray-950 flex flex-col gap-8">
              <h2 className="text-gray-1 font-bold text-20px">Comentários</h2>
              <ul className="flex flex-col gap-12 w-full max-h-[400px] overflow-y-auto overflow-x-hidden">
                <>
                  {commentsList.map((elem: any, index: any) => {
                    return (
                      <Comment key={index} pageUser={user} comment={elem} />
                    );
                  })}
                </>
              </ul>
            </div>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-[6px] sm:gap-3 w-full p-[36px]"
            >
              <div className="flex items-center gap-2">
                <div className="bg-brand-100 w-[30px] h-[30px] rounded-full flex items-center justify-center">
                  <p className="text-gray-600 font-bold">
                    {user?.name[0].toUpperCase()}
                  </p>
                </div>
                <p>{user?.name}</p>
              </div>
              <textarea
                {...register("content")}
                onInput={handleInput}
                className="relative resize-none rounded-sm border-[1px] border-gray-500 p-2 outline-none"
                placeholder="Digite seu comentário..."
                cols={30}
                rows={3}
              />
              <div className="flex justify-between items-center w-full">
                <div className="flex gap-[2px] sm:gap-2 text-gray-300 flex-wrap">
                  <div
                    onClick={(e) => handleSuggest(e)}
                    className="bg-gray-700 px-[5px] py-[1px] rounded-[32px] whitespace-nowrap font-bold text-[8px] cursor-pointer sm:text-[12px] sm:px-[8px] sm:py-[3px]"
                  >
                    <p>Gostei muito!</p>
                  </div>

                  <div
                    onClick={(e) => handleSuggest(e)}
                    className="bg-gray-700 px-[5px] py-[1px] rounded-[32px] whitespace-nowrap font-bold text-[8px] cursor-pointer sm:text-[12px] sm:px-[8px] sm:py-[3px]"
                  >
                    <p>Incrível</p>
                  </div>

                  <div
                    onClick={(e) => handleSuggest(e)}
                    className="bg-gray-700 px-[5px] py-[1px] rounded-[32px] whitespace-nowrap font-bold text-[8px] cursor-pointer sm:text-[12px] sm:px-[8px] sm:py-[3px]"
                  >
                    <p>Recomendarei para meus amigos!</p>
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={inputValue.length > 0 ? false : true}
                  className={`min-w-[75px] sm:w-[100px] h-[24px] ${
                    inputValue.length > 0
                      ? "bg-brand-100 cursor-pointer"
                      : "bg-gray-500 cursor-default"
                  } text-white text-[13px] sm:text[16px] rounded-sm sm:h-[32px]`}
                >
                  Comentar
                </button>
              </div>
            </form>
          </div>
          <div
            id="totalInfosUser"
            className="w-full mt-[32px] md:w-[35%] md:mt-[0px]"
          >
            <div id="pictures" className="bg-gray-950 rounded w-full p-[26px]">
              <h2 className="text-gray-1 font-bold text-20px">Fotos</h2>
              <div className=" grid grid-cols-3 gap-3 w-full p-2">
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
                <p className="text-gray-600 font-bold">
                  {user?.name[0].toUpperCase()}
                </p>
              </div>
              <h2 className="text-gray-1 font-bold text-20px text-center mt-[28px]">
                {user?.name}
              </h2>
              <p className="mt-[28px] mx-auto">{user?.description}</p>
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
