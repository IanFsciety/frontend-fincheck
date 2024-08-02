import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';


import { AccountCard } from "./AccountCard";
import { AccountsSliderNavigation } from "./AccountsSliderNavigation";
import { EyeIcon } from '../../../../components/icons/EyeIcon';
import { useAccountsController } from './useAccountsController';


export function Accounts() {
  const {sliderState, setSliderState, windowWidth} = useAccountsController();

  return (
    <div className="bg-teal-900 rounded-2xl w-full h-full px-4 py-8 md:p-10 flex flex-col">

      <div className="">
        <span className="text-white tracking-[-0.5px] block">Saldo Total</span>

        <div className="flex items-center gap-2">
          <strong className="text-2xl tracking-[-1px] text-white">R$ 1000,00</strong>

          <button className="w-8 h-8 flex items-center justify-center">
            <EyeIcon open={true} />
          </button>

        </div>
      </div>

      <div className="flex-1 flex flex-col justify-end mt-10 md:mt-0">
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

              <AccountsSliderNavigation isBeginning={sliderState.isBeginning} isEnd={sliderState.isEnd} />
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
      </div>
    </div>
  )
}
