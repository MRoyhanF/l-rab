import * as xlsx from "xlsx";
import bcrypt from "bcrypt";
interface UserData {
    username: string;
    fullname: string;
    password: string;
    role: "admin" | "guru" | "murid";
}

export default async function user(prisma: any): Promise<void> {
    const workbook = xlsx.readFile("./prisma/seeder/data.xlsx");
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];

    const data: UserData[] = xlsx.utils.sheet_to_json(sheet);

    for (const item of data) {
        await createUser(prisma, item);
    }

    console.log(`🎉 Seeder untuk ${sheetName} selesai!\n`);
}

async function createUser(prisma: any, item: UserData): Promise<void> {
    try {
        item.password = await bcrypt.hash(item.password, 10);
        await prisma.user.create({
            data: {
                username: item.username,
                fullname: item.fullname,
                password: item.password,
                role: item.role,
            },
        });
        console.log(`✅ Data ${item.username} berhasil ditambahkan.`);
    } catch (error) {
        console.error(`❌ Gagal menambahkan ${item.username}: ${(error as Error).message}`);
    }
}