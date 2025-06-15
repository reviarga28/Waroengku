import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const menus = await prisma.menu.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(menus);
}

export async function POST(req) {
  const body = await req.json();
  const { nama, deskripsi, harga, tersedia, image } = body;

  if (!nama || !harga) {
    return NextResponse.json({ error: "Nama dan harga wajib diisi" }, { status: 400 });
  }

  const newMenu = await prisma.menu.create({
    data: { nama, deskripsi, harga: Number(harga), tersedia, image },
  });

  return NextResponse.json(newMenu);
}
