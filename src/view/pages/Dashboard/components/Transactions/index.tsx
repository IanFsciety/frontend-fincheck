import { ChevronDownIcon } from "@radix-ui/react-icons";
import { TransactionsIcon } from "../../../../components/icons/TransactionsIcon";
import { FilterIcon } from "../../../../components/icons/FilterIcon";
import { MONTHS } from "../../../../../app/config/constants";

import { Swiper, SwiperSlide } from "swiper/react";
import { SliderOption } from "./SliderOption";
import { SliderNavigation } from "./SliderNavigation";
import { formatCurrency } from "../../../../../app/utils/formatCurrency";
import { CategoryIcon } from "../../../../components/icons/categories/CategoryIcon";

export function Transactions() {
  return(
    <div className="bg-gray-100 rounded-2xl w-full h-full px-4 py-8 md:p-10">

      <header>
        <div className="flex items-center justify-between">
          <button className="flex items-center gap-2 ">
            <TransactionsIcon />
            <span className="text-sm text-gray-800 tracking-[-0.5px] font-medium">Transações</span>
            <ChevronDownIcon className="text-gray-900" />
          </button>

          <button>
            <FilterIcon />
          </button>
        </div>

        <div className="mt-6 relative">
          <Swiper
            slidesPerView={3}
            centeredSlides
          >
            <SliderNavigation />
            {MONTHS.map((month, index) => (
              <SwiperSlide key={month}>
               {({ isActive }) => (
                <SliderOption isActive={isActive} month={month} index={index} />
               )}
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </header>

      <div className="mt-4">

        <div className="bg-white p-16 rounded-2xl flex items-center justify-between gap-4">
          <div className="flex-1 flex items-center gap-3">
            <CategoryIcon type="expense" />

            <div>
              <strong className="font-bold tracking-[0.5px] block">Almoço</strong>
              <span className="text-sm text-gray-600">04/12/25</span>
            </div>
          </div>
          <span> - {formatCurrency(1320)}</span>
        </div>
      </div>
    </div>
  )
}
