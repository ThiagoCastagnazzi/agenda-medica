import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useState } from "react";
import { Button, Form, Input, Wrapper } from "./styles";
import { auth } from "../../firebase/firebase";
import { useAuth } from "../../context/authContext";
import { toast } from "react-toastify";

export default function LoginC() {
  const { setCurrentUser } = useAuth();

  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);

  const [dados, setDados] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await signInWithEmailAndPassword(
      dados.email,
      dados.password
    );

    if (response) {
      setCurrentUser(response.user);

      toast.success("Login efetuado com sucesso!");

      window.location.href = "/";
    }
  };

  const handleChange = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, value } = e.target as HTMLInputElement;
    setDados({ ...dados, [name]: value });
  };

  return (
    <>
      <Wrapper>
        <Form onSubmit={handleSubmit}>
          <h1>Login</h1>
          <Input
            type="email"
            name="email"
            value={dados.email}
            onChange={handleChange}
            placeholder="Email"
          />
          <Input
            type="password"
            name="password"
            value={dados.password}
            onChange={handleChange}
            placeholder="Senha"
          />
          <Button type="submit" onClick={handleSubmit}>
            Entrar
          </Button>
        </Form>
      </Wrapper>
    </>
  );
}
