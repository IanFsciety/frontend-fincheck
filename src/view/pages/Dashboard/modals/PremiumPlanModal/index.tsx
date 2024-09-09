import { useAuth } from "../../../../../app/hooks/useAuth";
import { Button } from "../../../../components/Button";
import { Input } from "../../../../components/Input";
import { Modal } from "../../components/Modal";
import { usePremiumModalController } from "./usePremiumModalController";


export function PremiumPlanModal() {
  const {
    isPremiumPlanModalOpen,
    closePremiumPlanModal,
    register,
    errors,
    handleSubmit,
    isPending,
  } = usePremiumModalController();


  const { user } = useAuth()
  const isUserPremium = user?.isPremium

  if (isUserPremium) {
    return null
  }

  return (
    <Modal
      title={'Torne-se premium'}
      open={isPremiumPlanModalOpen}
      onClose={closePremiumPlanModal}
    >

      <div>
        <h2 className="text-2xl text-center text-gray-800 ">Valor <span className="text-teal-900">R$23,99</span> </h2>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mt-10 flex flex-col gap-4">
        <Input
            type="text"
            placeholder={'Nome do titular'}
            error={errors.cardHolderName?.message}
            maxLength={25}
            {...register('cardHolderName')}
          />

          <Input
            type="text"
            placeholder={'Número do cartão'}
            error={errors.creditCardNumber?.message}
            maxLength={16}
            {...register('creditCardNumber')}
          />

          <Input
            type="text"
            placeholder={'Data de expiração'}
            error={errors.expirationDate?.message}
            maxLength={5}
            {...register('expirationDate')}
          />

          <Input
            type="password"
            placeholder={'Cvv'}
            error={errors.cvv?.message}
            maxLength={3}
            {...register('cvv')}
          />

          <Button type="submit" className="w-full mt-6" isPending={isPending}>
            Criar
          </Button>

        </div>
      </form>
    </Modal>

  )
}
