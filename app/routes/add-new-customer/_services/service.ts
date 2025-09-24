import { db } from "database/connect";
import { tCustomer } from "database/schema";
import { eq } from "drizzle-orm";
import { z } from "zod";

export async function saveCustomer(customer: typeof tCustomer.$inferInsert) {
    const res = await db.insert(tCustomer).values(customer).returning()
    return res
}

export async function checkCustomerByNoHP(nohp: string) {
    const res = await db.select({ nohp: tCustomer.nohp }).from(tCustomer).where(eq(tCustomer.nohp, nohp))
    return res
}

export const tCustomerInsertSchema = z.object({
    nama: z
        .string({
            error: (iss) => iss.input === undefined ? "Nama is required." : "Invalid input."
        })
        .min(1, "Nama tidak boleh kosong"),

    nohp: z
        .string()
        .min(1, "Nomor telepon tidak boleh kosong")
});