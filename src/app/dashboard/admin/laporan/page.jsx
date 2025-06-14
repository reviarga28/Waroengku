"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

export default function LaporanPage() {
  const [laporan, setLaporan] = useState([]);

  useEffect(() => {
    fetchLaporan();
  }, []);

  const fetchLaporan = async () => {
    const res = await axios.get("/api/laporan");
    setLaporan(res.data);
  };

  const buatLaporan = async () => {
    try {
      await axios.post("/api/laporan");
      Swal.fire("Sukses", "Laporan berhasil dibuat", "success");
      fetchLaporan();
    } catch (err) {
      Swal.fire("Gagal", err.response?.data?.error || "Terjadi kesalahan", "error");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Manajemen Laporan</h1>

      <button
        onClick={buatLaporan}
        className="mb-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        Buat Laporan Bulan Ini
      </button>

      <table className="w-full border text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Bulan</th>
            <th className="border p-2">Tahun</th>
            <th className="border p-2">Total Pendapatan</th>
            <th className="border p-2">Jumlah Pesanan</th>
            <th className="border p-2">Dibuat</th>
          </tr>
        </thead>
        <tbody>
          {laporan.map((lap, i) => (
            <tr key={i}>
              <td className="border p-2">{lap.bulan}</td>
              <td className="border p-2">{lap.tahun}</td>
              <td className="border p-2">Rp{lap.totalPendapatan.toLocaleString()}</td>
              <td className="border p-2">{lap.jumlahPesanan}</td>
              <td className="border p-2">
                {new Date(lap.dibuatPada).toLocaleString("id-ID")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
