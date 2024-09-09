import { ExitIcon } from "@radix-ui/react-icons";
import { MdOutlineWorkspacePremium } from "react-icons/md";

import { useEffect } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../../app/hooks/useAuth";
import { useDashboard } from "../pages/Dashboard/components/DashboardContext/useDashboard";
import { DropdownMenu } from "./DropDownMenu";


export function UserMenu() {
  const { signout, user}  = useAuth();

  const { openPremiumPlanModal } = useDashboard();


  useEffect(() => {
    if (user?.isPremium) {
      const timer = setTimeout(() => {
        toast.success(`${user.name} você é um usuário premium`);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [user]);

  return (

    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <div className="bg-teal-50 rounded-full cursor-pointer w-12 h-12 flex items-center justify-center border border-teal-100">
          <span className="text-sm text-teal-900 tracking-[0.5px] font-medium">
            {user?.name.slice(0, 2).toUpperCase()}
          </span>
        </div>
      </DropdownMenu.Trigger>

        <DropdownMenu.Content className="w-36">

          {!user?.isPremium && (
            <DropdownMenu.Item
              onSelect={openPremiumPlanModal}
              className="flex items-center justify-between data-[highlighted]:text-teal-900 transition-colors"
            >
              Premium
              <MdOutlineWorkspacePremium className="w-5 h-5 text-teal-600"/>
            </DropdownMenu.Item>
          )}

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
