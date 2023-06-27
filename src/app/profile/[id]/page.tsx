"use client";
import { useAnnouncementContext } from "@/app/contexts/announcement";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { iAnnouncement } from "../page";
import { AnnouncementCard } from "@/components/profile/announcementCard";

const user1 = {
  name: "Client",
  description:
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500sLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500sLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500sLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
};
const ProfilePerId = ({ params }: { params: { id: string } }) => {
  let searchParams: any = useSearchParams();

  const { retriveSellerAnnouncements, sellerAnnouncements } =
    useAnnouncementContext();
  useEffect(() => {
    retriveSellerAnnouncements(params.id);
  }, []);
  const router = useRouter();
  return (
    <>
      <div className="bg-gray-800">
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
            <p className="line-clamp-4">{user1.description}</p>
          </div>
        </section>
        <section className="w-[90%] ml-8 p-6 mt-[150px] h-fit">
          <h2 className="w-fit font-bold">Anúncios</h2>
          <ul className="pl-12 flex align-middle w-full overflow-x-scroll overflow-y-hidden p gap-20 md:flex-wrap md:max-w-[95%] md:pl-4 md:mx-auto md:justify-between p-4">
            {sellerAnnouncements.map((e, i) => (
              <AnnouncementCard key={i} element={e}></AnnouncementCard>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
};
export default ProfilePerId;
