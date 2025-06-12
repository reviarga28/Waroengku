"use client";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import {
  Home,
  Users,
  Utensils,
  ClipboardList,
  FileText,
  User as UserIcon,
  CreditCard,
  LogOut,
  ChevronRight,
  Crown,
  User,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

export default function Sidebar() {
  const { data: session } = useSession();
  const pathname = usePathname();

  if (!session) return null;

  const isAdmin = session.user.role === "admin";

  const isActive = (href) => pathname ===(href);

  return (
    <aside className="w-64 bg-gradient-to-b from-red-700 to-red-800 text-white h-screen fixed left-0 top-0 p-6 shadow-xl z-10">
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="mb-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 mb-2"
          >
            <div className="p-2 bg-white/20 rounded-lg">
              {isAdmin ? (
                <Crown className="w-6 h-6 text-yellow-300" />
              ) : (
                <User className="w-6 h-6 text-white" />
              )}
            </div>
            <div>
              <h2 className="text-xl font-bold">WaroengkuApp</h2>
              <p className="text-red-100 text-xs">
                {isAdmin ? "Admin Dashboard" : "Dashboard"}
              </p>
            </div>
          </motion.div>
        </div>

        {/* Navigation */}
        <nav className="flex-1">
          <ul className="space-y-1">
            <li>
              <Link
                href={isAdmin ? "/dashboard/admin" : "/dashboard/user"}
                className={`flex items-center justify-between gap-3 p-3 rounded-lg transition-all ${
                  isActive(isAdmin ? "/dashboard/admin" : "/dashboard/user")
                    ? "bg-white text-red-700 font-medium shadow-md"
                    : "hover:bg-red-600/80"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Home className="w-5 h-5" />
                  <span>Dashboard</span>
                </div>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </li>

            {isAdmin ? (
              <>
                <motion.li
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <Link
                    href="/dashboard/admin/users"
                    className={`flex items-center justify-between gap-3 p-3 rounded-lg transition-all ${
                      isActive("/dashboard/admin/users")
                        ? "bg-white text-red-700 font-medium shadow-md"
                        : "hover:bg-red-600/80"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Users className="w-5 h-5" />
                      <span>Users</span>
                    </div>
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </motion.li>
                <motion.li
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 }}
                >
                  <Link
                    href="/dashboard/admin/menu"
                    className={`flex items-center justify-between gap-3 p-3 rounded-lg transition-all ${
                      isActive("/dashboard/admin/menu")
                        ? "bg-white text-red-700 font-medium shadow-md"
                        : "hover:bg-red-600/80"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Utensils className="w-5 h-5" />
                      <span>Menu</span>
                    </div>
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </motion.li>
                <motion.li
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <Link
                    href="/dashboard/admin/pesanan"
                    className={`flex items-center justify-between gap-3 p-3 rounded-lg transition-all ${
                      isActive("/dashboard/admin/pesanan")
                        ? "bg-white text-red-700 font-medium shadow-md"
                        : "hover:bg-red-600/80"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <ClipboardList className="w-5 h-5" />
                      <span>Orders</span>
                    </div>
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </motion.li>
                <motion.li
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.25 }}
                >
                  <Link
                    href="/dashboard/admin/laporan"
                    className={`flex items-center justify-between gap-3 p-3 rounded-lg transition-all ${
                      isActive("/dashboard/admin/laporan")
                        ? "bg-white text-red-700 font-medium shadow-md"
                        : "hover:bg-red-600/80"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5" />
                      <span>Reports</span>
                    </div>
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </motion.li>
              </>
            ) : (
              <>
                <motion.li
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <Link
                    href="/dashboard/user/profile"
                    className={`flex items-center justify-between gap-3 p-3 rounded-lg transition-all ${
                      isActive("/dashboard/user/profile")
                        ? "bg-white text-red-700 font-medium shadow-md"
                        : "hover:bg-red-600/80"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <UserIcon className="w-5 h-5" />
                      <span>Profile</span>
                    </div>
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </motion.li>
                                <motion.li
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 }}
                >
                  <Link
                    href="/dashboard/user/menu"
                    className={`flex items-center justify-between gap-3 p-3 rounded-lg transition-all ${
                      isActive("/dashboard/user/menu")
                        ? "bg-white text-red-700 font-medium shadow-md"
                        : "hover:bg-red-600/80"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Utensils className="w-5 h-5" />
                      <span>Menu</span>
                    </div>
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </motion.li>
                <motion.li
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 }}
                >
                  <Link
                    href="/dashboard/user/tagihan"
                    className={`flex items-center justify-between gap-3 p-3 rounded-lg transition-all ${
                      isActive("/dashboard/user/tagihan")
                        ? "bg-white text-red-700 font-medium shadow-md"
                        : "hover:bg-red-600/80"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <CreditCard className="w-5 h-5" />
                      <span>Billing</span>
                    </div>
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </motion.li>
              </>
            )}
          </ul>
        </nav>

        {/* Footer */}
        <div className="mt-auto pt-4 border-t border-red-600/50">
          <motion.button
            whileHover={{ x: 5 }}
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-red-600/80 transition-all text-red-100 hover:text-white cursor-pointer"
          >
            <LogOut className="w-5 h-5" />
            <span>Sign Out</span>
          </motion.button>
          <div className="text-red-100 text-xs mt-4 p-2 bg-red-900/20 rounded-lg">
            <p className="font-medium truncate">{session.user.email}</p>
            <p className="text-red-200 capitalize">{session.user.role}</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
