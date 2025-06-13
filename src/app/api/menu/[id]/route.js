import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const { id } = params;

  try {
    const menu = await prisma.menu.findUnique({
      where: { id },
      include: {
        testimoni: true,
      },
    });

    if (!menu) {
      return NextResponse.json({ error: 'Menu not found' }, { status: 404 });
    }

    return NextResponse.json(menu);
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

// DELETE menu by ID
export async function DELETE(request, { params }) {
  const { id } = params;

  try {
    await prisma.menu.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Menu berhasil dihapus" });
  } catch (error) {
    return NextResponse.json(
      { error: "Gagal menghapus menu", detail: error.message },
      { status: 500 }
    );
  }
}

// PUT update menu by ID
export async function PUT(request, { params }) {
  const { id } = params;
  const body = await request.json();

  const { nama, deskripsi, harga, tersedia, image } = body;

  try {
    const updated = await prisma.menu.update({
      where: { id },
      data: {
        nama,
        deskripsi,
        harga,
        tersedia,
        image,
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json(
      { error: "Gagal update menu", detail: error.message },
      { status: 500 }
    );
  }
}
