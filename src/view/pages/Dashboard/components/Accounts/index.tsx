import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';


import { AccountCard } from "./AccountCard";
import { SliderNavigation } from "./SliderNavigation";
import { EyeIcon } from '../../../../components/icons/EyeIcon';
import { useAccountsController } from './useAccountsController';
import { formatCurrency } from '../../../../../app/utils/formatCurrency';
import { cn } from '../../../../../app/utils/cn';
import { Spinner } from '../../../../components/Spinner';
import { PlusIcon } from '@radix-ui/react-icons';


export function Accounts() {
  const {
    sliderState,
    setSliderState,
    windowWidth,
    areValuesVisible,
    toggleValueVisibility,
    isLoading,
    accounts,
    openNewAccountModal
  } = useAccountsController();

  return (
    <div className="bg-teal-900 rounded-2xl w-full h-full px-4 py-8 md:p-10 flex flex-col">
      {isLoading && (
        <div className='flex-1 flex items-center justify-center'>
          <Spinner className='text-teal-950/50 fill-white w-10 h-10'/>
        </div>
      )}

      {!isLoading && (
        <>
          <div>
            <span className="text-white tracking-[-0.5px] block">Saldo Total</span>

            <div className="flex items-center gap-2">
              <strong className={
                cn(
                  'text-2xl tracking-[-1px] text-white',
                  !areValuesVisible && 'blur-md',
                )}>
                {formatCurrency(1000.50)}</strong>

              <button className="w-8 h-8 flex items-center justify-center" onClick={toggleValueVisibility}>
                <EyeIcon open={!areValuesVisible} />
              </button>

            </div>
          </div>

          <div className="flex-1 flex flex-col justify-end mt-10 md:mt-0">

            {accounts.length === 0 &&
              <>
                <div className="mb-4" slot="container-start">
                  <strong className="text-white tracking-[-1px] text-lg font-bold">Minhas Contas</strong>
                </div>

                <button className="mt-4 h-52 border-2 border-teal-600 rounded-2xl border-dashed flex flex-col items-center justify-center gap-4 text-white hover:bg-teal-950/5 transition-colors" onClick={openNewAccountModal}>
                  <div className=" flex items-center justify-center border-2 border-white rounded-full h-11 w-11 border-dotted">
                    <PlusIcon className='w-6 h-6'/>
                  </div>
                  <span className="font-medium tracking[-0.5px] text-center">Cadastre uma <br /> nova conta</span>
                </button>
              </>
            }

            {accounts.length > 0 && (
              <div>
              <Swiper
                spaceBetween={16}
                slidesPerView={windowWidth >= 500 ? 2.07 : 1.2}
                onSlideChange={swiper => {
                  setSliderState({
                    isBeginning: swiper.isBeginning,
                    isEnd: swiper.isEnd,
                  })
                }}
              >
                <div className="flex items-center justify-between mb-4" slot="container-start">
                  <strong className="text-white tracking-[-1px] text-lg font-bold">Minhas Contas</strong>

                  <SliderNavigation isBeginning={sliderState.isBeginning} isEnd={sliderState.isEnd} />
                </div>

                <SwiperSlide>
                  <AccountCard type="CHECKING" color="#7950f2" name="Nubank" balance={1000.23} />
                </SwiperSlide>
                <SwiperSlide>
                  <AccountCard type="CASH" color="#0f0" name="Carteira" balance={1000.23} />
                </SwiperSlide>
                <SwiperSlide>
                  <AccountCard type="INVESTMENT" color="#333" name="XP Investimentos" balance={1000.23} />
                </SwiperSlide>
              </Swiper>
            </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}
