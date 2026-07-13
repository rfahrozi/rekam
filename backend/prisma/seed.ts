import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding...');

  const adminEmail = 'admin@rekam.com';
  const adminPassword = 'password123';

  // Periksa apakah admin sudah ada
  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail }
  });

  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    await prisma.user.create({
      data: {
        email: adminEmail,
        password: hashedPassword,
        namaLengkap: 'Super Admin REKAM',
        identitas: '000000000000000000',
        unitKerja: 'Administrator',
        statusPegawai: 'NonASN',
        role: 'admin',
      }
    });
    console.log(`Berhasil membuat user admin!`);
    console.log(`Email: ${adminEmail}`);
    console.log(`Password: ${adminPassword}`);
  } else {
    console.log('User admin sudah ada, melewati proses seed.');
  }

  console.log('Seeding selesai.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
