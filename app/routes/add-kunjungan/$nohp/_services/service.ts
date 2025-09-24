import { db } from "database/connect";
import { tCustomer, tCustomerCard } from "database/schema";
import { eq } from "drizzle-orm";
import { z } from "zod";

export async function getCustomerByNoHP(nohp: string) {
    const res = await db.select().from(tCustomer).where(eq(tCustomer.nohp, nohp))
    return res
}

export async function saveKunjungan(customerCard: typeof tCustomerCard.$inferInsert) {
    const res = await db.insert(tCustomerCard).values(customerCard).returning()
    return res
}

export const tCustomerCardInsertSchema = z.object({
    gula: z
        .number("! gula harus berupa angka")
        .min(0, { message: "! Gula tidak boleh negatif" }),

    kolesterol: z
        .number("! kolesterol harus berupa angka")
        .min(0, { message: "! Kolesterol tidak boleh negatif" }),

    asamUrat: z
        .number("! asam urat harus berupa angka")
        .min(0, { message: "! Asam urat tidak boleh negatif" }),

    hb: z
        .number("! hb harus berupa angka")
        .min(0, { message: "! HB tidak boleh negatif" }),
});