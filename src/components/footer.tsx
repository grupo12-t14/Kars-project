"use client";
import React from "react";

export const Footer = () => {
  return (
    <>
      <footer className="flex place-items-center self-end justify-between w-full p-6  text-white bg-gray-0">
        <p className="max-sm:text-sm text-lg">
          Motors <span className="max-sm:text-xs text-sm">shop</span>
        </p>
        <p className="text-sm max-sm:text-xs">
          © 2023 - Todos os direitos reservados.
        </p>
        <button
          className="cursor-pointer rounded-md bg-gray-200 text-white text-sm font-bold p-2 flex justify-center h-8 w-8"
          onClick={() => {
            scroll;
            window.scroll({
              top: 0,
              behavior: "smooth",
            });
          }}
        >
          ^
        </button>
      </footer>
    </>
  );
};
