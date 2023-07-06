"use client";
import { useAnnouncementContext } from "@/app/contexts/announcement";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { iAnnouncement, iUser } from "../page";
import { AnnouncementCard } from "@/components/profile/announcementCard";
import { UserContext } from "@/contexts/contexts";
import { Navbar } from "@/components/navBar";
import { localApi } from "@/api";

const ProfilePerId = ({ params }: { params: { id: string } }) => {
  const { retrieveUserInfo, userInfo, isUserLoading }: any =
    useContext(UserContext);
  const [pageUserInfo, setPageUserInfo] = useState<iUser | null>(null);
  const { retriveSellerAnnouncements, sellerAnnouncements } =
    useAnnouncementContext();

  const fetchData = useCallback(async () => {
    const response = await localApi.get(`users/${params.id}`);
    setPageUserInfo(response.data);
  }, []);
  useEffect(() => {
    retriveSellerAnnouncements(params.id);
    fetchData();
  }, []);

  const router = useRouter();
  return (
    <>
      <Navbar></Navbar>
      <div className="bg-gray-800">
        <div className="bg-brand-100 h-[30vh] relative"></div>
        <section className="">
          <div className="flex flex-col gap-4 rounded-md absolute top-[20%] bg-gray-950 h-fit left-1/2 -translate-x-1/2 w-[90%] p-6">
            <span className="rounded-full text-white text-3xl w-20 h-20 bg-brand-100 flex place-items-center justify-center">
              {pageUserInfo?.name?.charAt(0).toUpperCase()}
            </span>
            <h2 className="font-bold flex gap-4 place-items-center w-full">
              <span className="truncate ... text-lg">
                {" "}
                {pageUserInfo?.name}
              </span>
              <span className="bg-gray-800 text-brand-100 text-sm font-semibold p-1 rounded-md">
                Anunciante
              </span>
            </h2>
            <p className="line-clamp-4">{pageUserInfo?.description}</p>
          </div>
        </section>
        <section className="w-[90%] ml-8 p-6 mt-[150px] h-fit">
          <h2 className="w-fit font-bold">Anúncios</h2>
          <ul className="pl-12 flex align-middle w-full overflow-x-scroll overflow-y-hidden p gap-20 md:flex-wrap md:max-w-[95%] md:pl-4 md:mx-auto md:justify-between p-4">
            {sellerAnnouncements.map((e, i: any) => (
              <AnnouncementCard
                params={params.id}
                key={i}
                element={e}
                setEditModalOpen={undefined}
                setAnnouncementId={undefined}
              ></AnnouncementCard>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
};
export default ProfilePerId;
