import Image from "next/image";
import menu from "../assets/menudots.png";
import { useState } from "react";
import "moment/dist/locale/pt-br";

const Comment = ({ image, name, content, createdAt }: any) => {
  const [hover, setHover] = useState(false);
  const moment = require("moment");
  require("moment/locale/pt-br");
  moment.locale("pt-br");
  const difference = moment(createdAt).fromNow();

  return (
    <li
      onMouseOver={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="flex justify-between w-full"
    >
      <div className="flex flex-col w-full gap-3">
        <div className="flex items-center gap-2">
          <figure className="w-[30px] h-[30px] rounded-[50%]">
            <Image
              src={image}
              alt={name}
              className="w-full h-full rounded-[50%]"
            />
          </figure>
          <p>{name}</p>
          <div className="w-[5px] h-[5px] rounded-xl bg-gray-400" />
          <p className="text-gray-400 text-sm">{difference}</p>
        </div>
        <p className="leading-6 w-full line-clamp-3">{content}</p>
      </div>
      <div className="flex justify-center items-center w-[25px] mr-4">
        {hover && (
          <figure className="flex justify-center items-center rounded-[32px] cursor-pointer hover:bg-gray-800 p-1">
            <Image src={menu} alt="menu" className="min-w-[20px]" />
          </figure>
        )}
      </div>
    </li>
  );
};

export default Comment;
