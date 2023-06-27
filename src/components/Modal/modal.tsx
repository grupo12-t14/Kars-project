import { createPortal } from "react-dom";
import { ReactNode, useEffect, useRef } from "react";

interface ModalProps {
  toggleModal: () => void;
  blockClosing?: boolean;
  children: ReactNode;
}

export const Modal = ({ toggleModal, children, blockClosing }: ModalProps) => {
  const ref = useRef<HTMLDivElement>(null);
  {
    document.body.style.overflow = "hidden";
  }
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (!ref.current) {
        {
          document.body.style.overflow = "auto";
        }
        return;
      }

      if (!event.target) {
        {
          document.body.style.overflow = "auto";
        }
        return;
      }

      if (!ref.current.contains(event.target as HTMLElement)) {
        toggleModal();
        {
          document.body.style.overflow = "auto";
        }
      }
    };

    window.addEventListener("mousedown", handleClick);

    return () => {
      window.removeEventListener("mousedown", handleClick);
      {
        document.body.style.overflow = "auto";
      }
    };
  }, [toggleModal]);

  return createPortal(
    <div className=" fixed top-0 w-[100vw] h-[100vh] bg-black/50 flex justify-center align-middle g-">
      <div
        className="bg-gray-950 max-h-[80vh] overflow-scroll absolute  top-16 opacity-100 z-[1] my-auto p-3 w-[100vw] h-fit max-sm:max-w-[95%]
         rounded-md flex flex-col max-w-[400px] md:max-w-[400px]"
        ref={blockClosing ? null : ref}
      >
        {children}
      </div>
    </div>,
    document.body
  );
};
