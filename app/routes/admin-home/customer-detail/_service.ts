import { db } from "database/connect";
import { tCustomer, tCustomerCard } from "database/schema";
import { desc, eq } from "drizzle-orm";
import { validate as isUuid } from "uuid";


export async function getCustomerDataById(idCustomer: string) {

    if (!isUuid(idCustomer)) {
        return []
    }

    const res = await db.query.tCustomer.findMany({
        with: {
            customerCards: {
                with: {
                    toko: true,
                    pegawai: true
                },
                orderBy: desc(tCustomerCard.tglKunjungan)
            },
        },
        where: eq(tCustomer.idCustomer, idCustomer),
    })
    return res
}