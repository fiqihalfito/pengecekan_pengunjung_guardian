import { pgTable, unique, uuid, text, date, foreignKey, real, timestamp } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const tCustomer = pgTable("t_customer", {
	idCustomer: uuid("id_customer").defaultRandom().primaryKey().notNull(),
	nama: text().notNull(),
	nohp: text().notNull(),
	tglLahir: date("tgl_lahir"),
	email: text().default('contoh_email@gmail.com'),
}, (table) => [
	unique("t_customer_nohp_unique").on(table.nohp),
]);

export const tCustomerCard = pgTable("t_customer_card", {
	idCustomerCard: uuid("id_customer_card").defaultRandom().primaryKey().notNull(),
	gula: real().notNull(),
	kolesterol: real().notNull(),
	hb: real().notNull(),
	idPegawai: uuid("id_pegawai").notNull(),
	idToko: uuid("id_toko").notNull(),
	idCustomer: uuid("id_customer").notNull(),
	asamUrat: real("asam_urat").notNull(),
	tglKunjungan: timestamp("tgl_kunjungan", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.idCustomer],
			foreignColumns: [tCustomer.idCustomer],
			name: "t_customer_card_id_customer_t_customer_id_customer_fk"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.idPegawai],
			foreignColumns: [tPegawai.idPegawai],
			name: "t_customer_card_id_pegawai_t_pegawai_id_pegawai_fk"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.idToko],
			foreignColumns: [tToko.idToko],
			name: "t_customer_card_id_toko_t_toko_id_toko_fk"
		}).onDelete("cascade"),
]);

export const tPegawai = pgTable("t_pegawai", {
	idPegawai: uuid("id_pegawai").defaultRandom().primaryKey().notNull(),
	nama: text().notNull(),
	idToko: uuid("id_toko").notNull(),
}, (table) => [
	foreignKey({
			columns: [table.idToko],
			foreignColumns: [tToko.idToko],
			name: "t_pegawai_id_toko_t_toko_id_toko_fk"
		}).onDelete("cascade"),
]);

export const tToko = pgTable("t_toko", {
	idToko: uuid("id_toko").defaultRandom().primaryKey().notNull(),
	namaToko: text("nama_toko").notNull(),
	kodeToko: text("kode_toko"),
});
