import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const pesanan = await prisma.pesanan.findMany({
      include: {
        user: true,
        menuItems: {
          include: {
            menu: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(pesanan);
  } catch (error) {
    return NextResponse.json({ error: "Gagal mengambil data pesanan" }, { status: 500 });
  }
}
