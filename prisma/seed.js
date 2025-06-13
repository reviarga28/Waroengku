// prisma/seed.js
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  // Ambil user dan admin yang sudah ada
  const admin = await prisma.user.findFirst({
    where: { role: "admin" },
  });

  const user = await prisma.user.findFirst({
    where: { role: "user" },
  });

  if (!admin || !user) {
    console.error("❌ Gagal: Admin dan user harus sudah tersedia di database.");
    return;
  }

  // Tambah beberapa menu
  const menu1 = await prisma.menu.create({
    data: {
      nama: "Ayam Bakar Madu",
      deskripsi: "Ayam bakar dengan saus madu khas WaroengKu.",
      harga: 25000,
      image: "https://example.com/images/nasi-goreng.jpg",
    },
  });

  const menu2 = await prisma.menu.create({
    data: {
      nama: "Sate Ayam",
      deskripsi: "Sate ayam bumbu kacang dengan lontong.",
      harga: 20000,
      image: "https://example.com/images/nasi-goreng.jpg",
    },
  });

  // Buat pesanan user
  const pesanan = await prisma.pesanan.create({
    data: {
      userId: user.id,
      total: 45000,
      menuItems: {
        create: [
          { menuId: menu1.id, jumlah: 1 },
          { menuId: menu2.id, jumlah: 1 },
        ],
      },
    },
  });

  // Tambahkan testimoni dari user
  await prisma.testimoni.create({
    data: {
      userId: user.id,
      menuId: menu1.id,
      komentar: "Rasanya mantap, ayamnya empuk dan manis!",
      rating: 5,
    },
  });

  // Tambah laporan
  await prisma.laporan.create({
    data: {
      bulan: new Date().getMonth() + 1,
      tahun: new Date().getFullYear(),
      totalPendapatan: 45000,
      jumlahPesanan: 1,
    },
  });

  console.log(
    "✅ Seed selesai: Menu, pesanan, testimoni, dan laporan berhasil ditambahkan."
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
