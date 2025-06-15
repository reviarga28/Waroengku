"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Clock,
  CheckCircle2,
  XCircle,
  Loader2,
  CreditCard,
  Utensils,
  User,
} from "lucide-react";
import Swal from "sweetalert2";

export default function DetailPesanan() {
  const { id } = useParams();
  const [pesanan, setPesanan] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPesanan = async () => {
      try {
        const res = await fetch(`/api/pesanan/${id}`);
        if (!res.ok) throw new Error("Failed to fetch order");
        const data = await res.json();
        setPesanan(data);
      } catch (error) {
        Swal.fire("Error", "Gagal memuat detail pesanan", "error");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPesanan();
  }, [id]);

  const getStatusIcon = () => {
    switch (pesanan?.status) {
      case "pending":
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case "selesai":
        return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      case "dibatalkan":
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  if (!pesanan) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Pesanan tidak ditemukan</h1>
          <Link
            href="/dashboard/admin/pesanan"
            className="text-blue-600 hover:underline inline-flex items-center"
          >
            <ArrowLeft className="w-4 h-4 mr-1" /> Kembali ke daftar pesanan
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {/* Header */}
          <div className="flex items-center bg-gray-50 px-6 py-1 border-b">
              <Link
                href="/dashboard/admin/pesanan"
                className="inline-flex items-center text-gray-600 hover:text-gray-800"
              >
                <ArrowLeft className="w-6 h-6 mr-2" />
              </Link>
            <h1 className="text-2xl font-bold text-gray-800 flex items-center">
              Detail Pesanan
            </h1>
          </div>

          {/* Order Summary */}
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start">
                <User className="w-5 h-5 mr-3 text-gray-500 mt-0.5" />
                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    Pelanggan
                  </h3>
                  <p className="text-lg font-semibold">
                    {pesanan.user?.name || "Tidak ada nama"}
                  </p>
                  {pesanan.user?.email && (
                    <p className="text-sm text-gray-600">
                      {pesanan.user.email}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-start">
                <Clock className="w-5 h-5 mr-3 text-gray-500 mt-0.5" />
                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    Tanggal Pesanan
                  </h3>
                  <p className="text-lg font-semibold">
                    {new Date(pesanan.createdAt).toLocaleDateString("id-ID", {
                      weekday: "long",
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start">
                {getStatusIcon()}
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-gray-500">Status</h3>
                  <div className="flex items-center">
                    <p className="text-lg font-semibold capitalize mr-2">
                      {pesanan.status}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-start">
                <CreditCard className="w-5 h-5 mr-3 text-gray-500 mt-0.5" />
                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    Total Pembayaran
                  </h3>
                  <p className="text-2xl font-bold text-blue-600">
                    Rp{pesanan.total.toLocaleString("id-ID")}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div className="border-t px-6 py-4">
            <h2 className="text-lg font-semibold mb-4 flex items-center">
              <Utensils className="w-5 h-5 mr-2 text-blue-500" />
              Daftar Menu
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Menu
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Harga
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Jumlah
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Subtotal
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {pesanan.menuItems.map((item) => (
                    <tr key={item.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {item.menu.image && (
                            <div className="flex-shrink-0 h-10 w-10 mr-3">
                              <img
                                className="h-10 w-10 rounded-full object-cover"
                                src={item.menu.image}
                                alt={item.menu.nama}
                                onError={(e) => {
                                  e.target.src = "/no-image.png";
                                }}
                              />
                            </div>
                          )}
                          <div className="text-sm font-medium text-gray-900">
                            {item.menu.nama}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        Rp{item.menu.harga.toLocaleString("id-ID")}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.jumlah}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                        Rp
                        {(item.menu.harga * item.jumlah).toLocaleString(
                          "id-ID"
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Order Notes (if any) */}
          {pesanan.catatan && (
            <div className="border-t px-6 py-4 bg-gray-50">
              <h3 className="text-sm font-medium text-gray-500 mb-2">
                Catatan Pesanan
              </h3>
              <p className="text-gray-700 whitespace-pre-line">
                {pesanan.catatan}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
