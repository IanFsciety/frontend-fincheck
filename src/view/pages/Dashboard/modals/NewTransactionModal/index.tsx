import { Controller } from "react-hook-form";
import { useAuth } from "../../../../../app/hooks/useAuth";
import { Button } from "../../../../components/Button";
import { DatePickerInput } from "../../../../components/DatePickerInput";
import { Input } from "../../../../components/Input";
import { InputCurrency } from "../../../../components/InputCurrency";
import { Select } from "../../../../components/Select";
import { useDashboard } from "../../components/DashboardContext/useDashboard";
import { Modal } from "../../components/Modal";
import { NewCategoryModal } from "../NewCategoryModal";
import { useNewTransactionModalController } from "./useNewTransactionModalController";

export function NewTransactionModal() {
  const {
    isNewTransactionModalOpen,
    closeNewTransactionModal,
    newTransactionType,
    register,
    errors,
    handleSubmit,
    control,
    accounts,
    categories,
    isPending
  } = useNewTransactionModalController();

  const isExpense = newTransactionType === 'EXPENSE';

  const { user } = useAuth()
  const isUserPremium = user?.isPremium
  const { openNewCategoryModal, isNewCategoryModalOpen } = useDashboard()

  if (isNewCategoryModalOpen) {
    return <NewCategoryModal />
  }

  return (
    <Modal
      title={isExpense ? 'Nova Despesa' : 'Nova Receita'}
      open={isNewTransactionModalOpen}
      onClose={closeNewTransactionModal}
    >

      <form onSubmit={handleSubmit}>
        <div>
          <span className="block text-gray-600 tracking-[-0.5px] text-xs">
            Valor {isExpense ? 'da despesa' : 'da receita'}
          </span>
          <div className="flex items-center gap-2">
            <span className="text-gray-600 tracking-[-0.5px] text-lg">R$</span>
            <Controller
              control={control}
              name="value"
              defaultValue="0"
              render={({ field: { onChange } }) => (
                <InputCurrency
                  error={errors.value?.message}
                  onChange={onChange}
                  value={0}
                />
              )}
            />
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4">
          <Input
            type="text"
            placeholder={isExpense ? 'Nome da Despesa' : 'Nome da Receita'}
            error={errors.name?.message}
            {...register('name')}
          />

          <div>
            <Controller
              control={control}
              name="categoryId"
              defaultValue=""
              render={({ field: { onChange } }) => (
                <Select
                  placeholder="Categoria"
                  onChange={onChange}
                  error={errors.categoryId?.message}
                  options={categories.map(category => ({
                    value: category.id,
                    label: category.name

                  }))}
                  />
                )}
              />
              <div className="flex items-center justify-between mt-2">

                <button
                  type="button"
                  disabled={!isUserPremium}
                  onClick={openNewCategoryModal}
                  className="text-sm w-1/2 px-1 text-teal-900 hover:text-teal-700 disabled:text-gray-600 disabled:cursor-not-allowed"
                >
                  Crie uma nova Categoria
                </button>
                {!isUserPremium && (
                  <button type="button" className="text-sm text-teal-900 hover:text-teal-700">Torne-se Premium</button>
                )}

              </div>
          </div>

          <Controller
            control={control}
            name="bankAccountId"
            defaultValue=""
            render={({ field: { onChange } }) => (
              <Select
                placeholder={isExpense ? 'Pagar Com' : 'Receber Com'}
                onChange={onChange}
                error={errors.bankAccountId?.message}
                options={accounts.map(account => ({
                  value: account.id,
                  label: account.name
                }))}
              />
            )}
          />

          <Controller
            control={control}
            name="date"
            defaultValue={new Date()}
            render={({ field: { onChange } }) => (
              <DatePickerInput error={ errors.date?.message } onChange={onChange}/>
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
