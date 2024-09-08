import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {useMutation, useQueryClient } from "@tanstack/react-query";
import { useBankAccounts } from "../../../../../app/hooks/useBankAccounts";
import { useCategories } from "../../../../../app/hooks/useCategories";
import { useMemo, useState } from "react";
import { transactionsService } from "../../../../../app/services/transactionsService";
import toast from "react-hot-toast";
import { currencyStringToNumber } from "../../../../../app/utils/currencyStringToNumber";
import { Transaction } from "../../../../../app/entities/Transaction";

const schema = z.object({
  value: z.union([
    z.string().nonempty('Saldo inicial é obrigatório'),
    z.number(),
  ]),
  name: z.string().nonempty('Informe o nome'),
  categoryId: z.string().nonempty('Informe a categoria'),
  bankAccountId: z.string().nonempty('Informe a categoria'),
  date: z.date(),
});

type FormData = z.infer<typeof schema>;

export function useEditTransactionModalController(
  transaction: Transaction | null,
  onClose: () => void
) {

  const {
    register,
    handleSubmit: hookFormSubmit,
    formState: { errors },
    control,
    reset,

  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      bankAccountId: transaction?.bankAccountId,
      categoryId: transaction?.categoryId,
      name: transaction?.name,
      value: transaction?.value,
      date: transaction ? new Date(transaction?.date) : new Date(),
    }
  });

  const queryClient = useQueryClient()
  const { accounts } = useBankAccounts();
  const { categories: categoriesList } = useCategories();

  const { isPending, mutateAsync: updateTransaction } = useMutation({
    mutationFn: transactionsService.update
  });
  const { isPending: isPendingDelete, mutateAsync: removeTransaction } = useMutation({
    mutationFn: transactionsService.remove
  });

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleSubmit = hookFormSubmit(async data => {
    try {
      await updateTransaction({
        ...data,
        id: transaction!.id,
        type: transaction!.type,
        value: currencyStringToNumber(data.value),
        date: data.date.toISOString(),
      });

      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      queryClient.invalidateQueries({ queryKey: ['bankAccounts'] });
      toast.success(
        transaction?.type === 'EXPENSE'
          ? 'Despesa editada com sucesso!'
          : 'Receita editada com sucesso!'
      );
      reset();
      onClose();
    } catch {
      toast.error(
        transaction?.type === 'EXPENSE'
          ? 'Erro ao editar a despesa!'
          : 'Erro ao editar a receita!'
      );
    }

  });

  async function handleDeleteTransaction() {
    try {
      await removeTransaction(transaction!.id,);

      queryClient.invalidateQueries({queryKey: ['transactions']});
      queryClient.invalidateQueries({ queryKey: ['bankAccounts'] });
      toast.success(`${transaction?.type === 'EXPENSE' ? 'Despesa' : 'Receita' } deletada com sucesso`);
      onClose();
    } catch {
      toast.error(`Erro ao remover a ${transaction?.type === 'EXPENSE' ? 'despesa' : 'receita' }`)
    }
  }

  const categories = useMemo(() => {
    return categoriesList.filter(category => category.type === transaction?.type);
  }, [categoriesList, transaction]);

  function handleOpenDeleteModal() {
    setIsDeleteModalOpen(true);
  }

  function handleCloseDeleteModal() {
    setIsDeleteModalOpen(false);
  }



  return {
    register,
    errors,
    control,
    handleSubmit,
    accounts,
    categories,
    isPending: isPending,
    isDeleteModalOpen,
    isPendingDelete: isPendingDelete,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
    handleDeleteTransaction
  }
}
