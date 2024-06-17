import { FiCalendar, FiUserPlus } from "react-icons/fi";
import { FaPlusCircle } from "react-icons/fa";

import Account from "../Account";
import { useState, useRef } from "react";

const Options = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // const { openModal, setOptionId } = useModal();

  const menuRef = useRef(null);

  const handleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // const handleOptionClick = (optionId: string) => {
  //   setIsMenuOpen(false);
  //   setOptionId(optionId);
  //   openModal();
  // };

  // const handleClickOutside = (event: any) => {
  //   if (menuRef.current && !menuRef.current.contains(event.target)) {
  //     setIsMenuOpen(false);
  //   }
  // };

  // useEffect(() => {
  //   document.addEventListener("click", handleClickOutside);
  //   return () => {
  //     document.removeEventListener("click", handleClickOutside);
  //   };
  // }, []);

  return (
    <div className="flex items-center gap-[16px] relative">
      <div className="relative" ref={menuRef}>
        <button
          className="
        flex
        items-center
        gap-[8px]
        border-r-[1px]
        border-[#C0C0C0]
        pr-[16px]
          "
          onClick={handleMenu}
        >
          <FaPlusCircle
            className="text-[20px] 2xl:text-[24px]"
            color="#344054"
          />
        </button>

        <div
          className={`${isMenuOpen ? "block" : "hidden"}
              absolute
              top-[35px]
              left-[-285px]
              bg-white
              z-10
              text-label
              rounded-[4px]
              drop-shadow-md
              flex
              flex-col
              gap-[16px]
              justify-between
              p-[12px]
              w-[313px]
              border
              border-[#C0C0C0]
            `}
        >
          <button
            className={`
                flex items-center gap-[12px] hover:text-[#1849A9] hover:bg-blue-light cursor-pointer p-[8px] rounded-[4px]
                `}
            // onClick={() => handleOptionClick("1")}
          >
            <FiCalendar size={24} color="#344054" />
            <span>Novo Agendamento</span>
          </button>
          <button
            className={`
                flex items-center gap-[12px] hover:text-[#1849A9] hover:bg-blue-light cursor-pointer p-[8px] rounded-[4px]
                `}
            // onClick={() => handleOptionClick("2")}
          >
            <FiUserPlus size={24} color="#344054" />
            <span>Novo Paciente</span>
          </button>
          <div
            className="border-b-[1px] border-[#344054]"
            aria-hidden="true"
          ></div>
          <button
            className={`
                flex items-center gap-[12px] hover:text-[#1849A9] hover:bg-blue-light cursor-pointer p-[8px] rounded-[4px]
                `}
            // onClick={() => handleOptionClick("3")}
          >
            <FiUserPlus size={24} color="#344054" />
            <span>Novo Usuário</span>
          </button>
        </div>
      </div>

      <Account />
    </div>
  );
};

export default Options;
