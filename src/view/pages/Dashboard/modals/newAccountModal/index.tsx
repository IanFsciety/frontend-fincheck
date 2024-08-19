import { Controller } from "react-hook-form";
import { Button } from "../../../../components/Button";
import { ColorsDropDownInput } from "../../../../components/ColorsDropDownInput";
import { Input } from "../../../../components/Input";
import { InputCurrency } from "../../../../components/InputCurrency";
import { Select } from "../../../../components/Select";
import { Modal } from "../../components/Modal";
import { useNewAccountModalController } from "./useNewAccountModalController";

export function NewAccountModal() {
  const {
    isNewAccountModalOpen,
    closeNewAccountModal,
    register,
    errors,
    handleSubmit,
    control
  } = useNewAccountModalController()

  return (
    <Modal
      title="Nova Conta"
      open={isNewAccountModalOpen}
      onClose={closeNewAccountModal}
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

          <ColorsDropDownInput error={errors.color?.message} />

          <Button>
            Criar
          </Button>
        </div>

      </form>
    </Modal>

  )
}
