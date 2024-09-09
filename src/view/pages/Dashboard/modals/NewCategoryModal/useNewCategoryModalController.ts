import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { useCategories } from "../../../../../app/hooks/useCategories";
import { categoriesService } from "../../../../../app/services/categoriesService";
import { useDashboard } from "../../components/DashboardContext/useDashboard";

const schema = z.object({
  name: z.string().nonempty('Informe o nome'),
  type: z.enum(['EXPENSE', 'INCOME']),
  icon: z.string().nonempty('Informe o icone'),
});

type FormData = z.infer<typeof schema>;

export function useNewCategoryModalController() {
  const {
    isNewCategoryModalOpen,
    closeNewCategoryModal,
    newTransactionType
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

  const { categories: categoriesList } = useCategories();
  const queryClient = useQueryClient();

  const {
    isPending,
    mutateAsync,
  } = useMutation({
    mutationFn: categoriesService.create
  });

  const handleSubmit = hookFormSubmit(async data => {
    try {
      await mutateAsync({
        ...data,
        name: data.name,
        type: data.type,
        icon: data.icon
      });

      queryClient.invalidateQueries({queryKey: ['transactions']})
      queryClient.invalidateQueries({queryKey: ['categories']})
      toast.success('Categoria cadastrada com sucesso');
      reset();
      closeNewCategoryModal();
    } catch {
      toast.error('Erro ao cadastrar a Categoria')
    }
  });

  const categories = useMemo(() => {
    return categoriesList.filter(category => category.type === newTransactionType);
  }, [categoriesList, newTransactionType]);

  return {
    isNewCategoryModalOpen,
    closeNewCategoryModal,
    register,
    errors,
    control,
    handleSubmit,
    isPending,
    categories,
    newTransactionType
  }
}
