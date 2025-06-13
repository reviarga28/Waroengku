import { notFound } from 'next/navigation';

export default async function MenuDetailPage({ params }) {
  const { id } = params;

  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/menu/${id}`);
  if (!res.ok) return notFound();

  const menu = await res.json();

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Detail Menu</h1>

      <div className="border p-4 rounded shadow space-y-4">
        {menu.image && (
          <img src={menu.image} alt={menu.nama} className="w-full h-64 object-cover rounded" />
        )}
        <h2 className="text-xl font-semibold">{menu.nama}</h2>
        <p className="text-gray-700">{menu.deskripsi || 'Tidak ada deskripsi'}</p>
        <p className="text-lg font-bold">Rp {menu.harga.toLocaleString()}</p>
        <p className="text-sm">Tersedia: {menu.tersedia ? 'Ya' : 'Tidak'}</p>
        <p className="text-sm text-gray-500">Dibuat: {new Date(menu.createdAt).toLocaleString()}</p>
      </div>

      {/* Jika ingin menampilkan testimoni */}
      {menu.testimoni?.length > 0 && (
        <div className="mt-6">
          <h3 className="text-xl font-bold mb-2">Testimoni</h3>
          <ul className="space-y-2">
            {menu.testimoni.map((t) => (
              <li key={t.id} className="border p-2 rounded">
                <p className="text-sm italic">"{t.komentar}"</p>
                <p className="text-xs text-gray-600">Rating: {t.rating}/5</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
