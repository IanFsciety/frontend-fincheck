import { z } from "zod";
import { useDashboard } from "../../components/DashboardContext/useDashboard";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bankAccountsService } from "../../../../../app/services/bankAccountsService/index";
import { currencyStringToNumber } from "../../../../../app/utils/currencyStringToNumber";
import toast from "react-hot-toast";

const schema = z.object({
  initialBalance: z.string().nonempty('Saldo inicial é obrigatório'),
  name: z.string().nonempty('Nome da conta é obrigatorio'),
  type: z.enum(['CHECKING', 'INVESTMENT', 'CASH']),
  color: z.string().nonempty('Cor é obrigatória'),
});

type FormData = z.infer<typeof schema>

export function useNewAccountModalController()  {
  const { isNewAccountModalOpen, closeNewAccountModal } = useDashboard()

  const {
    register,
    handleSubmit: hookFormSubmit,
    formState: { errors },
    control,
    reset

  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const queryClient = useQueryClient();
  const { isPending, mutateAsync } = useMutation({
    mutationFn: bankAccountsService.create
  });

  const handleSubmit = hookFormSubmit( async (data) => {
    try {
      await mutateAsync({
        ...data,
        initialBalance: currencyStringToNumber(data.initialBalance),

      });

      queryClient.invalidateQueries({queryKey: ['bankAccounts']})
      toast.success('Conta cadastrada com sucesso');
      reset();
      closeNewAccountModal();
    } catch {
      toast.error('Erro ao cadastrar a conta')
    }
  });

  return {
    isNewAccountModalOpen,
    closeNewAccountModal,
    register,
    errors,
    handleSubmit,
    control,
    isPending
  }
}
