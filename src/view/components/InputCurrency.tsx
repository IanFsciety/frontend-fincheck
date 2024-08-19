import { CrossCircledIcon } from '@radix-ui/react-icons';
import { NumericFormat } from 'react-number-format';
import { cn } from '../../app/utils/cn';

interface InputCurrentProps {
  error?: string;
  value?: string;
  onChange?(value: string): void;
}

export function InputCurrency({ error, value, onChange }: InputCurrentProps) {
  return (
    <div>
      <NumericFormat
        thousandSeparator="."
        decimalSeparator=","
        value={value}
        onChange={event => onChange?.(event.target.value)}
        className={cn(
          'w-full outline-none text-gray-800 text-[32px] font-bold tracking[-1px]',
          error && 'text-red-900'
        )}
      />

      {error && (
        <div className="flex gap-2 items-center text-red-900 mt-2">
          <CrossCircledIcon />
          <span className="text-xs ">{error}</span>
        </div>
      )}
    </div>
  )
}
