import { db } from "database/connect";
import { tCustomer } from "database/schema";
import { eq } from "drizzle-orm";
import { z } from "zod";

export async function getCurrentCustomer(idCustomer: string) {
    const res = await db.select().from(tCustomer).where(eq(tCustomer.idCustomer, idCustomer))
    return res
}

export async function updateCustomer(idCustomer: string, customer: typeof tCustomer.$inferInsert) {
    const res = await db.update(tCustomer).set({
        email: customer.email,
        nama: customer.nama,
        nohp: customer.nohp,
        tglLahir: customer.tglLahir
    }).where(eq(tCustomer.idCustomer, idCustomer)).returning({ idCustomer: tCustomer.idCustomer })
    return res
}

export async function checkCustomerByNoHP(nohp: string) {
    const res = await db.select({ nohp: tCustomer.nohp }).from(tCustomer).where(eq(tCustomer.nohp, nohp))
    return res
}

export const tCustomerUpdateSchema = z.object({
    nama: z
        .string({
            error: (iss) => iss.input === undefined ? "Nama is required." : "Invalid input."
        })
        .min(1, "Nama tidak boleh kosong"),

    nohp: z
        .string()
        .min(1, "Nomor telepon tidak boleh kosong"),

    tglLahir: z.iso.date({
        error: issue => issue.input === undefined ? "Required" : "wajib diisi"
    })
});