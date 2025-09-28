ALTER TABLE "t_cabang" RENAME TO "t_toko";--> statement-breakpoint
ALTER TABLE "t_toko" RENAME COLUMN "id_cabang" TO "id_toko";--> statement-breakpoint
ALTER TABLE "t_toko" RENAME COLUMN "nama_cabang" TO "nama_toko";--> statement-breakpoint
ALTER TABLE "t_customer_card" RENAME COLUMN "id_cabang" TO "id_toko";--> statement-breakpoint
ALTER TABLE "t_pegawai" RENAME COLUMN "id_cabang" TO "id_toko";--> statement-breakpoint
ALTER TABLE "t_customer_card" DROP CONSTRAINT "t_customer_card_id_cabang_t_cabang_id_cabang_fk";
--> statement-breakpoint
ALTER TABLE "t_pegawai" DROP CONSTRAINT "t_pegawai_id_cabang_t_cabang_id_cabang_fk";
--> statement-breakpoint
ALTER TABLE "t_customer" ADD COLUMN "email" text DEFAULT 'contoh_email@gmail.com';--> statement-breakpoint
ALTER TABLE "t_customer_card" ADD CONSTRAINT "t_customer_card_id_toko_t_toko_id_toko_fk" FOREIGN KEY ("id_toko") REFERENCES "public"."t_toko"("id_toko") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "t_pegawai" ADD CONSTRAINT "t_pegawai_id_toko_t_toko_id_toko_fk" FOREIGN KEY ("id_toko") REFERENCES "public"."t_toko"("id_toko") ON DELETE cascade ON UPDATE no action;