import { Modal } from "../pages/Dashboard/components/Modal";
import { Button } from "./Button";
import { TrashIcon } from "./icons/TrashIcon";

interface ConfirmDeleteModalProps {
  onConfirm(): void;
  onClose(): void;
  title: string;
  description?: string;
  isPendingDelete: boolean;
}
export function ConfirmDeleteModal({ onClose, onConfirm, title, description, isPendingDelete }: ConfirmDeleteModalProps) {
  return (
    <Modal open title="Excluir" onClose={onClose}>
      <div className="flex flex-col items-center text-center gap-6">
        <div className="w-[52px] h-[52px] rounded-full bg-red-50 flex items-center justify-center">
          <TrashIcon className="w-6 h-6 text-red-900"/>
        </div>
          <p className="w-[180px] text-gray-800 font-bold tracking-[-0.5px]">{title}</p>
          {description && (
            <p className="tracking-[-0.5px] text-gray-800">{description}</p>
          )}
      </div>

      <div className="mt-10 flex flex-col gap-4">
        <Button
          variant="danger"
          className="w-full"
          onClick={onConfirm}
          isPending={isPendingDelete}
          >
          Sim, desejo excluir
        </Button>

        <Button
          onClick={onClose}
          variant="ghost"
          className="w-full"
          disabled={isPendingDelete}
        >
          Cancelar
        </Button>
      </div>
    </Modal>
  )
}
