import { z } from "zod";
import { useDashboard } from "../../components/DashboardContext/useDashboard";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bankAccountsService } from "../../../../../app/services/bankAccountsService/index";
import { currencyStringToNumber } from "../../../../../app/utils/currencyStringToNumber";
import toast from "react-hot-toast";
import { useState } from "react";

const schema = z.object({
  initialBalance: z.union([
    z.string().nonempty('Saldo inicial é obrigatório'),
    z.number(),
  ]),
  name: z.string().nonempty('Nome da conta é obrigatorio'),
  type: z.enum(['CHECKING', 'INVESTMENT', 'CASH']),
  color: z.string().nonempty('Cor é obrigatória'),
});

type FormData = z.infer<typeof schema>

export function useEditAccountModalController()  {
  const { isEditAccountModalOpen, closeEditAccountModal, accountBeingEdited, } = useDashboard();


  const {
    register,
    handleSubmit: hookFormSubmit,
    formState: { errors },
    control,

  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      color: accountBeingEdited?.color,
      name: accountBeingEdited?.name,
      type: accountBeingEdited?.type,
      initialBalance: accountBeingEdited?.initialBalance,
    },
  });

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const queryClient = useQueryClient();
  const { isPending, mutateAsync: updateAccount } = useMutation({
    mutationFn: bankAccountsService.update
  });

  const { isPending: isPendingDelete, mutateAsync: removeAccount } = useMutation({
    mutationFn: bankAccountsService.remove
  });


  const handleSubmit = hookFormSubmit( async (data) => {
    try {
      await updateAccount({
        ...data,
        initialBalance: currencyStringToNumber(data.initialBalance),
        id: accountBeingEdited!.id,
      });

      queryClient.invalidateQueries({queryKey: ['bankAccounts']})
      toast.success('Conta editada com sucesso');
      closeEditAccountModal();
    } catch {
      toast.error('Erro ao salvar as altecações')
    }
  });

  function handleOpenDeleteModal() {
    setIsDeleteModalOpen(true);
  }

  function handleCloseDeleteModal() {
    setIsDeleteModalOpen(false);
  }

  async function handleDeleteAccount() {
    try {
      await removeAccount(accountBeingEdited!.id,);

      queryClient.invalidateQueries({queryKey: ['bankAccounts']})
      toast.success('Conta deletada com sucesso');
      closeEditAccountModal();
    } catch {
      toast.error('Erro ao remover a conta')
    }
  }

  return {
    isEditAccountModalOpen,
    closeEditAccountModal,
    register,
    errors,
    handleSubmit,
    control,
    isPending,
    isDeleteModalOpen,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
    handleDeleteAccount,
    isPendingDelete
  }
}
