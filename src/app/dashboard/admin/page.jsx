"use client";
import React, { useEffect, useState } from "react";
import { 
  FiUsers, 
  FiShoppingBag, 
  FiDollarSign, 
  FiMenu, 
  FiClock,
  FiCheckCircle,
  FiXCircle,
  FiArrowRight
} from "react-icons/fi";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from "chart.js";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export default function DashboardAdminPage() {
  const [riwayat, setRiwayat] = useState([]);
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [resPesanan, resMenu] = await Promise.all([
          fetch("/api/pesanan"),
          fetch("/api/menu"),
        ]);

        const dataPesanan = await resPesanan.json();
        const dataMenu = await resMenu.json();

        setRiwayat(dataPesanan);
        setMenu(dataMenu);
      } catch (error) {
        console.error("Gagal memuat data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Prepare data for charts
  const orderStatusData = {
    labels: ["Pending", "Selesai", "Dibatalkan"],
    datasets: [
      {
        label: "Status Pesanan",
        data: [
          riwayat.filter(item => item.status === "pending").length,
          riwayat.filter(item => item.status === "selesai").length,
          riwayat.filter(item => item.status === "dibatalkan").length,
        ],
        backgroundColor: [
          "rgba(255, 206, 86, 0.7)",
          "rgba(75, 192, 192, 0.7)",
          "rgba(255, 99, 132, 0.7)",
        ],
        borderColor: [
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(255, 99, 132, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const monthlyRevenueData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul"],
    datasets: [
      {
        label: "Pendapatan (Rp)",
        data: [1200000, 1900000, 3000000, 2500000, 2000000, 2800000, 3200000],
        backgroundColor: "rgba(54, 162, 235, 0.7)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin h-10 w-10 border-4 border-blue-500 rounded-full border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">
          Dashboard Admin
        </h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-blue-500">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-500 text-sm">Total Pesanan</p>
                <h3 className="text-2xl font-bold text-gray-800">{riwayat.length}</h3>
              </div>
              <FiShoppingBag className="text-blue-500 text-2xl" />
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-green-500">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-500 text-sm">Total Menu</p>
                <h3 className="text-2xl font-bold text-gray-800">{menu.length}</h3>
              </div>
              <FiMenu className="text-green-500 text-2xl" />
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-purple-500">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-500 text-sm">Pendapatan Bulan Ini</p>
                <h3 className="text-2xl font-bold text-gray-800">
                  Rp{riwayat.reduce((sum, item) => sum + item.total, 0).toLocaleString("id-ID")}
                </h3>
              </div>
              <FiDollarSign className="text-purple-500 text-2xl" />
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-yellow-500">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-500 text-sm">Pelanggan</p>
                <h3 className="text-2xl font-bold text-gray-800">
                  {[...new Set(riwayat.map(item => item.user?.id))].length}
                </h3>
              </div>
              <FiUsers className="text-yellow-500 text-2xl" />
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4">Pendapatan Bulanan</h2>
            <div className="h-64">
              <Bar 
                data={monthlyRevenueData} 
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: "top",
                    },
                    tooltip: {
                      callbacks: {
                        label: function(context) {
                          return `Rp${context.raw.toLocaleString("id-ID")}`;
                        }
                      }
                    }
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                      ticks: {
                        callback: function(value) {
                          return `Rp${value.toLocaleString("id-ID")}`;
                        }
                      }
                    }
                  }
                }}
              />
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4">Status Pesanan</h2>
            <div className="h-64">
              <Pie 
                data={orderStatusData} 
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: "right",
                    },
                    tooltip: {
                      callbacks: {
                        label: function(context) {
                          const label = context.label || "";
                          const value = context.raw || 0;
                          const total = context.dataset.data.reduce((a, b) => a + b, 0);
                          const percentage = Math.round((value / total) * 100);
                          return `${label}: ${value} (${percentage}%)`;
                        }
                      }
                    }
                  }
                }}
              />
            </div>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
          <div className="p-4 border-b flex justify-between items-center">
            <h2 className="text-lg font-semibold">Pesanan Terbaru</h2>
            <a href="/admin/orders" className="text-blue-500 text-sm flex items-center">
              Lihat Semua <FiArrowRight className="ml-1" />
            </a>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Pelanggan</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tanggal</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {riwayat.slice(0, 5).map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{item.user?.name || "-"}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">Rp{item.total.toLocaleString("id-ID")}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        item.status === "pending" ? "bg-yellow-100 text-yellow-800" :
                        item.status === "selesai" ? "bg-green-100 text-green-800" :
                        "bg-red-100 text-red-800"
                      }`}>
                        {item.status === "pending" ? <FiClock className="mr-1" /> :
                         item.status === "selesai" ? <FiCheckCircle className="mr-1" /> :
                         <FiXCircle className="mr-1" />}
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(item.createdAt).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit"
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Menu Items */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-4 border-b flex justify-between items-center">
            <h2 className="text-lg font-semibold">Menu Terpopuler</h2>
            <a href="/admin/menu" className="text-blue-500 text-sm flex items-center">
              Lihat Semua <FiArrowRight className="ml-1" />
            </a>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {menu.slice(0, 6).map((item) => (
              <div key={item.id} className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                <div className="h-40 bg-gray-100 overflow-hidden">
                  {item.image ? (
                    <img 
                      src={item.image} 
                      alt={item.nama} 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = "/no-image.png";
                      }}
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <FiMenu className="text-gray-400 text-4xl" />
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-1">{item.nama}</h3>
                  <p className="text-gray-600 mb-2">Rp{item.harga.toLocaleString("id-ID")}</p>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    item.tersedia ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                  }`}>
                    {item.tersedia ? "Tersedia" : "Habis"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}