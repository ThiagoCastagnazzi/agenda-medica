import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
import ProductDetails from "./pages/productDetails";
import Favorites from "./pages/favorites";

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
  {
    path: "/product/:id",
    element: <ProductDetails />,
  },
  {
    path: "/favorites",
    element: <Favorites />,
  },
]);

export { router };
