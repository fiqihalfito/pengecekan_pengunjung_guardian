import { db } from "database/connect";
import { tCustomer } from "database/schema";
import { ilike } from "drizzle-orm";

export async function searchAllCustomerByNoHP(nohp: string) {
    const res = await db.select().from(tCustomer).where(ilike(tCustomer.nohp, `%${nohp}%`))
    return res
}