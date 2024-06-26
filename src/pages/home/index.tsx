import Header from "../../components/Header";
import Layout from "../../components/Layout";
import AgendaC from "../../components/Schedule";
import Sidebar from "../../components/Sidebar";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { useEffect } from "react";

export default function Home() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
  }, [currentUser, navigate]);

  return (
    <div>
      <Header />

      <div
        className="
      flex
      mt-[86px]
      2xl:mt-[96px]
      px-[20px]
      gap-[16px]
      "
      >
        <Sidebar />

        <Layout>
          <AgendaC />
        </Layout>
      </div>
    </div>
  );
}
