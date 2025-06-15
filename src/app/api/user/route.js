import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
      orderBy: { createdAt: "desc" }
    });
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json({ error: "Gagal ambil data user" }, { status: 500 });
  }
}
