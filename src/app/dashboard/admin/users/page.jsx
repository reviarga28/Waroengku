"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

export default function UserPage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    const res = await axios.get("/api/user");
    setUsers(res.data);
  }

  async function handleRoleChange(id, currentRole) {
    const newRole = currentRole === "admin" ? "user" : "admin";
    const confirm = await Swal.fire({
      title: "Yakin ubah role?",
      text: `Role akan diubah menjadi ${newRole}`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Ya, ubah",
    });

    if (confirm.isConfirmed) {
      await axios.put(`/api/user/${id}/role`, { role: newRole });
      fetchUsers();
      Swal.fire("Berhasil", "Role berhasil diubah", "success");
    }
  }

  async function handleDeleteUser(id) {
    const confirm = await Swal.fire({
      title: "Yakin hapus user?",
      text: "Tindakan ini tidak bisa dibatalkan!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, hapus",
    });

    if (confirm.isConfirmed) {
      await axios.delete(`/api/user/${id}`);
      fetchUsers();
      Swal.fire("Berhasil", "User telah dihapus", "success");
    }
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Daftar User</h1>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Nama</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Role</th>
            <th className="p-2 border">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td className="p-2 border">{u.name}</td>
              <td className="p-2 border">{u.email}</td>
              <td className="p-2 border capitalize">{u.role}</td>
              <td className="p-2 border text-center space-x-2">
                <button
                  onClick={() => handleRoleChange(u.id, u.role)}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                >
                  Ubah Role
                </button>
                <button
                  onClick={() => handleDeleteUser(u.id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
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
