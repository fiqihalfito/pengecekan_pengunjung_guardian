// seed.ts
import { db } from "./connect";
import {
    tToko,
    tPegawai,
    tCustomer,
    tCustomerCard,
} from "./schema";
import { sql } from "drizzle-orm";

// ======================
// Helper Functions
// ======================
function randomItem<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
}

function daysAgo(days: number): string {
    const date = new Date();
    date.setDate(date.getDate() - days);
    return date.toISOString();
}

function randomTokoId() {
    const tokoIds = [
        "0e8d8321-f497-40ab-9684-a8b59ad75f94",
        "a0c7c3e1-181b-4e47-9e53-88652fce62e3",
    ];
    return randomItem(tokoIds);
}

// ======================
// Main Seeder
// ======================
async function main() {
    console.log("🌱 Mulai proses seeding...");

    // 🔥 Kosongkan semua tabel
    await db.execute(sql`
    TRUNCATE TABLE 
      t_customer_card,
      t_customer,
      t_pegawai,
      t_toko
    RESTART IDENTITY CASCADE;
  `);
    console.log("✅ Semua tabel dikosongkan");

    // 1️⃣ Toko
    const tokoData = [
        {
            idToko: "0e8d8321-f497-40ab-9684-a8b59ad75f94",
            namaToko: "Toko Jakarta",
            kodeToko: "3202",
        },
        {
            idToko: "a0c7c3e1-181b-4e47-9e53-88652fce62e3",
            namaToko: "Toko Bandung",
            kodeToko: "6808",
        },
    ];
    await db.insert(tToko).values(tokoData);
    console.log("✅ Inserted 2 toko");

    // 2️⃣ Pegawai
    const pegawaiData = [
        { idPegawai: "a603998e-cd9c-4080-ba2b-d16690cf8954", nama: "Adellena", idToko: randomTokoId() },
        { nama: "Budi Santoso", idToko: randomTokoId() },
        { nama: "Citra Lestari", idToko: randomTokoId() },
    ];
    const pegawaiResult = await db
        .insert(tPegawai)
        .values(pegawaiData)
        .returning({
            idPegawai: tPegawai.idPegawai,
            idToko: tPegawai.idToko,
            nama: tPegawai.nama,
        });
    console.table(pegawaiResult);
    console.log("✅ Inserted 3 pegawai");

    // 3️⃣ Customer
    const customerData = [
        {
            nama: "Rina Kartika",
            nohp: "081234567890",
            tglLahir: "1995-04-15",
            email: "rina.kartika@example.com",
        },
        {
            nama: "Doni Prasetyo",
            nohp: "082134567891",
            tglLahir: "1988-09-22",
            email: "doni.prasetyo@example.com",
        },
        {
            nama: "Sari Melati",
            nohp: "083134567892",
            tglLahir: "1992-12-30",
            email: "sari.melati@example.com",
        },
    ];
    const customerResult = await db
        .insert(tCustomer)
        .values(customerData)
        .returning({
            idCustomer: tCustomer.idCustomer,
            nama: tCustomer.nama,
        });
    console.table(customerResult);
    console.log("✅ Inserted 3 customer");

    // 4️⃣ Customer Card
    const readings = [
        { gula: 98.2, kolesterol: 180.4, asamUrat: 5.8, hb: 13.6 },
        { gula: 105.3, kolesterol: 190.1, asamUrat: 6.1, hb: 14.0 },
        { gula: 111.5, kolesterol: 175.2, asamUrat: 6.8, hb: 12.9 },
        { gula: 123.9, kolesterol: 200.8, asamUrat: 7.0, hb: 13.3 },
        { gula: 115.7, kolesterol: 185.3, asamUrat: 5.9, hb: 14.5 },
        { gula: 128.1, kolesterol: 210.5, asamUrat: 7.5, hb: 12.7 },
        { gula: 102.4, kolesterol: 170.6, asamUrat: 6.0, hb: 13.9 },
        { gula: 99.8, kolesterol: 192.2, asamUrat: 6.2, hb: 14.1 },
        { gula: 108.6, kolesterol: 178.5, asamUrat: 6.4, hb: 13.2 },
        { gula: 134.2, kolesterol: 220.1, asamUrat: 7.2, hb: 12.4 },
        { gula: 96.1, kolesterol: 165.9, asamUrat: 5.5, hb: 14.3 },
        { gula: 125.7, kolesterol: 205.2, asamUrat: 7.1, hb: 13.1 },
        { gula: 118.3, kolesterol: 199.0, asamUrat: 6.7, hb: 13.8 },
        { gula: 140.4, kolesterol: 230.4, asamUrat: 7.6, hb: 12.2 },
        { gula: 109.9, kolesterol: 183.3, asamUrat: 6.3, hb: 13.5 },
    ];

    const cardData = readings.map((r, i) => {
        const peg = randomItem(pegawaiResult);
        const cus = randomItem(customerResult);
        return {
            tglKunjungan: daysAgo(i),
            gula: r.gula,
            kolesterol: r.kolesterol,
            asamUrat: r.asamUrat,
            hb: r.hb,
            idPegawai: peg.idPegawai,
            idToko: peg.idToko,
            idCustomer: cus.idCustomer,
        };
    });

    await db.insert(tCustomerCard).values(cardData);
    console.log(`✅ Inserted ${cardData.length} customer card`);

    console.log("🌿 Seeding selesai tanpa error!");
}

// Jalankan seeder
main().catch((err) => {
    console.error("❌ Error saat seeding:", err);
});
