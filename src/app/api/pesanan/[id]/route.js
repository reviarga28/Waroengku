import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function DELETE(req, context) {
  const id = context?.params?.id;

  if (!id) {
    return new Response("ID pesanan tidak ditemukan", { status: 400 });
  }

  try {
    await prisma.pesanan.update({
      where: { id },
      data: { status: "dibatalkan" },
    });

    return new Response("Pesanan dibatalkan", { status: 200 });
  } catch (error) {
    console.error("Gagal membatalkan pesanan:", error);
    return new Response("Gagal membatalkan pesanan", { status: 500 });
  }
}


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
  const { id } = await params;

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

    if (!pesanan) {
      return new Response(JSON.stringify({ error: "Pesanan tidak ditemukan" }), { status: 404 });
    }

    return new Response(JSON.stringify(pesanan));
  } catch (error) {
    console.error("API ERROR:", error);
    return new Response(JSON.stringify({ error: "Gagal memuat pesanan" }), { status: 500 });
  }
}