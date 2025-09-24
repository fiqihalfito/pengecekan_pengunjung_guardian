import { db } from "./connect";
import { tPegawai } from "./schema";

async function main() {

    try {
        const result = await db.select().from(tPegawai);
        console.log(result);
    } catch (error) {
        console.error(error);
    }


}

await main()