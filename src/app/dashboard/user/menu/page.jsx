"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import Swal from "sweetalert2";
import Image from "next/image";

export default function MenuUserPage() {
  const [menu, setMenu] = useState([]);
  const [keranjang, setKeranjang] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { data: session } = useSession();

  useEffect(() => {
    axios
      .get("/api/menu")
      .then((res) => {
        setMenu(res.data);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, []);

  const tambahKeKeranjang = (item) => {
    const index = keranjang.findIndex((i) => i.menuId === item.id);
    if (index !== -1) {
      const updated = [...keranjang];
      updated[index].jumlah += 1;
      setKeranjang(updated);
    } else {
      setKeranjang([...keranjang, { menuId: item.id, jumlah: 1 }]);
    }
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Ditambahkan ke keranjang",
      showConfirmButton: false,
      timer: 1000,
      toast: true,
    });
  };

  const hapusItemKeranjang = (menuId) => {
    setKeranjang(keranjang.filter((item) => item.menuId !== menuId));
  };

  const buatPesanan = async () => {
    if (!session?.user?.id) {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Anda belum login!",
      });
    }

    if (keranjang.length === 0) {
      return Swal.fire({
        icon: "warning",
        title: "Keranjang Kosong",
        text: "Tambahkan menu terlebih dahulu",
      });
    }

    try {
      const totalItem = keranjang.reduce((sum, item) => sum + item.jumlah, 0);
      const { value: confirm } = await Swal.fire({
        title: "Konfirmasi Pesanan",
        text: `Anda akan memesan ${totalItem} item`,
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ya, Pesan Sekarang!",
        cancelButtonText: "Batal",
      });

      if (confirm) {
        // Expand item berdasarkan jumlah
        const expandedItems = keranjang.flatMap((item) =>
          Array(item.jumlah).fill({ menuId: item.menuId, jumlah: 1 })
        );

        await axios.post("/api/pesanan", {
          userId: session.user.id,
          items: expandedItems,
        });

        setKeranjang([]);
        Swal.fire({
          icon: "success",
          title: "Pesanan Berhasil!",
          text: "Pesanan Anda sedang diproses",
          timer: 2000,
        });
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Gagal Memesan",
        text: "Terjadi kesalahan saat memproses pesanan",
      });
    }
  };

  const ubahJumlah = (menuId, action) => {
    setKeranjang((prev) =>
      prev.map((item) =>
        item.menuId === menuId
          ? {
              ...item,
              jumlah:
                action === "tambah"
                  ? item.jumlah + 1
                  : Math.max(1, item.jumlah - 1),
            }
          : item
      )
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Menu Makanan
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
        {menu.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <div className="relative h-48 overflow-hidden">
              <img
                src={item.image}
                alt={item.nama}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = "/image-found.png";
                }}
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <h2 className="text-xl font-bold text-white">{item.nama}</h2>
                <p className="text-white/90 font-semibold">
                  Rp{item.harga.toLocaleString("id-ID")}
                </p>
              </div>
            </div>
            <div className="p-4">
              <p className="text-gray-600 mb-4 line-clamp-2">{item.deskripsi}</p>
              <button
                onClick={() => tambahKeKeranjang(item)}
                className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors duration-200"
              >
                Tambah ke Keranjang
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="fixed bottom-4 right-4 z-10">
        <div className="relative">
          {keranjang.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
              {keranjang.reduce((sum, item) => sum + item.jumlah, 0)}
            </span>
          )}
          <button
            onClick={() => {
              if (keranjang.length === 0) {
                Swal.fire({
                  icon: "info",
                  title: "Keranjang Kosong",
                  text: "Tambahkan menu terlebih dahulu",
                });
              }
            }}
            className="p-4 bg-green-600 hover:bg-green-700 text-white rounded-full shadow-lg transition-colors duration-200"
          >
            🛒
          </button>
        </div>
      </div>

      {keranjang.length > 0 && (
        <div className="fixed inset-0 bg-black/50 z-20 flex justify-end">
          <div className="bg-white w-full max-w-md h-full overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Keranjang</h2>
                <button
                  onClick={() => setKeranjang([])}
                  className="text-red-500 hover:text-red-700"
                >
                  Kosongkan
                </button>
              </div>

              <ul className="divide-y divide-gray-200 mb-6">
                {keranjang.map((item, idx) => {
                  const menuItem = menu.find((m) => m.id === item.menuId);
                  return (
                    <li key={idx} className="py-4 flex justify-between items-center">
                      <div>
                        <h3 className="font-medium text-gray-900">
                          {menuItem?.nama}
                        </h3>
                        <p className="text-gray-500">
                          Rp{menuItem?.harga.toLocaleString("id-ID")} × {item.jumlah}
                        </p>
                        <div className="flex gap-2 mt-2">
                          <button
                            onClick={() => ubahJumlah(item.menuId, "kurang")}
                            className="px-2 bg-gray-200 hover:bg-gray-300 rounded"
                          >
                            -
                          </button>
                          <span>{item.jumlah}</span>
                          <button
                            onClick={() => ubahJumlah(item.menuId, "tambah")}
                            className="px-2 bg-gray-200 hover:bg-gray-300 rounded"
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <span className="font-bold mr-4">
                          Rp{(menuItem?.harga * item.jumlah).toLocaleString("id-ID")}
                        </span>
                      </div>
                    </li>
                  );
                })}
              </ul>

              <div className="border-t border-gray-200 pt-4 mb-6">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total:</span>
                  <span>
                    Rp
                    {keranjang
                      .reduce((sum, item) => {
                        const menuItem = menu.find((m) => m.id === item.menuId);
                        return sum + (menuItem?.harga || 0) * item.jumlah;
                      }, 0)
                      .toLocaleString("id-ID")}
                  </span>
                </div>
              </div>

              <button
                onClick={buatPesanan}
                className="w-full py-3 bg-green-600 hover:bg-green-700 text-white rounded-md font-bold transition-colors duration-200"
              >
                Pesan Sekarang
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
