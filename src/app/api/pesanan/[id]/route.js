import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function DELETE(req, { params }) {
  const { id } = params;
  try {
    await prisma.pesanan.delete({
      where: { id },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Gagal menghapus pesanan' }, { status: 500 });
  }
}

// UPDATE STATUS
export async function PUT(req, { params }) {
  const { id } = params;
  const { status } = await req.json();

  try {
    const updated = await prisma.pesanan.update({
      where: { id },
      data: { status },
    });
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: 'Gagal update status' }, { status: 500 });
  }
}

export async function GET(req, { params }) {
  const { id } = params;

  try {
    const pesanan = await prisma.pesanan.findUnique({
      where: { id },
      include: {
        user: true,
        menuItems: {
          include: {
            menu: true,
          },
        },
      },
    });
    return NextResponse.json(pesanan);
  } catch (error) {
    return NextResponse.json({ error: 'Gagal mengambil data' }, { status: 500 });
  }
}