import { Controller } from "react-hook-form";
import { useAuth } from "../../../../../app/hooks/useAuth";
import { Button } from "../../../../components/Button";
import { Input } from "../../../../components/Input";
import { Select } from "../../../../components/Select";
import { Modal } from "../../components/Modal";
import { useNewCategoryModalController } from "./useNewCategoryModalController";



export function NewCategoryModal() {
  const {
    isNewCategoryModalOpen,
    closeNewCategoryModal,
    control,
    register,
    errors,
    handleSubmit,
    isPending,
    categories,
    newTransactionType
  } = useNewCategoryModalController();


  const { user } = useAuth()
  const isUserPremium = user?.isPremium

  if (!isUserPremium) {
    return null
  }

  return (
    <Modal
      title={'Nova Categoria'}
      open={isNewCategoryModalOpen}
      onClose={closeNewCategoryModal}
    >

      <form onSubmit={handleSubmit}>
        <div className="mt-10 flex flex-col gap-4">
          <Input
            type="text"
            placeholder={'Nome da categoria'}
            error={errors.name?.message}
            {...register('name')}
          />


          <Controller
            control={control}
            name="type"
            defaultValue={newTransactionType!}
            render={({ field: { onChange, value } }) => (
              <Select
                placeholder="Tipo"
                error={errors.type?.message}
                onChange={onChange}
                value={value}
                options={[
                  {
                    value: newTransactionType!,
                    label: newTransactionType! === 'EXPENSE' ? 'Despesa' : 'Receita'
                  },
                ]}
              />
            )}
          />


          <Controller
            control={control}
            name="icon"
            defaultValue="Outro"
            render={({ field: { onChange, value } }) => (
              <Select
                placeholder="Icone"
                error={errors.icon?.message}
                onChange={onChange}
                value={value}
                options={categories.map( (category, index) => ({
                  value: category.icon,
                  label: category.name,
                  key: `${category.icon}-${index}`
                }))}
              />
            )}
          />

          <Button type="submit" className="w-full mt-6" isPending={isPending}>
            Criar
          </Button>

        </div>
      </form>
    </Modal>

  )
}
