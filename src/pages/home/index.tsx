import Header from "../../components/Header";
import Layout from "../../components/Layout";
import AgendaC from "../../components/Schedule";
import Sidebar from "../../components/Sidebar";

export default function Home() {
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
