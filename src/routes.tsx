import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
import Pacientes from "./pages/pacientes";
import ProntuarioPaciente from "./pages/prontuario";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/pacientes",
    element: <Pacientes />,
  },
  {
    path: "/prontuario/:id",
    element: <ProntuarioPaciente />,
  },
  {
    path: "*",
    element: <h1>404 - Not Found</h1>,
  },
]);

export { router };
