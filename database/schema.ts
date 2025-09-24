import { pgTable, uuid, text, date, integer, timestamp, real } from "drizzle-orm/pg-core";

// ================== Cabang ==================
export const tCabang = pgTable("t_cabang", {
    idCabang: uuid("id_cabang").defaultRandom().primaryKey(),
    namaCabang: text("nama_cabang").notNull(),
});

// ================== Pegawai ==================
export const tPegawai = pgTable("t_pegawai", {
    idPegawai: uuid("id_pegawai").defaultRandom().primaryKey(),
    nama: text("nama").notNull(),
    idCabang: uuid("id_cabang")
        .notNull()
        .references(() => tCabang.idCabang, { onDelete: "cascade" }),
});

// ================== Customer ==================
export const tCustomer = pgTable("t_customer", {
    idCustomer: uuid("id_customer").defaultRandom().primaryKey(),
    nama: text("nama").notNull(),
    nohp: text("nohp").notNull().unique(),
    tglLahir: date("tgl_lahir", { mode: "string" }),
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
    idCabang: uuid("id_cabang")
        .notNull()
        .references(() => tCabang.idCabang, { onDelete: "cascade" }),
    idCustomer: uuid("id_customer")
        .notNull()
        .references(() => tCustomer.idCustomer, { onDelete: "cascade" }),
});

