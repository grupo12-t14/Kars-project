"use client";
import Image from "next/image";
import imageMainCar from "../assets/mainImageDetail.png";
import { useContext } from "react";
import { UserContext } from "@/contexts/contexts";

interface ModalEditConetext {
  toggleModalEditAddres: () => void;
  isOpenEditAdress: boolean;
}

export default function Home() {
  const { router }: any = useContext(UserContext);
  router.push("/login");
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <p className="bg-brand-100">Kars project</p>
    </main>
  );
}
