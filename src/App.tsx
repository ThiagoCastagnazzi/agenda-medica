import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { AuthProvider } from "./context/authContext";
import { Toaster } from "react-hot-toast";

import "./index.css";
import { TanstackProvider } from "./Providers/TanstackProvider";
import { ModalProvider } from "./context/ModalContext";

function App() {
  return (
    <AuthProvider>
      <TanstackProvider>
        <ModalProvider>
          <RouterProvider router={router} />
          <Toaster
            toastOptions={{
              style: {
                zIndex: 9999,
              },
            }}
          />
        </ModalProvider>
      </TanstackProvider>
    </AuthProvider>
  );
}

export default App;
