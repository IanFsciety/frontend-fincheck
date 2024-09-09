import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { useAuth } from "../../../../../app/hooks/useAuth";
import { usersService } from "../../../../../app/services/usersService";
import { isExpirationDateValid } from "../../../../../app/utils/isExpirationDateValid";
import { isValidLuhn } from "../../../../../app/utils/isValidLuhn";
import { useDashboard } from "../../components/DashboardContext/useDashboard";

const schema = z.object({
  creditCardNumber: z
    .string()
    .length(16, { message: 'Número do cartão deve ter 16 dígitos' })
    .regex(/^\d+$/, 'Número do cartão deve conter apenas dígitos')
    .refine(isValidLuhn, { message: 'Número do cartão inválido' }), // Validação Luhn

  cardHolderName: z
    .string()
    .nonempty({ message: 'Nome do titular é obrigatório' }),

  expirationDate: z
    .string()
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Data de expiração deve estar no formato Mês/Ano')
    .refine(isExpirationDateValid, { message: 'Data inválida ou cartao vencido' }),

  cvv: z
    .string()
    .length(3, { message: 'CVV deve ter 3 dígitos' })
    .regex(/^\d+$/, 'CVV deve conter apenas dígitos')
    .nonempty({ message: 'CVV é obrigatório' }),
});

type FormData = z.infer<typeof schema>;

export function usePremiumModalController() {

  const { user } = useAuth()

  const {
    isPremiumPlanModalOpen,
    closePremiumPlanModal,
  } = useDashboard();

  const {
    register,
    handleSubmit: hookFormSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const queryClient = useQueryClient();
  const {
    isPending,
    mutateAsync,
  } = useMutation({
    mutationFn: usersService.update
  });

  const handleSubmit = hookFormSubmit(async () => {
    try {
      await mutateAsync({
        email: user!.email,
        isPremium: true,
        name: user!.name
      });

      queryClient.invalidateQueries({ queryKey: ['bankAccounts'] });
      toast.success('Seu Pagamento foi realizado com sucesso');
      reset();
      closePremiumPlanModal()

    } catch {
      toast.error('Erro ao finalizar seu pagamento')
    }
  });

  return {
    isPremiumPlanModalOpen,
    closePremiumPlanModal,
    register,
    errors,
    control,
    handleSubmit,
    isPending,
  }
}
