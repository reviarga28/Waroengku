"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function DashboardLayout({ children }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login");
    }
  }, [status, router]);

  if (status === "loading" || status === "unauthenticated") return null;

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div
        className={`fixed md:fixed z-30 w-64 h-full transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <Sidebar />
      </div>

      <main className="flex-1 md:ml-64">
        <div className="sticky top-0 z-10">
          <Navbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        </div>
        <div className="bg-gray-100 min-h-[calc(100vh-4rem)]">
          {children}
        </div>
      </main>
    </div>
  );
}