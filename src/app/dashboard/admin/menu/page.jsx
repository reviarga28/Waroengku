"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function AdminMenuPage() {
  const [menuList, setMenuList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    nama: "",
    deskripsi: "",
    harga: "",
    tersedia: true,
    image: null,
  });
  const [editId, setEditId] = useState(null);
  const [previewImage, setPreviewImage] = useState("");

  const getMenu = async () => {
    try {
      const res = await fetch("/api/menu");
      const data = await res.json();
      setMenuList(data);
    } catch (error) {
      Swal.fire("Error", "Gagal memuat data menu", "error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getMenu();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === "file") {
      const file = e.target.files[0];
      if (file) {
        // Validasi ukuran file (max 2MB)
        if (file.size > 2 * 1024 * 1024) {
          Swal.fire("Error", "Ukuran gambar maksimal 2MB", "error");
          return;
        }
        
        // Validasi tipe file
        if (!file.type.match("image.*")) {
          Swal.fire("Error", "Hanya file gambar yang diperbolehkan", "error");
          return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
          setForm({ ...form, image: reader.result });
          setPreviewImage(reader.result);
        };
        reader.readAsDataURL(file);
      }
    } else {
      setForm({ ...form, [name]: type === "checkbox" ? checked : value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const method = editId ? "PUT" : "POST";
      const url = editId ? `/api/menu/${editId}` : "/api/menu";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          ...form, 
          harga: Number(form.harga)
        }),
      });

      if (!response.ok) throw new Error("Gagal menyimpan menu");

      await Swal.fire({
        title: "Berhasil!",
        text: editId ? "Menu berhasil diupdate" : "Menu berhasil ditambahkan",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });

      // Reset form
      setForm({ nama: "", deskripsi: "", harga: "", tersedia: true, image: null });
      setPreviewImage("");
      setEditId(null);
      getMenu();
    } catch (error) {
      Swal.fire("Error", error.message || "Terjadi kesalahan", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    const { isConfirmed } = await Swal.fire({
      title: "Hapus Menu?",
      text: "Data menu akan dihapus permanen",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Ya, Hapus!",
      cancelButtonText: "Batal",
    });

    if (isConfirmed) {
      try {
        await fetch(`/api/menu/${id}`, { method: "DELETE" });
        await Swal.fire({
          title: "Berhasil!",
          text: "Menu berhasil dihapus",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
        getMenu();
      } catch (error) {
        Swal.fire("Error", "Gagal menghapus menu", "error");
      }
    }
  };

  const handleEdit = (menu) => {
    setEditId(menu.id);
    setForm({
      nama: menu.nama,
      deskripsi: menu.deskripsi || "",
      harga: menu.harga,
      tersedia: menu.tersedia,
      image: menu.image || null,
    });
    setPreviewImage(menu.image || "");
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="bg-white h-screen shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Kelola Menu</h1>

        {/* Form Section */}
        <div className="bg-gray-50 p-6 rounded-lg mb-8">
          <h2 className="text-xl font-semibold mb-4">
            {editId ? "Edit Menu" : "Tambah Menu Baru"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nama Menu
              </label>
              <input
                type="text"
                name="nama"
                value={form.nama}
                onChange={handleChange}
                placeholder="Nama menu"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Deskripsi
              </label>
              <textarea
                name="deskripsi"
                value={form.deskripsi}
                onChange={handleChange}
                placeholder="Deskripsi menu"
                rows={3}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Harga (Rp)
              </label>
              <input
                type="number"
                name="harga"
                value={form.harga}
                onChange={handleChange}
                placeholder="Harga"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Gambar Menu
              </label>
              {previewImage && (
                <div className="mb-2">
                  <img
                    src={previewImage}
                    alt="Preview"
                    className="h-32 object-cover rounded-md"
                  />
                </div>
              )}
              <input
                type="file"
                name="image"
                onChange={handleChange}
                accept="image/*"
                className="block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-md file:border-0
                  file:text-sm file:font-semibold
                  file:bg-blue-50 file:text-blue-700
                  hover:file:bg-blue-100"
              />
              <p className="mt-1 text-xs text-gray-500">
                Ukuran maksimal 2MB. Format: JPG, PNG, JPEG
              </p>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                name="tersedia"
                checked={form.tersedia}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label className="ml-2 block text-sm text-gray-700">
                Tersedia
              </label>
            </div>

            <div className="flex space-x-3 pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-4 py-2 rounded-md text-white ${isSubmitting ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Memproses...
                  </>
                ) : editId ? (
                  "Update Menu"
                ) : (
                  "Tambah Menu"
                )}
              </button>
              {editId && (
                <button
                  type="button"
                  onClick={() => {
                    setEditId(null);
                    setForm({ nama: "", deskripsi: "", harga: "", tersedia: true, image: null });
                    setPreviewImage("");
                  }}
                  className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                >
                  Batal
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Menu List Section */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nama
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Harga
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {menuList.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-4 text-center text-gray-500">
                    Tidak ada menu
                  </td>
                </tr>
              ) : (
                menuList.map((menu) => (
                  <tr key={menu.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {menu.image && (
                          <div className="flex-shrink-0 h-10 w-10 mr-3">
                            <img
                              className="h-10 w-10 rounded-full object-cover"
                              src={menu.image}
                              alt={menu.nama}
                              onError={(e) => {
                                e.target.src = "/image-found.png";
                              }}
                            />
                          </div>
                        )}
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {menu.nama}
                          </div>
                          <div className="text-sm text-gray-500 line-clamp-1">
                            {menu.deskripsi}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      Rp{menu.harga.toLocaleString("id-ID")}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          menu.tersedia
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {menu.tersedia ? "Tersedia" : "Habis"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <Link
                        href={`/dashboard/admin/menu/${menu.id}`}
                        className="inline-flex items-center px-3 py-1 bg-blue-100 hover:bg-blue-200 text-blue-800 rounded-md text-xs"
                      >
                        Detail
                      </Link>
                      <button
                        onClick={() => handleEdit(menu)}
                        className="inline-flex items-center px-3 py-1 bg-yellow-100 hover:bg-yellow-200 text-yellow-800 rounded-md text-xs"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(menu.id)}
                        className="inline-flex items-center px-3 py-1 bg-red-100 hover:bg-red-200 text-red-800 rounded-md text-xs"
                      >
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}