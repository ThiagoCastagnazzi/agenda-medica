import ModalTemplate from "../ModalTemplate";
import { FaTrash } from "react-icons/fa";
import Spinner from "../../Spinner";

interface ModalConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  action: () => void;
  loading?: boolean;
}

const ModalConfirm = ({
  isOpen,
  onClose,
  action,
  loading,
}: ModalConfirmModalProps) => {
  return (
    <div>
      {isOpen && (
        <ModalTemplate>
          <div
            className="
            bg-white
            rounded-[4px]
            w-[600px]
            max-w-[80vw]
            h-[80vh]
            max-h-[150px]
            flex
            flex-col
            gap-[20px]
            p-[20px]
            text-label
            "
          >
            <div>
              <span className="text-[22px] font-[500]">
                Deseja realmente excluir ?
              </span>
            </div>

            <div className="flex justify-end gap-[20px] border-t border-[#C0C0C0] pt-[20px]">
              <button
                className="
                text-[#1B509A]
                bg-white
                rounded-[4px]
                border
                border-[#1B509A]
                px-[16px]
                w-[130px]
                h-[44px]
                text-[16px]
                font-[700]
                "
                onClick={onClose}
              >
                Fechar
              </button>
              <button
                className="
                text-white
                bg-[#1B509A]
                rounded-[4px]
                px-[16px]
                w-[130px]
                h-[44px]
                text-[16px]
                font-[700]
                flex
                items-center
                gap-[8px]
                justify-center
                "
                onClick={action}
                disabled={loading}
              >
                {loading ? (
                  <Spinner />
                ) : (
                  <>
                    {" "}
                    <FaTrash size={24} /> Descartar
                  </>
                )}
              </button>
            </div>
          </div>
        </ModalTemplate>
      )}
    </div>
  );
};

export default ModalConfirm;
