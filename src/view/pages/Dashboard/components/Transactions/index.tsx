import { FilterIcon } from "../../../../components/icons/FilterIcon";
import { MONTHS } from "../../../../../app/config/constants";
import { Swiper, SwiperSlide } from "swiper/react";
import { SliderOption } from "./SliderOption";
import { SliderNavigation } from "./SliderNavigation";
import { formatCurrency } from "../../../../../app/utils/formatCurrency";
import { CategoryIcon } from "../../../../components/icons/categories/CategoryIcon";
import { cn } from "../../../../../app/utils/cn";
import { useTransactionsController } from "./useTransactionsController";
import { Spinner } from "../../../../components/Spinner";
import emptyLogo from "../../../../../assets/images/empty-state.svg"
import { TransactionTypeDropdown } from "./TransactionTypeDropdown";
import { FiltersModal } from "./FiltersModal";
import { formatDate } from "../../../../../app/utils/formatDate";

export function Transactions() {
  const {
    areValuesVisible,
    transactions,
    isInitialLoading,
    isPending,
    handleOpenFiltersModal,
    handleCloseFiltersModal,
    isFiltersModalOpen,
    handleChangeFilters,
    filters
  } = useTransactionsController();

  const hasTransactions = transactions.length > 0

  return (
    <div className="bg-gray-100 rounded-2xl w-full h-full px-4 py-8 md:p-10 flex flex-col">

      {isInitialLoading && (
        <div className="flex-1 flex items-center justify-center">
          <Spinner className="w-10 h-10" />
        </div>
      )}

      {!isInitialLoading && (
        <>
          <FiltersModal
            open={isFiltersModalOpen} onClose={handleCloseFiltersModal}
          />
          <header>
            <div className="flex items-center justify-between">

              <TransactionTypeDropdown />

              <button onClick={handleOpenFiltersModal}>
                <FilterIcon />
              </button>
            </div>

            <div className="mt-6 relative">
              <Swiper
                slidesPerView={3}
                centeredSlides
                initialSlide={filters.month}
                onSlideChange={swiper => {
                  handleChangeFilters('month')(swiper.realIndex)
                }}
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

          <div className="mt-4 space-y-2 flex-1 overflow-y-auto">
            {isPending && (
              <div className="w-full h-full flex items-center justify-center flex-col">
                <Spinner className="w-10 h-10" />
              </div>
            )}

            {(!hasTransactions && !isPending) && (
              <div className="w-full h-full flex items-center justify-center flex-col gap-4">
                <img src={emptyLogo} alt="" />
                <p className="text-gray-700">Não encontramos nenhuma transação!</p>
              </div>
            )}

            {(hasTransactions && !isPending) && (
              <>
                {transactions.map(transaction => (
                  <div
                    key={transaction.id}
                    className="bg-white p-4 rounded-2xl flex items-center justify-between gap-4"
                  >
                  <div className="flex-1 flex items-center gap-3">
                    <CategoryIcon
                      type={transaction.type === 'EXPENSE' ? 'expense' : 'income'}
                      category={transaction.category?.icon}
                    />

                    <div>
                      <strong className="font-bold tracking-[-0.5px] block">{transaction.name}</strong>
                      <span className="text-sm text-gray-600">{formatDate(new Date(transaction.date))}</span>
                    </div>
                  </div>
                  <span className={cn(
                    transaction.type === 'EXPENSE'
                    ? 'text-red-800 tracking-[-0.5px] font-medium'
                    : 'text-green-800 tracking-[-0.5px] font-medium',
                    !areValuesVisible && 'blur-sm'
                  )}>{transaction.type === 'EXPENSE' ? '-' : '+'} {formatCurrency(transaction.value)}</span>
                </div>
                ))}
              </>
            )}

          </div>
        </>
      )}

    </div>
  )
}
