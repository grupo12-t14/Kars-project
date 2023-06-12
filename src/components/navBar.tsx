"use client";
import React, { useState } from "react";
interface User {
  name: string;
  accountType: string;
}
export const Navbar = () => {
  // const user: any = {
  //   name: "Client",
  //   accountType: "seller",
  // };
  const user: any = false;
  const [profileDisplay, setProfileDisplay] = useState(false);
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);

  return (
    <div className="w-full flex justify-between border-b-2 border-b-gray-600 place-items-center  h-16">
      <p className="text-lg bg-clip-text text-transparent w-fit font-bold bg-gradient-to-r from-black to-brand-100">
        Motors <span className="text-xs">shop</span>
      </p>

      {!user ? (
        <div className=" text-sm border-l-2 border-l-gray-600  font-semibold h-full flex pl-5 place-items-center relative">
          <div className="hidden sm:flex place-items-center gap-5">
            <button className="h-fit">Fazer Login</button>
            <button className="border-2 border-gray-400 rounded-md h-fit p-2 px-4">
              Cadastrar
            </button>
          </div>
          <div className="sm:hidden pr-4 my-auto">
            <button
              onClick={() => {
                setIsDropDownOpen(!isDropDownOpen);
              }}
              className=""
            >
              {!isDropDownOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="w-8 h-8 cursor-pointer"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-8 h-8 cursor-pointer"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </button>
            {isDropDownOpen && (
              <div
                className="absolute top-20 right-[50%] mr-[-35px]  place-items-center
              "
              >
                <div className="gap-4 bg-white w-screen flex flex-col  p-8">
                  <button className="h-fit w-full">Fazer Login</button>
                  <button className="border-2 w-full border-gray-400 rounded-md h-fit p-2 px-4">
                    Cadastrar
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <>
          <div
            onMouseOverCapture={(e) => {
              setProfileDisplay(true);
            }}
            onMouseLeave={(e) => {
              setProfileDisplay(false);
            }}
            className="cursor-pointer border-l-2 border-l-gray-600 h-full flex pl-5 gap-2 place-items-center relative"
          >
            <span className="rounded-full p-2 w-10 h-10 bg-brand-100 text-white flex place-items-center justify-center">
              {user.name.charAt(0).toUpperCase()}
            </span>
            <p>{user.name}</p>
            <div
              onMouseLeave={() => {
                setProfileDisplay(false);
              }}
              onMouseOverCapture={() => {
                setProfileDisplay(true);
              }}
              className={
                profileDisplay
                  ? "flex flex-col bg-white absolute r-0 top-14 text-sm gap-2"
                  : "hidden"
              }
            >
              <button>Editar Perfil</button>
              <button>Editar Endereço</button>
              {user?.accountType == "seller" && <button>Meus Anúncios</button>}
              <button>Sair</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
