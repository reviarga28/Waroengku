"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function AdminMenuPage() {
  const [menuList, setMenuList] = useState([]);
  const [form, setForm] = useState({
    nama: "",
    deskripsi: "",
    harga: "",
    tersedia: true,
    image: "",
  });

  const [editId, setEditId] = useState(null); // id menu yang sedang di-edit

  // Fetch data menu
  const getMenu = async () => {
    const res = await fetch("/api/menu");
    const data = await res.json();
    setMenuList(data);
  };

  useEffect(() => {
    getMenu();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  // Tambah atau Update Menu
  const handleSubmit = async (e) => {
    e.preventDefault();

    const method = editId ? "PUT" : "POST";
    const url = editId ? `/api/menu/${editId}` : "/api/menu";

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, harga: Number(form.harga) }),
    });

    setForm({ nama: "", deskripsi: "", harga: "", tersedia: true, image: "" });
    setEditId(null);
    getMenu();
  };

  // Hapus Menu
  const handleDelete = async (id) => {
    if (confirm("Yakin ingin menghapus menu ini?")) {
      await fetch(`/api/menu/${id}`, { method: "DELETE" });
      getMenu();
    }
  };

  // Edit Menu
  const handleEdit = (menu) => {
    setEditId(menu.id);
    setForm({
      nama: menu.nama,
      deskripsi: menu.deskripsi || "",
      harga: menu.harga,
      tersedia: menu.tersedia,
      image: menu.image || "",
    });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Kelola Menu</h1>

      {/* Form Tambah/Edit Menu */}
      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <input
          type="text"
          name="nama"
          value={form.nama}
          onChange={handleChange}
          placeholder="Nama menu"
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          name="deskripsi"
          value={form.deskripsi}
          onChange={handleChange}
          placeholder="Deskripsi"
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          name="harga"
          value={form.harga}
          onChange={handleChange}
          placeholder="Harga (Rp)"
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="image"
          value={form.image}
          onChange={handleChange}
          placeholder="URL Gambar"
          className="w-full p-2 border rounded"
        />
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="tersedia"
            checked={form.tersedia}
            onChange={handleChange}
          />
          <span>Tersedia</span>
        </label>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {editId ? "Update Menu" : "Tambah Menu"}
        </button>
      </form>

      {/* Tabel Daftar Menu */}
      <table className="w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Nama</th>
            <th className="p-2 border">Harga</th>
            <th className="p-2 border">Tersedia</th>
            <th className="p-2 border">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {menuList.map((menu) => (
            <tr key={menu.id}>
              <td className="p-2 border">{menu.nama}</td>
              <td className="p-2 border">Rp {menu.harga.toLocaleString()}</td>
              <td className="p-2 border">{menu.tersedia ? "Ya" : "Tidak"}</td>
              <td className="p-2 border space-x-2">
                <Link
                  href={`/dashboard/admin/menu/${menu.id}`}
                  className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                >
                  Detail
                </Link>
                <button
                  onClick={() => handleEdit(menu)}
                  className="bg-yellow-400 px-2 py-1 rounded text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(menu.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded text-sm"
                >
                  Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
