import { UserButton } from "@clerk/nextjs";

import MobileSidebar from "@/components/mobile-sidebar";
import { getApiLimitCount } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";

export const Navbar = async () => {
  const apiLimitCount = await getApiLimitCount();
  const isPro = await checkSubscription();

  return (
    <div className = "relative items-center p-4">
        <MobileSidebar isPro = {isPro} apiLimitCount = {apiLimitCount}/>
        <div className="flex w-full justify-end">
          <UserButton afterSignOutUrl = "/"/>
        </div>
    </div>
  )
}


export default Navbar;