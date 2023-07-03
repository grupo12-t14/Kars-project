"use client";

import { mock } from "@/components/mock";

import { carsApi } from "@/api";
import { useContext, useEffect, useState } from "react";
import { AnnouncementCard } from "../../components/profile/announcementCard";
import { ModalCreateAnnouncement } from "@/components/profile/createAnnouncementModal";
import { useRouter } from "next/navigation";
import { EditAndExcludeAnnouncementModal } from "@/components/profile/editAndExcludeAnnouncementModal";
import { useAnnouncementContext } from "../contexts/announcement";
import { LoadingSpinner } from "../dashboard/page";
import { UserContext } from "@/contexts/contexts";
import jwt from "jsonwebtoken";

export interface iUser {
  name: string;
  description: string;
}
export interface iAnnouncement {
  id: string;
  brand: string;
  model: string;
  year: string;
  fuelType: number;
  mileage: string;
  color: string;
  fipePrice: string;
  sellPrice: string;
  isActive: boolean;
  description: string;
  coverImage: string;
}

export interface iCarFromApi {
  id: string;
  name: string;
  brand: string;
  year: string;
  fuel: number;
  value: number;
}

const user1 = {
  name: "Client",
  description:
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500sLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500sLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500sLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
};

interface iDecoded {
  userType: string;
  iat: number;
  exp: number;
  sub: string;
}

const Profile = () => {
  const router = useRouter();
  const { token }: any = useContext(UserContext);
  const decodedToken: any = jwt.decode(token);
  if (!decodedToken?.userType) {
    router.push("/dashboard");
  }
  if (decodedToken?.userType && decodedToken.userType != "seller") {
    router.push("/dashboard");
  }
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [announcementId, setAnnouncementId] = useState("");
  const toggleModal = () => setIsCreateModalOpen(!isCreateModalOpen);
  const toggleEditModal = () => setIsEditModalOpen(!isEditModalOpen);
  const { retriveSellerAnnouncements, isLoading, sellerAnnouncements } =
    useAnnouncementContext();
  useEffect(() => {
    retriveSellerAnnouncements("ad636b20-76ea-4f89-9941-e1dae287b798");
  }, []);

  return (
    <>
      {isCreateModalOpen && (
        <ModalCreateAnnouncement toggleModal={toggleModal} />
      )}

      {isEditModalOpen && (
        <EditAndExcludeAnnouncementModal
          announcementId={announcementId}
          toggleModal={toggleEditModal}
        />
      )}
      <div className="bg-gray-800 h-100%">
        <div className="bg-brand-100 h-[30vh] relative"></div>
        <section className="">
          <div className="flex flex-col gap-4 rounded-md absolute top-[20%] bg-gray-950 h-fit left-1/2 -translate-x-1/2 w-[90%] p-6">
            <span className="rounded-full text-white text-3xl w-20 h-20 bg-brand-100 flex place-items-center justify-center">
              {user1.name.charAt(0).toUpperCase()}
            </span>
            <h2 className="font-bold flex gap-4 place-items-center w-full">
              <span className="truncate ... text-lg"> {user1.name}</span>
              <span className="bg-gray-800 text-brand-100 text-sm font-semibold p-1 rounded-md">
                Anunciante
              </span>
            </h2>
            <p className="line-clamp-4" onClick={() => {}}>
              {user1.description}
            </p>
            <button
              onClick={() => {
                setIsCreateModalOpen(true);
              }}
              className="border-[1px] border-brand-100 rounded-md p-2 text-brand-100 w-fit font-bold"
            >
              Criar anuncio
            </button>
          </div>
        </section>
        <section className="mt-[250px]">
          <ul className="ml-[20px] flex align-middle w-full overflow-x-scroll overflow-y-hidden p gap-20 md:flex-wrap md:max-w-[95%] md:pl-4 md:mx-auto p-4">
            {sellerAnnouncements.length > 0 ? (
              sellerAnnouncements?.map((e, i) => (
                <AnnouncementCard
                  params=""
                  setAnnouncementId={setAnnouncementId}
                  setEditModalOpen={setIsEditModalOpen}
                  key={i}
                  element={e}
                ></AnnouncementCard>
              ))
            ) : (
              <h1>
                Parece que você não possuí nenhum anúncio cadastrado, gostaria
                de começar?
              </h1>
            )}
          </ul>
        </section>
        <></>
      </div>
    </>
  );
};

export default Profile;
