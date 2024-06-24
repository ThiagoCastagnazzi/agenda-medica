import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useState } from "react";
import { auth } from "../../firebase/firebase";
import { useAuth } from "../../context/authContext";
import toast from "react-hot-toast";
import Spinner from "../Spinner";

export default function LoginC() {
  const [loading, setLoading] = useState(false);
  const { setCurrentUser } = useAuth();

  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);

  const [dados, setDados] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const response = await signInWithEmailAndPassword(
      dados.email,
      dados.password
    );

    if (response) {
      setCurrentUser(response.user);

      toast.success("Login efetuado com sucesso!");

      window.location.href = "/";
    } else {
      toast.error("E-mail ou senha inválidos!");
      setLoading(false);
    }
  };

  const handleChange = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, value } = e.target as HTMLInputElement;
    setDados({ ...dados, [name]: value });
  };

  return (
    <div className="grid grid-cols-[2fr,1.5fr] h-screen">
      <div className="flex flex-col items-center w-full">
        <img
          src="/login_image.png"
          alt="Logo"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex flex-col justify-center items-center h-full">
        <form className="flex flex-col gap-[40px]" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-[20px] w-[400px]">
            <div className="flex flex-col gap-[20px] items-center mb-[30px] 2xl:mb-[60px]">
              <img
                src="/logo.png"
                alt="Logo"
                className="w-[130px] 2xl:w-[200px]"
              />
              <span className="font-[500] text-[36px] 2xl:text-[48px] text-white">
                Agenda Médica
              </span>
            </div>
            <div className="flex flex-col gap-[8px] text-white">
              <label htmlFor="email" className="font-medium text-[20px]">
                E-mail
              </label>
              <input
                className="rounded-[4px] bg-white p-[12px] text-black"
                type="email"
                id="email"
                placeholder="Informe seu Email"
                onChange={handleChange}
                name="email"
                value={dados.email}
              />
            </div>
            <div className="flex flex-col gap-[8px] text-white">
              <label htmlFor="senha" className="font-medium text-[20px]">
                Senha
              </label>
              <input
                className="rounded-[4px] bg-white p-[12px] text-black"
                type="password"
                id="senha"
                placeholder="Informe sua Senha"
                onChange={handleChange}
                name="password"
                value={dados.password}
              />
            </div>
          </div>
          <button
            className="text-white text-[20px] font-[700] bg-[#1570EF] p-[16px] h-[48px] flex justify-center items-center rounded-[4px]"
            type="submit"
          >
            {loading ? (
              <div className="flex items-center gap-[8px]">
                <Spinner className="text-white" />
                <span>Entrando...</span>
              </div>
            ) : (
              <span>Entrar</span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
