import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(_, { params }) {
  const { id } = params;

  try {
    const pesanan = await prisma.pesanan.findMany({
      where: { userId: id },
      include: {
        menuItems: {
          include: { menu: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(pesanan);
  } catch (error) {
    return NextResponse.json({ error: "Gagal mengambil tagihan" }, { status: 500 });
  }
}
