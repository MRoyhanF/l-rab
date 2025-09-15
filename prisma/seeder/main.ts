import { PrismaClient } from "../../src/generated/prisma/client";
import user from "./user";

const prisma = new PrismaClient();

async function main(): Promise<void> {
    try {
        await user(prisma);

        console.log("🎉 Semua seeder berhasil dijalankan!");
    } catch (error) {
        console.error("❌ Terjadi kesalahan saat menjalankan seeder:", (error as Error).message);
    }
}

// Jalankan seeder
main()
    .catch((err) => {
        console.error("❌ Kesalahan tidak terduga:", err);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
