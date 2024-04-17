import Image from "next/image";
import React, { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";

function Glass({ title, tech, image, description, button, langState }) {
  const [isShowModal, setIsShowModal] = useState(false);
  return (
    <>
      {isShowModal && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-screen h-screen flex justify-center items-center px-4 z-50 bg-neutral-900 bg-opacity-60">
          <div className="glass-modal relative text-white max-w-xl max-h-96 w-full h-full profile-shadow px-4 sm:px-8 py-4 flex flex-col justify-start items-center rounded-xl gap-4">
            <button onClick={() => setIsShowModal(false)}>
              <IoCloseOutline className="button-gradient w-6 h-6 rounded-lg absolute right-4 top-4" />
            </button>
            <h4>{title}</h4>
            <p className="max-h-80 overflow-auto mt-4">{description}</p>
          </div>
        </div>
      )}
      <div className="mx-auto glass w-full max-w-72 min-h-96 p-6 flex flex-col justify-between items-center gap-8 rounded-3xl ">
        <div className="h-36 relative flex justify-center items-center pt-10">
          <Image
            src={image}
            className="w-4/5 max-w-44"
            width="2000"
            height="2000"
            alt="Logo"
          />
        </div>

        <div className="flex flex-col gap-4 w-full max-w-sm">
          <div className="text-white flex justify-between items-center">
            <h4>{title}</h4>
            <h4>{tech}</h4>
          </div>
          <div className="w-full bg-white h-0.5 bg-opacity-70 rounded-full" />
          <div className="text-[#D7D7D7] flex justify-between items-center">
            <button
              onClick={() => setIsShowModal(true)}
              className={`button-gradient w-full px-4 py-2 rounded-xl ${
                langState === "fa" ? "text-base" : "font-[Poppins]"
              } `}
            >
              {button}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Glass;
