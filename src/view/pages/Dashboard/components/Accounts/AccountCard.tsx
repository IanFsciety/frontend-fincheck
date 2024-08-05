import { cn } from "../../../../../app/utils/cn";
import { formatCurrency } from "../../../../../app/utils/formatCurrency";
import { BankAccountTypeIcon } from "../../../../components/icons/bankAccountTypeIcon";
import { useDashboard } from "../DashboardContext/useDashboard";


interface AccountCardProps {
  color: string;
  name: string;
  balance: number
  type: 'CASH' | 'CHECKING' | 'INVESTMENT';
}


export function AccountCard({ color, name, balance, type }: AccountCardProps) {
  const { areValuesVisible } = useDashboard()

  return (
    <div className=" flex flex-col justify-between p-4 bg-white rounded-2xl h-[200px] border-b-4 border-teal-950" style={{ borderColor: color }}>

      <div>
        <BankAccountTypeIcon type={type}/>
        <span className="text-gray-800 font-medium tracking-[0.5px] mt-4 block">{name}</span>
      </div>

      <div>
        <span className={cn(
          'text-gray-800 font-medium tracking-[0.5px] block',
          !areValuesVisible && 'blur-sm',
        )}>{formatCurrency(balance)}</span>
        <small className="text-gray-600 text-sm">Saldo atual</small>
      </div>

    </div>
  )
}
