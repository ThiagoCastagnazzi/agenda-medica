"use client";

import Image from "next/image";
import { FiCalendar, FiUser } from "react-icons/fi";
import { usePathname } from "next/navigation";
import Options from "./Options";

const Header = () => {
  const route = usePathname();

  return (
    <header
      className="
    bg-white
    text-[#1B509A]
    p-[10px]
    h-[66px]
    2xl:h-[76px]
    drop-shadow-md
    flex
    justify-between
    fixed
    top-0
    w-full
    z-20
    "
    >
      <div
        className="
      flex
      items-center
      "
      >
        <a href="/agenda" className="flex items-center gap-[8px]">
          <Image
            src="/Logo.svg"
            width={71}
            height={40}
            alt="Logo"
            loading="eager"
            color="#1B509A"
            className="w-[50px] 2xl:w-[71px] h-[40px] 2xl:h-[40px]"
          />
          <span
            className="
          font-medium
          text-[20px]
          2xl:text-[26px]
          border-r-[1px]
          border-[#C0C0C0]
          pr-[16px]
          "
          >
            Clínica de Olhos
          </span>
        </a>
        <div
          className="
        flex
        items-center
        gap-[16px]
        ml-[16px]
        "
        >
          <ul
            className="
          flex
          items-center
          gap-[10px]
          text-[label]
          "
          >
            <li>
              <a
                href="/agenda"
                className={`flex items-center gap-[8px] rounded-[4px] px-[12px] 2xl:px-[16px] py-[4px] 2xl:py-[8px] ${
                  route.match("/agenda")
                    ? "text-[#1849A9] bg-blue-light drop-shadow-md"
                    : " text-label"
                }`}
              >
                <FiCalendar className="text-[20px] 2xl:text-[24px]" />
                <span className="font-normal text-[18px] 2xl:text-[20px]">
                  Agenda
                </span>
              </a>
            </li>
            <li>
              <a
                href="/pacientes"
                className={`flex items-center gap-[8px] rounded-[4px] px-[12px] 2xl:px-[16px] py-[4px] 2xl:py-[8px] ${
                  route.includes("pacientes")
                    ? "text-[#1849A9] bg-blue-light drop-shadow-md"
                    : " text-label"
                }`}
              >
                <FiUser
                  className="text-[20px] 2xl:text-[24px]"
                  color={route.includes("pacientes") ? "#1849A9" : "#344054"}
                />
                <span className="font-normal text-[18px] 2xl:text-[20px]">
                  Pacientes
                </span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <Options />
    </header>
  );
};

export default Header;
