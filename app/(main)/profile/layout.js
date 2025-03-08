import ProfileSidebar from "@/components/ProfilePage/ProfileSidebar";
import {
  CircleUserRound,
  LayoutDashboard,
  LogOut,
  MapPinHouse,
  PackageOpen,
} from "lucide-react";
import Link from "next/link";

export default async function SpecificLayout({ children }) {
  return (
    <div className="max-w-[1250px] m-auto py-10">
      <div className="flex flex-row gap-5">
        <ProfileSidebar />
        {children}
      </div>
    </div>
  );
}
