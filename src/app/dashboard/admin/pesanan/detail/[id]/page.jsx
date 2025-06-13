'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

export default function DetailPesanan() {
  const { id } = useParams();
  const [pesanan, setPesanan] = useState(null);

  useEffect(() => {
    fetch(`/api/pesanan/${id}`)
      .then((res) => res.json())
      .then((data) => setPesanan(data));
  }, [id]);

  if (!pesanan) return <p>Loading...</p>;

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Detail Pesanan</h1>
      <p>User: {pesanan.user.name}</p>
      <p>Status: {pesanan.status}</p>
      <p>Total: Rp{pesanan.total}</p>
      <h2 className="font-semibold mt-4">Menu:</h2>
      <ul>
        {pesanan.menuItems.map((item) => (
          <li key={item.id}>{item.menu.nama} x {item.jumlah}</li>
        ))}
      </ul>
      <Link href="/dashboard/admin/pesanan" className="text-blue-500 mt-4 block">Kembali</Link>
    </div>
  );
}
