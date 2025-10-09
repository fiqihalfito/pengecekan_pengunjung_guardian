import { pgTable, uuid, text, date, integer, timestamp, real } from "drizzle-orm/pg-core";

// ================== Toko ==================
export const tToko = pgTable("t_toko", {
    idToko: uuid("id_toko").defaultRandom().primaryKey(),
    namaToko: text("nama_toko").notNull(),
    kodeToko: text("kode_toko")
});

// ================== Pegawai ==================
export const tPegawai = pgTable("t_pegawai", {
    idPegawai: uuid("id_pegawai").defaultRandom().primaryKey(),
    nama: text("nama").notNull(),
    idToko: uuid("id_toko")
        .notNull()
        .references(() => tToko.idToko, { onDelete: "cascade" }),
});

// ================== Customer ==================
export const tCustomer = pgTable("t_customer", {
    idCustomer: uuid("id_customer").defaultRandom().primaryKey(),
    nama: text("nama").notNull(),
    nohp: text("nohp").notNull().unique(),
    tglLahir: date("tgl_lahir", { mode: "string" }),
    email: text("email").default("contoh_email@gmail.com")
});

// ================== Customer Card ==================
export const tCustomerCard = pgTable("t_customer_card", {
    idCustomerCard: uuid("id_customer_card").defaultRandom().primaryKey(),
    tglKunjungan: timestamp("tgl_kunjungan", { mode: "string" }).defaultNow().notNull(),
    gula: real("gula").notNull(),
    kolesterol: real("kolesterol").notNull(),
    asamUrat: real("asam_urat").notNull(),
    hb: real("hb").notNull(),
    idPegawai: uuid("id_pegawai")
        .notNull()
        .references(() => tPegawai.idPegawai, { onDelete: "cascade" }),
    idToko: uuid("id_toko")
        .notNull()
        .references(() => tToko.idToko, { onDelete: "cascade" }),
    idCustomer: uuid("id_customer")
        .notNull()
        .references(() => tCustomer.idCustomer, { onDelete: "cascade" }),
});

