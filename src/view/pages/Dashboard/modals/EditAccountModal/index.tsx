import { Controller } from "react-hook-form";
import { Button } from "../../../../components/Button";
import { ColorsDropDownInput } from "../../../../components/ColorsDropDownInput";
import { Input } from "../../../../components/Input";
import { InputCurrency } from "../../../../components/InputCurrency";
import { Select } from "../../../../components/Select";
import { Modal } from "../../components/Modal";
import { useEditAccountModalController } from "../EditAccountModal/useEditAccountModalController"
import { TrashIcon } from "../../../../components/icons/TrashIcon";
import { ConfirmDeleteModal } from "../../../../components/ConfirmDeleteModal";

export function EditAccountModal() {
  const {
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
  } = useEditAccountModalController()


  if (isDeleteModalOpen) {
    return <ConfirmDeleteModal
    isPendingDelete={isPendingDelete}
    title="Tem certeza que  deseja excluir esta conta?"
    description="Ao Excluir a conta, também serão excluídos todos os registros de receita e despesas relacionados."
    onClose={handleCloseDeleteModal}
    onConfirm={handleDeleteAccount}
  />
  }

  return (
    <Modal
      title="Editar Conta"
      open={isEditAccountModalOpen}
      onClose={closeEditAccountModal}
      rightAction={
        <button onClick={handleOpenDeleteModal}>
          <TrashIcon className="w-6 h-6 text-red-900"/>
        </button>
      }
    >

      <form onSubmit={handleSubmit}>
        <div>
          <span className="block text-gray-600 tracking-[-0.5px] text-xs">Saldo incial</span>
          <div className="flex items-center gap-2">
            <span className="text-gray-600 tracking-[-0.5px] text-lg">R$</span>

            <Controller
              control={control}
              name="initialBalance"
              defaultValue="0"
              render={({ field: { onChange, value } }) => (
                <InputCurrency
                  error={errors.initialBalance?.message}
                  onChange={onChange}
                  value={value}
                />
              )}
            />
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4">
          <Input
            type="text"
            placeholder="Nome da Conta"
            error={errors.name?.message}
            {...register('name')}
          />

          <Controller
            control={control}
            name="type"
            defaultValue="CHECKING"
            render={({ field: { onChange, value } }) => (
              <Select
                placeholder="Tipo"
                error={errors.type?.message}
                onChange={onChange}
                value={value}
                options={[
                  {
                    value: 'CHECKING',
                    label: 'Conta Corrente'
                  },

                  {
                    value: 'INVESTMENT',
                    label: 'Investimentos'
                  },

                  {
                    value: 'CASH',
                    label: 'Dinheiro fisico'
                  },
                ]}
              />
            )}
          />

          <Controller
            control={control}
            name="color"
            defaultValue=""
            render={({ field: { onChange, value } }) => (
              <ColorsDropDownInput
                error={errors.color?.message}
                onChange={onChange}
                value={value}
              />
            )}
          />



          <Button type="submit" className="w-full mt-6" isPending={isPending}>
            Salvar
          </Button>
        </div>

      </form>
    </Modal>

  )
}
