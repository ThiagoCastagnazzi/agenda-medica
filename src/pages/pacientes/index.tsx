import { useNavigate } from "react-router-dom";
import Patients from "../../components/Patients";
import { useAuth } from "../../context/authContext";
import { useEffect } from "react";

const Pacientes = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
  }, [currentUser, navigate]);

  return (
    <>
      <div
        className="
        mt-[86px]
        2xl:mt-[96px]
        flex 
        ml-auto
        px-[18px]
        gap-[16px]
      "
      >
        <div
          className="
          rounded-[4px]
          flex
          gap-[12px]
          mb-[20px]
          w-full
          min-h-[600px]
          h-[calc(100vh-120px)]
      "
        >
          <div className="flex flex-col bg-white p-[20px] w-full h-full rounded-[4px]">
            <div className="gap-[12px] border-b-[3px] border-[#C0C0C0] pb-[3px]">
              <span className="text-[20px] 2xl:text-[24px] font-medium text-[#1B509A] border-b-[3px] border-[#1B509A] pb-[7px]">
                Pacientes
              </span>
            </div>

            <Patients />
          </div>
        </div>
      </div>
    </>
  );
};

export default Pacientes;
