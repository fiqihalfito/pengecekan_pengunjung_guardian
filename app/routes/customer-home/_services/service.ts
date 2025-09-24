import { db } from "database/connect";
import { tCustomer, tCustomerCard } from "database/schema";
import { desc, eq } from "drizzle-orm";

export async function getCustomerDataByNoHP(nohp: string) {
    const res = await db.query.tCustomer.findMany({
        with: {
            customerCards: {
                with: {
                    cabang: true,
                    pegawai: true
                },
                orderBy: desc(tCustomerCard.tglKunjungan)
            },
        },
        where: eq(tCustomer.nohp, nohp),
    })

    return res
}