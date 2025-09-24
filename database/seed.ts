// seed.ts
import { db } from "./connect";
import {
    tCabang,
    tPegawai,
    tCustomer,
    tCustomerCard,
} from "./schema";

async function seed() {
    // Bersihkan tabel dulu (optional)
    await db.delete(tCustomerCard);
    await db.delete(tPegawai);
    await db.delete(tCustomer);
    await db.delete(tCabang);

    // ================== Cabang ==================
    const cabangs = await db
        .insert(tCabang)
        .values([
            { namaCabang: "Cabang Jakarta" },
            { namaCabang: "Cabang Bandung" },
        ])
        .returning();

    // ================== Pegawai ==================
    const pegawais = await db
        .insert(tPegawai)
        .values([
            { nama: "Andi", idCabang: cabangs[0].idCabang },
            { nama: "Budi", idCabang: cabangs[0].idCabang },
            { nama: "Citra", idCabang: cabangs[1].idCabang },
        ])
        .returning();

    // ================== Customer ==================
    const customers = await db
        .insert(tCustomer)
        .values([
            { nama: "Rina", nohp: "0811111111", tglLahir: "1990-01-01" },
            { nama: "Dedi", nohp: "0822222222", tglLahir: "1985-02-15" },
            { nama: "Sari", nohp: "0833333333", tglLahir: "1992-03-20" },
            { nama: "Fajar", nohp: "0844444444", tglLahir: "1995-04-10" },
            { nama: "Maya", nohp: "0855555555", tglLahir: "1988-05-05" },
        ])
        .returning();

    // ================== Customer Card (10 data) ==================
    const cards: typeof tCustomerCard.$inferInsert[] = [
        { tglKunjungan: "2025-09-01 09:00:00", gula: 120, kolesterol: 180, asamUrat: 6, hb: 14, idPegawai: pegawais[0].idPegawai, idCabang: cabangs[0].idCabang, idCustomer: customers[0].idCustomer },
        { tglKunjungan: "2025-09-02 10:30:00", gula: 150, kolesterol: 200, asamUrat: 7, hb: 13, idPegawai: pegawais[1].idPegawai, idCabang: cabangs[0].idCabang, idCustomer: customers[1].idCustomer },
        { tglKunjungan: "2025-09-03 11:15:00", gula: 110, kolesterol: 170, asamUrat: 5, hb: 15, idPegawai: pegawais[2].idPegawai, idCabang: cabangs[1].idCabang, idCustomer: customers[2].idCustomer },
        { tglKunjungan: "2025-09-04 09:45:00", gula: 130, kolesterol: 190, asamUrat: 8, hb: 12, idPegawai: pegawais[0].idPegawai, idCabang: cabangs[0].idCabang, idCustomer: customers[3].idCustomer },
        { tglKunjungan: "2025-09-05 08:50:00", gula: 140, kolesterol: 210, asamUrat: 6, hb: 16, idPegawai: pegawais[1].idPegawai, idCabang: cabangs[0].idCabang, idCustomer: customers[4].idCustomer },
        { tglKunjungan: "2025-09-06 14:20:00", gula: 125, kolesterol: 185, asamUrat: 7, hb: 14, idPegawai: pegawais[2].idPegawai, idCabang: cabangs[1].idCabang, idCustomer: customers[0].idCustomer },
        { tglKunjungan: "2025-09-07 15:00:00", gula: 135, kolesterol: 195, asamUrat: 5, hb: 13, idPegawai: pegawais[0].idPegawai, idCabang: cabangs[0].idCabang, idCustomer: customers[1].idCustomer },
        { tglKunjungan: "2025-09-08 16:40:00", gula: 145, kolesterol: 205, asamUrat: 9, hb: 12, idPegawai: pegawais[1].idPegawai, idCabang: cabangs[0].idCabang, idCustomer: customers[2].idCustomer },
        { tglKunjungan: "2025-09-09 10:10:00", gula: 155, kolesterol: 215, asamUrat: 6, hb: 15, idPegawai: pegawais[2].idPegawai, idCabang: cabangs[1].idCabang, idCustomer: customers[3].idCustomer },
        { tglKunjungan: "2025-09-10 09:30:00", gula: 160, kolesterol: 220, asamUrat: 8, hb: 14, idPegawai: pegawais[0].idPegawai, idCabang: cabangs[0].idCabang, idCustomer: customers[4].idCustomer },
    ];

    await db.insert(tCustomerCard).values(cards);

    console.log("✅ Seed selesai!");
}

seed().catch((err) => {
    console.error(err);
    process.exit(1);
});
