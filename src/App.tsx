import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { AuthProvider } from "./context/authContext";
import { Toaster } from "react-hot-toast";

import "./index.css";

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
      <Toaster
        position="bottom-left"
        toastOptions={{
          style: {
            zIndex: 9999,
          },
        }}
      />
    </AuthProvider>
  );
}

export default App;
