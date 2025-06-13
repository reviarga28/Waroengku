'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Swal from 'sweetalert2';

export default function AdminPesananPage() {
  const [pesanan, setPesanan] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetch('/api/pesanan')
      .then(res => res.json())
      .then(data => setPesanan(data));
  }, []);

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: 'Hapus pesanan?',
      text: 'Data akan dihapus permanen',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Hapus',
      cancelButtonText: 'Batal',
    });

    if (confirm.isConfirmed) {
      await fetch(`/api/pesanan/${id}`, { method: 'DELETE' });
      setPesanan(prev => prev.filter(p => p.id !== id));
      Swal.fire('Berhasil', 'Pesanan telah dihapus', 'success');
    }
  };

  const handleStatusChange = async (id, status) => {
    await fetch(`/api/pesanan/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    setPesanan(prev =>
      prev.map(p => (p.id === id ? { ...p, status } : p))
    );
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Manajemen Pesanan</h1>

      <table className="w-full border text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">User</th>
            <th className="border p-2">Total</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {pesanan.map((p) => (
            <tr key={p.id}>
              <td className="border p-2">{p.user?.name || 'Tanpa Nama'}</td>
              <td className="border p-2">Rp {p.total}</td>
              <td className="border p-2">
                <select
                  value={p.status}
                  onChange={(e) => handleStatusChange(p.id, e.target.value)}
                  className="border rounded p-1"
                >
                  <option value="pending">Pending</option>
                  <option value="selesai">Selesai</option>
                  <option value="dibatalkan">Dibatalkan</option>
                </select>
              </td>
              <td className="border p-2 space-x-2">
                <Link
                  href={`/dashboard/admin/pesanan/detail/${p.id}`}
                  className="text-blue-500 underline"
                >
                  Detail
                </Link>
                <button
                  onClick={() => handleDelete(p.id)}
                  className="text-red-500"
                >
                  Hapus
                </button>
              </td>
            </tr>
          ))}
          {pesanan.length === 0 && (
            <tr>
              <td colSpan={4} className="text-center p-4">Tidak ada pesanan.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
