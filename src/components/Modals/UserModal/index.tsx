import * as yup from "yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import ModalTemplate from "../ModalTemplate";
import { IoMdClose } from "react-icons/io";
import { IoCheckmarkOutline, IoCloseOutline } from "react-icons/io5";
import { LuDot } from "react-icons/lu";
import { useEffect, useState } from "react";

import { toast } from "react-hot-toast";
import { useAuth } from "../../../context/authContext";
import {
  createUserFirebase,
  updateUserFirebase,
} from "../../../services/users";

interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: "new" | "edit";
}

interface UserModalTypes {
  email: string;
  password?: string | undefined;
  password_confirmation?: string | undefined;
}

const userSchema = yup.object().shape({
  email: yup.string().required("Campo obrigatório").email("Email inválido"),
  password: yup.string().notRequired(),
  password_confirmation: yup.string().notRequired(),
});

const UserModal = ({ isOpen, onClose, type }: UserModalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { currentUser } = useAuth();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<UserModalTypes>({
    resolver: yupResolver(userSchema as any),
  });

  const onSubmit: SubmitHandler<UserModalTypes> = async (data) => {
    setIsLoading(true);

    try {
      let hasNumber = false;
      if (data.password) {
        for (let i = 0; i < data.password.length; i++) {
          if (!isNaN(Number(data.password[i]))) {
            hasNumber = true;
          }
        }
      }

      if (!data.password) {
        toast.error("A senha é obrigatória.");
        return;
      }

      if (data.password && data.password.length < 6) {
        toast.error("A senha deve ter pelo menos 6 caracteres.");
        return;
      }

      if (data.password != data.password_confirmation && type === "new") {
        toast.error("As senhas devem ser iguais.");
        return;
      }

      if (!hasNumber && type === "new") {
        toast.error("A senha deve ter pelo menos um número.");
        return;
      }

      if (data.password !== data.password_confirmation) {
        toast.error("As senhas devem ser iguais.");
        return;
      }

      if (type === "new") {
        const response = await createUserFirebase({
          email: data.email,
          password: data.password as string,
        });

        if (response) {
          toast.success("Usuário cadastrado com sucesso!");
          handleClose();
        }
      } else {
        const response = await updateUserFirebase({
          email: data.email,
          password: data.password as string,
        });

        if (response) {
          toast.success("Usuário atualizado com sucesso!");
          handleClose();
        }
      }
    } catch (error: any) {
      toast.error("Erro ao cadastrar/atualizar Usuário");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    onClose();
  };

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (currentUser && type === "edit") {
      setValue("email", currentUser.email);
    }
  }, [currentUser, setValue, type]);

  return (
    <div>
      {isOpen && (
        <ModalTemplate>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div
              className="
            bg-white
            rounded-[4px]
            w-[670px]
            max-w-[80vw]
            h-[80vh]
            max-h-[580px]
            flex
            flex-col
            gap-[20px]
            p-[20px]
            text-label
            "
            >
              <div className="border-b-[1px] border-[#C0C0C0] pb-[20px] flex justify-between">
                <span className="text-[22px] font-medium text-label pb-[7px]">
                  {
                    {
                      new: "Cadastrar Usuário",
                      edit: "Editar Usuário",
                    }[type]
                  }
                </span>
                <button
                  type="button"
                  onClick={() => handleClose()}
                  className="self-start"
                >
                  <IoMdClose size={24} color="#344054" />
                </button>
              </div>

              <div className="flex flex-col gap-[32px] h-[100%] overflow-auto no-scrollbar">
                <div className="flex flex-col gap-[40px]">
                  <div className="flex flex-col gap-[20px]">
                    <h2 className="text-[#1B509A] text-[22px] font-medium">
                      Dados do Usuário
                    </h2>
                    <div className="px-[20px] flex flex-col gap-[20px]">
                      <div className="flex items-center gap-[20px] relative justify-end">
                        <label
                          htmlFor="email"
                          className="w-[62px] text-label text-[20px]"
                        >
                          E-mail
                        </label>
                        <input
                          {...register("email")}
                          id="email"
                          name="email"
                          type="email"
                          className={`w-[390px] p-[8px] rounded-[4px] border-[1px] border-[#C0C0C0] px-[10px] mt-[5px] outline-none ${
                            errors.email ? "border-red-500" : ""
                          }`}
                          placeholder="Informe o Email"
                          disabled={type === "edit"}
                        />
                        {errors.email && (
                          <span className="absolute left-[82px] top-[45px] text-[12px] text-red-500">
                            {errors.email.message}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-[20px]">
                    <h2 className="text-[#1B509A] text-[22px] font-medium">
                      Definir Senha
                    </h2>
                    <div className="flex flex-col items-end gap-[16px]">
                      <div className="flex items-center gap-[20px] relative">
                        <label
                          htmlFor="password"
                          className="w-[62px] text-label text-[20px]"
                        >
                          Senha
                        </label>
                        <input
                          {...register("password")}
                          id="password"
                          name="password"
                          type="password"
                          className={`w-[390px] p-[8px] rounded-[4px] border-[1px] border-[#C0C0C0] px-[10px] mt-[5px] outline-none
                              ${
                                type === "new" && errors.password
                                  ? "border-red-500"
                                  : ""
                              }
                            `}
                          placeholder="******"
                        />

                        {type === "new" && errors.password && (
                          <span className="absolute left-[82px] top-[45px] text-[12px] text-red-500">
                            Campo obrigatório
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-[20px] relative">
                        <label
                          htmlFor="password_confirmation"
                          className="w-[180px] text-label text-[20px]"
                        >
                          Confirme sua Senha
                        </label>
                        <input
                          {...register("password_confirmation")}
                          id="password_confirmation"
                          name="password_confirmation"
                          type="password"
                          className={`w-[390px] p-[8px] rounded-[4px] border-[1px] border-[#C0C0C0] px-[10px] mt-[5px] outline-none
                              ${
                                type === "new" && errors.password_confirmation
                                  ? "border-red-500"
                                  : ""
                              }
                            `}
                          placeholder="******"
                        />
                        {type === "new" && errors.password_confirmation && (
                          <span className="absolute left-[202px] top-[45px] text-[12px] text-red-500">
                            Campo Obrigatório
                          </span>
                        )}
                      </div>

                      <div className="flex flex-col gap-[8px] items-start mr-[50px] text-[14px] font-normal">
                        <span className="flex items-center text-[#41414D]">
                          <LuDot /> As senhas devem ter pelo menos 6 caracteres.
                        </span>
                        <span className="flex items-center text-[#41414D]">
                          <LuDot /> As senhas devem ter pelo menos um número.
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end w-full gap-[32px] border-t border-[#C0C0C0] pt-[20px]">
                <button
                  type="button"
                  className="
                bg-white
                text-[#1B509A]
                rounded-[4px]
                p-[8px]
                border
                border-[#1B509A]
                flex
                items-center
                justify-center
                w-[130px]
                gap-[8px]
                font-[700]
                text-[16px]
                "
                  onClick={() => handleClose()}
                >
                  <IoCloseOutline size={24} color="#1B509A" />
                  Cancelar
                </button>

                <button
                  type="submit"
                  className="
                bg-[#1B509A]
                text-white
                rounded-[4px]
                p-[8px]
                flex
                items-center
                justify-center
                w-[130px]
                gap-[8px]
                font-[700]
                text-[16px]
                "
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="w-[20px] h-[20px] rounded-full border-4 border-t-4 border-gray-200 animate-spin"></div>
                    </div>
                  ) : (
                    <>
                      <IoCheckmarkOutline size={24} color="#fff" />
                      Salvar
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        </ModalTemplate>
      )}
    </div>
  );
};

export default UserModal;
