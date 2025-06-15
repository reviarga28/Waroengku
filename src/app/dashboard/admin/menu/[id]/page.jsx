"use client";
import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Swal from "sweetalert2";
import { ArrowLeftIcon, Edit, TrashIcon } from "lucide-react";

export default function MenuDetailPage({ params }) {
  const { id } = use(params);
  const [menu, setMenu] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await fetch(`/api/menu/${id}`);
        if (!res.ok) {
          router.push("/not-found");
          return;
        }
        const data = await res.json();
        setMenu(data);
      } catch (error) {
        console.error("Error fetching menu:", error);
        Swal.fire("Error", "Gagal memuat detail menu", "error");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMenu();
  }, [id, router]);

  const handleDelete = async () => {
    const { isConfirmed } = await Swal.fire({
      title: "Hapus Menu?",
      text: "Menu yang dihapus tidak dapat dikembalikan",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Ya, Hapus!",
      cancelButtonText: "Batal",
    });

    if (isConfirmed) {
      try {
        const res = await fetch(`/api/menu/${id}`, { method: "DELETE" });
        if (!res.ok) throw new Error("Gagal menghapus menu");

        await Swal.fire({
          title: "Berhasil!",
          text: "Menu berhasil dihapus",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
        router.push("/dashboard/admin/menu");
      } catch (error) {
        Swal.fire("Error", error.message || "Gagal menghapus menu", "error");
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!menu) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Menu tidak ditemukan</h1>
          <Link
            href="/dashboard/admin/menu"
            className="text-blue-600 hover:underline"
          >
            Kembali ke daftar menu
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {/* Header with action buttons */}
          <div className="flex gap-2 items-center border-b">
          <div className="mt-2">
            <Link
              href="/dashboard/admin/menu"
              className="inline-flex items-center text-gray-600 hover:text-gray-800"
            >
              <ArrowLeftIcon className="ml-4" />
            </Link>
          </div>
            <h1 className="text-2xl font-bold text-gray-800">Detail Menu</h1>
          </div>

          {/* Menu Content */}
          <div className="p-6 md:flex">
            {menu.image && (
              <div className="md:w-1/2 mb-6 md:mb-0 md:pr-6">
                <img
                  src={menu.image}
                  alt={menu.nama}
                  className="w-full h-64 md:h-96 object-cover rounded-lg shadow"
                  onError={(e) => {
                    e.target.src = "/no-image.png";
                  }}
                />
              </div>
            )}

            <div className={`${menu.image ? "md:w-1/2" : "w-full"}`}>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {menu.nama}
              </h2>

              <div className="mb-4">
                <span className="text-3xl font-bold text-blue-600">
                  Rp{menu.harga.toLocaleString("id-ID")}
                </span>
                <span
                  className={`ml-3 px-3 py-1 rounded-full text-xs font-semibold ${
                    menu.tersedia
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {menu.tersedia ? "Tersedia" : "Habis"}
                </span>
              </div>

              {menu.deskripsi && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">Deskripsi</h3>
                  <p className="text-gray-700 whitespace-pre-line">
                    {menu.deskripsi}
                  </p>
                </div>
              )}

              <div className="text-sm text-gray-500">
                <p>
                  Dibuat:{" "}
                  {new Date(menu.createdAt).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
                {menu.updatedAt && (
                  <p>
                    Diupdate:{" "}
                    {new Date(menu.updatedAt).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Testimonials Section */}
          {menu.testimoni?.length > 0 && (
            <div className="border-t p-6">
              <h3 className="text-xl font-bold mb-4">Testimoni Pelanggan</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {menu.testimoni.map((t) => (
                  <div key={t.id} className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center mb-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-4 h-4 ${
                              i < t.rating ? "text-yellow-400" : "text-gray-300"
                            }`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="ml-2 text-sm text-gray-600">
                        {t.rating}/5
                      </span>
                    </div>
                    <p className="text-gray-700 italic">"{t.komentar}"</p>
                    {t.user && (
                      <p className="mt-2 text-sm text-gray-600">
                        - {t.user.name || "Pelanggan"}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
