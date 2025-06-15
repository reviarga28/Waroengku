"use client";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Bell, User, Menu as MenuIcon } from "lucide-react";

export default function Navbar({ onMenuClick }) {
  const { data: session } = useSession();
  const pathname = usePathname();

  if (!session) return null;

  const pageTitle = () => {
    if (pathname.includes("users")) return "User Management";
    if (pathname.includes("menu")) return "Menu";
    if (pathname.includes("pesanan")) return "Orders";
    if (pathname.includes("laporan")) return "Reports";
    if (pathname.includes("profile")) return "User Profile";
    if (pathname.includes("tagihan")) return "Billing";
    return "Dashboard";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full flex items-center justify-between py-3 px-4 bg-white shadow-sm border-b border-red-100"
    >
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="md:hidden text-red-700 hover:text-red-900"
        >
          <MenuIcon className="w-6 h-6" />
        </button>
        <div>
          <h1 className="text-xl md:text-2xl font-semibold text-red-800">
            {pageTitle()}
          </h1>
          <p className="text-xs md:text-sm text-red-500">
            Welcome, {session?.user?.name?.split(" ")[0]}!
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="relative text-red-600 hover:text-red-800">
          <Bell className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
            3
          </span>
        </button>
        <div className="flex items-center gap-2 bg-red-600/10 text-red-800 px-3 py-1 rounded-full text-sm">
          <User className="w-4 h-4" />
          <span className="capitalize hidden sm:inline">{session.user.role}</span>
        </div>
      </div>
    </motion.div>
  );
}