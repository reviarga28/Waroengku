import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PUT(req, { params }) {
  const { id } = params;
  const { role } = await req.json();

  try {
    const updated = await prisma.user.update({
      where: { id },
      data: { role },
    });
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: "Gagal ubah role" }, { status: 500 });
  }
}


export async function DELETE(_, { params }) {
  const { id } = params;

  try {
    await prisma.user.delete({
      where: { id },
    });
    return NextResponse.json({ message: "User berhasil dihapus" });
  } catch (error) {
    return NextResponse.json({ error: "Gagal hapus user" }, { status: 500 });
  }
}