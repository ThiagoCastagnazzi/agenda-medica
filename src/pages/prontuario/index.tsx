import { useNavigate } from "react-router-dom";
import Patient from "../../components/MedicalRecord/Patient";
import { useAuth } from "../../context/authContext";
import { useEffect } from "react";

const ProntuarioPaciente = () => {
  const route = window.location.pathname.split("/");
  const id = route[route.length - 1];

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
      flex-col 
      ml-auto
      px-[18px]
      gap-[32px]
      w-full
      h-[calc(100vh-96px)]
      "
      >
        <Patient id={id} />
      </div>
    </>
  );
};

export default ProntuarioPaciente;
