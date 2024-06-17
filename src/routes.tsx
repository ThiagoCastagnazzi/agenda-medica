import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";

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
    path: "*",
    element: <h1>404 - Not Found</h1>,
  },
]);

export { router };
