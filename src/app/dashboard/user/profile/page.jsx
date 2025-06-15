"use client";
import React, { useEffect, useState } from "react";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Edit, 
  Loader2,
  ChevronRight,
  Shield,
  CreditCard,
  History
} from "lucide-react";
import Link from "next/link";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/pesanan");
        const data = await res.json();

        if (data.length > 0) {
          const sorted = data.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );
          const lastOrder = sorted[0];
          if (lastOrder?.user) {
            // Add mock profile data for demonstration
            setUser({
              ...lastOrder.user,
              phone: "+62 812-3456-7890",
              address: "Jl. Contoh No. 123, Kota Anda",
              joinDate: "2023-01-15"
            });
          }
        }
      } catch (error) {
        console.error("Gagal memuat profil:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center p-6 max-w-md">
          <User className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h2 className="text-xl font-medium text-gray-700 mb-2">Data pengguna tidak tersedia</h2>
          <p className="text-gray-500 mb-4">Anda belum melakukan pesanan atau terjadi kesalahan saat memuat data</p>
          <Link 
            href="/dashboard/user/menu" 
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Pesan Sekarang
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto">
        {/* Profile Header */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-800 flex items-center">
              <User className="w-6 h-6 mr-2 text-blue-500" />
              Profil Saya
            </h1>
            <Link 
              href="/dashboard/user/profile/edit" 
              className="flex items-center text-sm text-blue-600 hover:text-blue-800"
            >
              <Edit className="w-4 h-4 mr-1" /> Edit
            </Link>
          </div>

          <div className="flex items-center mb-6">
            <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center mr-4">
              <User className="w-10 h-10 text-gray-400" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-800">{user.name}</h2>
              <p className="text-gray-500">{new Date(user.joinDate).toLocaleDateString('id-ID', { 
                year: 'numeric', 
                month: 'long' 
              })}</p>
            </div>
          </div>

          {/* Profile Details */}
          <div className="space-y-4">
            <div className="flex items-start">
              <Mail className="w-5 h-5 text-gray-500 mt-0.5 mr-3" />
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="text-gray-800">{user.email}</p>
              </div>
            </div>

            <div className="flex items-start">
              <Phone className="w-5 h-5 text-gray-500 mt-0.5 mr-3" />
              <div>
                <p className="text-sm text-gray-500">Nomor Telepon</p>
                <p className="text-gray-800">{user.phone}</p>
              </div>
            </div>

            <div className="flex items-start">
              <MapPin className="w-5 h-5 text-gray-500 mt-0.5 mr-3" />
              <div>
                <p className="text-sm text-gray-500">Alamat</p>
                <p className="text-gray-800">{user.address}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Account Actions */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
          <Link 
            href="/dashboard/user/profile/security" 
            className="flex items-center justify-between p-4 border-b hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center">
              <Shield className="w-5 h-5 text-gray-500 mr-3" />
              <span>Keamanan Akun</span>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </Link>

          <Link 
            href="/dashboard/user/payment" 
            className="flex items-center justify-between p-4 border-b hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center">
              <CreditCard className="w-5 h-5 text-gray-500 mr-3" />
              <span>Metode Pembayaran</span>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </Link>

          <Link 
            href="/dashboard/user/orders" 
            className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center">
              <History className="w-5 h-5 text-gray-500 mr-3" />
              <span>Riwayat Pesanan</span>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </Link>
        </div>
      </div>
    </div>
  );
}