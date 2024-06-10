"use client";

import { useModal } from "@/context/ModalContext";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { FaUserCircle, FaChevronDown } from "react-icons/fa";

import { FiLogOut, FiUser } from "react-icons/fi";

const Account = () => {
  const route = useRouter();

  const { openModal, setOptionId } = useModal();

  const dropdownRef = useRef<any>(null);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleOpenModal = (optionId: string) => {
    setOptionId(optionId);
    openModal();
  };

  const handleDropdownClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleClickOutside = (event: any) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  const handleSignOut = async () => {
    await signOut({ redirect: false });

    route.push("/");
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={dropdownRef}
      className="
        flex
        items-center
        gap-[8px]
        2xl:gap-[16px]
        border-[1px]
        border-[#C0C0C0]
        py-[4px]
        2xl:py-[8px]
        px-[8px]
        2xl:px-[12px]
        rounded-[4px]
        w-[126px]
        2xl:w-[146px]
        text-black
        relative
        "
      onClick={handleDropdownClick}
    >
      <button
        className="
          flex
          items-center
          gap-[8px]
          border-[#C0C0C0]
          "
      >
        <FaUserCircle className="text-[22px] 2xl:text-[26px]" color="#344054" />
      </button>
      <button
        className="
          flex
          items-center
          gap-[8px]
          "
      >
        <span
          className="
            font-normal
            text-[18px]
            2xl:text-[20px]
            text-black
            "
        >
          Conta
        </span>
        {isDropdownOpen ? (
          <>
            <FaChevronDown
              width={4}
              height={12}
              color="#344054"
              className="rotate-[180deg]"
            />

            <div className="absolute top-[45px] 2xl:top-[55px] left-[-188px] 2xl:left-[-168px] bg-white rounded-[4px] border border-[#C0C0C0] p-[12px] flex flex-col gap-[16px] w-[313px]">
              <div
                className="
                  flex
                  items-center
                  gap-[12px]
                  p-[8px]
                  cursor-pointer
                  hover:text-[#1570EF]
                  hover:bg-[#EFF8FE]
                  "
                onClick={() => handleOpenModal("3.1")}
              >
                <FiUser size={24} />
                <span>Meus Dados</span>
              </div>
              <div
                className="
                  w-100
                  h-[1px]
                  cursor-pointer
                  border
                  mt-[8px]
                  mb-[8px]
                  border-b-[#344054]
                  "
              ></div>
              <div
                className="
                  flex
                  items-center
                  gap-[12px]
                  p-[8px]
                  cursor-pointer
                  hover:text-red-600
                  hover:bg-[#EFF8FE]
                  "
                onClick={handleSignOut}
              >
                <FiLogOut size={24} />
                <span>Sair</span>
              </div>
            </div>
          </>
        ) : (
          <FaChevronDown
            width={4}
            height={12}
            color="#344054"
            className="mt-[2px]"
          />
        )}
      </button>
    </div>
  );
};

export default Account;
