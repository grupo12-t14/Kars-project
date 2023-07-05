import Image from "next/image";
import menu from "../assets/menudots.png";
import { useContext, useEffect, useRef, useState } from "react";
import "moment/dist/locale/pt-br";
import { localApi } from "@/api";
import { UserContext } from "@/contexts/contexts";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { commentSchema } from "@/schemas/commentSchema";

const Comment = ({ comment, pageUser }: any) => {
  const { token, editCommentReq, setCommentId, deleteComment }: any =
    useContext(UserContext);
  const { id, user, content, createdAt } = comment;
  const [hover, setHover] = useState(false);
  const [commentUser, setCommentUser]: any = useState(null);
  const [commentOption, setCommentOption] = useState(false);
  const [commentModal, setCommentModal] = useState(false);
  const [editComment, setEditComment] = useState(false);
  const edit: any = useRef(null);
  const moment = require("moment");
  require("moment/locale/pt-br");
  moment.locale("pt-br");
  const difference = moment(createdAt).fromNow();

  useEffect(() => {
    setCommentId(id);
  }, [id, setCommentId]);

  useEffect(() => {
    if (pageUser?.id === user?.id) {
      setCommentOption(true);
    }
  }, [pageUser?.id, user?.id]);

  useEffect(() => {
    const getUserById = async () => {
      try {
        const response = await localApi.get(`users/${user?.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCommentUser(response.data);
      } catch (error) {}
    };
    getUserById();
  }, [token, user?.id]);

  const {
    register,
    handleSubmit,
    setValue,
    setFocus,

    formState: { errors },
  } = useForm({
    resolver: yupResolver(commentSchema),
  });

  const handleEdit = () => {
    setValue("content", content);
    setEditComment(true);
    setCommentModal(false);
  };

  const handleDelete = () => {
    deleteComment(id);
  };

  return (
    <li
      onMouseOver={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="relative flex items-center justify-between w-full"
    >
      <div className="flex flex-col w-full gap-3">
        <div className="flex items-center gap-2">
          <div className="bg-brand-100 w-[30px] h-[30px] rounded-full flex items-center justify-center">
            <p className="text-gray-1 font-bold">
              {commentUser?.name[0].toUpperCase()}
            </p>
          </div>
          <p>{commentUser?.name}</p>
          <div className="w-[5px] h-[5px] rounded-xl bg-gray-400" />
          <p className="text-gray-400 text-sm">{difference}</p>
        </div>
        {editComment ? (
          <form
            onSubmit={handleSubmit(editCommentReq)}
            className="flex flex-col gap-1"
          >
            <input
              {...register("content")}
              defaultValue={content}
              type="text"
              className="w-full border-b-[1px] outline-none"
            />
            <div className="w-full flex justify-end items-center">
              <button
                type="submit"
                onClick={() => {
                  setCommentId(id);
                  setTimeout(() => {
                    setEditComment(false);
                  }, 100);
                }}
                className="bg-brand-100 w-[90px] h-[25px] flex justify-center items-center text-[14px] text-gray-800 rounded-[32px]"
              >
                Salvar
              </button>
            </div>
          </form>
        ) : (
          <p className="leading-6 w-full line-clamp-3">{content}</p>
        )}
      </div>
      {commentOption && (
        <div
          onClick={() => {
            !commentModal ? setCommentModal(true) : setCommentModal(false);
          }}
          className="flex justify-center items-center w-[25px] mr-4"
        >
          {hover && (
            <figure className="flex justify-center items-center rounded-[32px] cursor-pointer hover:bg-gray-800 p-1">
              <Image src={menu} alt="menu" className="min-w-[20px]" />
            </figure>
          )}
        </div>
      )}
      {commentModal && (
        <div className="absolute right-10 bg-gray-600 w-[150px] h-[90%] my-auto rounded-md flex flex-col justify-between">
          <button onClick={handleEdit} className="w-full h-1/2 rounded-t-md">
            Editar
          </button>
          <button
            onClick={handleDelete}
            className="w-full h-1/2 bg-feedBack-alert-100 text-gray-950 rounded-b-md"
          >
            Excluir
          </button>
        </div>
      )}
    </li>
  );
};

export default Comment;
