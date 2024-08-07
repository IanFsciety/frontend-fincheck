import { Logo } from "./Logo";
import { Spinner } from "./Spinner";
import { Transition } from "@headlessui/react"

interface LuncherScreenProps {
  isLoading: boolean;
}

export function LunchScreen({ isLoading }: LuncherScreenProps) {
  return (
    <Transition
      show={isLoading}
      enter="transation-opacity duration-75"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transation-opacity duration-150"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className="bg-teal-900 fixed top-0 left-0 h-full w-full grid place-items-center z-50">
        <div className=" flex flex-col items-center justify-center gap-4">
          <Logo className="h-10 text-white" />
          <Spinner className="text-teal-900 fill-white" />
        </div>
      </div>
    </Transition>
  )
}
