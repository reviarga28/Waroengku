import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { userId, items } = await req.json(); // items: [{ menuId, jumlah }]

    // Ambil data menu untuk menghitung total
    const menus = await prisma.menu.findMany({
      where: {
        id: { in: items.map((item) => item.menuId) },
      },
    });

    // Hitung total harga
    const total = items.reduce((sum, item) => {
      const menu = menus.find((m) => m.id === item.menuId);
      return sum + (menu?.harga || 0) * item.jumlah;
    }, 0);

    // Buat pesanan
    const pesanan = await prisma.pesanan.create({
      data: {
        userId,
        total,
        status: "pending",
        menuItems: {
          create: items.map((item) => ({
            menuId: item.menuId,
            jumlah: item.jumlah,
          })),
        },
      },
    });

    return NextResponse.json(pesanan);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Gagal membuat pesanan" }, { status: 500 });
  }
}
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
