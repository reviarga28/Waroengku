"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { 
  Utensils, 
  History, 
  User, 
  Clock, 
  CheckCircle2, 
  XCircle,
  ArrowRight,
  ChevronRight,
  ShoppingCart,
  Settings,
  Loader2
} from "lucide-react";

export default function DashboardUserPage() {
  const [pesananTerakhir, setPesananTerakhir] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPesanan = async () => {
      try {
        const res = await fetch("/api/pesanan");
        const data = await res.json();

        if (data.length > 0) {
          const sorted = data.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );
          setPesananTerakhir(sorted[0]);
        }
      } catch (error) {
        console.error("Gagal memuat pesanan terakhir:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPesanan();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  const getStatusIcon = () => {
    switch (pesananTerakhir?.status) {
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'completed':
        return <CheckCircle2 className="w-4 h-4 text-green-500" />;
      case 'cancelled':
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
          Selamat Datang di Dashboard
        </h1>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <Link
            href="/dashboard/user/menu"
            className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all border border-gray-100 hover:border-blue-100"
          >
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-50 text-blue-600 mr-4">
                <Utensils className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-800">Pesan Makanan</h2>
                <p className="text-gray-500 text-sm">Lihat menu favorit Anda</p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400 ml-auto" />
            </div>
          </Link>

          <Link
            href="/dashboard/user/riwayat"
            className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all border border-gray-100 hover:border-blue-100"
          >
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-purple-50 text-purple-600 mr-4">
                <History className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-800">Riwayat Pesanan</h2>
                <p className="text-gray-500 text-sm">Lihat semua pesanan</p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400 ml-auto" />
            </div>
          </Link>

          <Link
            href="/dashboard/user/profile"
            className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all border border-gray-100 hover:border-blue-100"
          >
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-50 text-green-600 mr-4">
                <User className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-800">Pengaturan Akun</h2>
                <p className="text-gray-500 text-sm">Kelola profil Anda</p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400 ml-auto" />
            </div>
          </Link>
        </div>

        {/* Last Order */}
        {pesananTerakhir ? (
          <div className="bg-white p-6 rounded-lg shadow-sm mb-8 border border-gray-100">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800 flex items-center">
                <ShoppingCart className="w-5 h-5 mr-2 text-blue-500" />
                Pesanan Terakhir
              </h2>
              <Link 
                href="/dashboard/user/riwayat" 
                className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
              >
                Lihat semua <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Status</span>
                <span className="flex items-center font-medium">
                  {getStatusIcon()}
                  <span className="ml-1 capitalize">{pesananTerakhir.status}</span>
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Total</span>
                <span className="font-semibold text-blue-600">
                  Rp{pesananTerakhir.total.toLocaleString("id-ID")}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Tanggal</span>
                <span className="text-gray-700">
                  {new Date(pesananTerakhir.createdAt).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white p-6 rounded-lg shadow-sm mb-8 border border-gray-100 text-center">
            <ShoppingCart className="mx-auto h-10 w-10 text-gray-400 mb-3" />
            <h3 className="text-lg font-medium text-gray-900 mb-1">Belum ada pesanan</h3>
            <p className="text-gray-500 mb-4">Mulai pesan makanan favorit Anda</p>
            <Link
              href="/dashboard/user/menu"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              <Utensils className="w-4 h-4 mr-2" />
              Pesan Sekarang
            </Link>
          </div>
        )}

        {/* User Profile */}
        {pesananTerakhir?.user && (
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800 flex items-center">
                <User className="w-5 h-5 mr-2 text-green-500" />
                Profil Anda
              </h2>
              <Link 
                href="/dashboard/user/profile" 
                className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
              >
                Edit <Settings className="w-4 h-4 ml-1" />
              </Link>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Nama</span>
                <span className="font-medium">{pesananTerakhir.user.name}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Email</span>
                <span className="font-medium">{pesananTerakhir.user.email}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}