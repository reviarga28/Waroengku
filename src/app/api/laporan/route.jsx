import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  const laporan = await prisma.laporan.findMany({
    orderBy: { dibuatPada: "desc" },
  });
  return NextResponse.json(laporan);
}

export async function POST() {
  const now = new Date();
  const bulan = now.getMonth() + 1;
  const tahun = now.getFullYear();

  const existing = await prisma.laporan.findFirst({
    where: { bulan, tahun },
  });

  if (existing) {
    return NextResponse.json(
      { error: "Laporan untuk bulan ini sudah ada." },
      { status: 400 }
    );
  }

  const pesanan = await prisma.pesanan.findMany();

  const totalPendapatan = pesanan.reduce((acc, p) => acc + p.total, 0);
  const jumlahPesanan = pesanan.length;

  const laporan = await prisma.laporan.create({
    data: {
      bulan,
      tahun,
      totalPendapatan,
      jumlahPesanan,
    },
  });

  return NextResponse.json(laporan);
}
