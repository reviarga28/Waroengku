import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma from "@/lib/prisma";

export async function POST(req) {
  try {
    const { name, email, password, role } = await req.json();
    console.log('Incoming register request:', { name, email, role });

    if (!name || !email || !password) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json({ error: "Email already exists" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: role || "user", // ✅ Default role user jika tidak diberikan
      },
    });

    return NextResponse.json({ message: "User created", user });
  } catch (error) {
    console.error('Register Error:', error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
