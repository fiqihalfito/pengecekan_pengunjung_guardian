-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE "t_customer" (
	"id_customer" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"nama" text NOT NULL,
	"nohp" text NOT NULL,
	"tgl_lahir" date,
	"email" text DEFAULT 'contoh_email@gmail.com',
	CONSTRAINT "t_customer_nohp_unique" UNIQUE("nohp")
);
--> statement-breakpoint
CREATE TABLE "t_customer_card" (
	"id_customer_card" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"gula" real NOT NULL,
	"kolesterol" real NOT NULL,
	"hb" real NOT NULL,
	"id_pegawai" uuid NOT NULL,
	"id_toko" uuid NOT NULL,
	"id_customer" uuid NOT NULL,
	"asam_urat" real NOT NULL,
	"tgl_kunjungan" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "t_pegawai" (
	"id_pegawai" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"nama" text NOT NULL,
	"id_toko" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "t_toko" (
	"id_toko" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"nama_toko" text NOT NULL,
	"kode_toko" text
);
--> statement-breakpoint
ALTER TABLE "t_customer_card" ADD CONSTRAINT "t_customer_card_id_customer_t_customer_id_customer_fk" FOREIGN KEY ("id_customer") REFERENCES "public"."t_customer"("id_customer") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "t_customer_card" ADD CONSTRAINT "t_customer_card_id_pegawai_t_pegawai_id_pegawai_fk" FOREIGN KEY ("id_pegawai") REFERENCES "public"."t_pegawai"("id_pegawai") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "t_customer_card" ADD CONSTRAINT "t_customer_card_id_toko_t_toko_id_toko_fk" FOREIGN KEY ("id_toko") REFERENCES "public"."t_toko"("id_toko") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "t_pegawai" ADD CONSTRAINT "t_pegawai_id_toko_t_toko_id_toko_fk" FOREIGN KEY ("id_toko") REFERENCES "public"."t_toko"("id_toko") ON DELETE cascade ON UPDATE no action;
*/