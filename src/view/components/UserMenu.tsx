import { ExitIcon } from "@radix-ui/react-icons";
import { DropdownMenu  } from "./DropDownMenu";
import { useAuth } from "../../app/hooks/useAuth";


export function UserMenu() {
  const { signout }  = useAuth();

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <div className="bg-teal-50 rounded-full cursor-pointer w-12 h-12 flex items-center justify-center border border-teal-100">
          <span className="text-sm text-teal-900 tracking-[0.5px] font-medium">IG</span>
        </div>
      </DropdownMenu.Trigger>

        <DropdownMenu.Content className="w-32">
          <DropdownMenu.Item
            onSelect={signout}
            className="flex items-center justify-between">
            Sair
            <ExitIcon className="w-4 h-4"/>
          </DropdownMenu.Item>
        </DropdownMenu.Content>

    </DropdownMenu.Root>
  )
}
