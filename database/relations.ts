import { relations } from "drizzle-orm";
import { tToko, tCustomer, tCustomerCard, tPegawai } from "./schema";

// ================== Relations ==================
export const tTokoRelations = relations(tToko, ({ many }) => ({
    pegawai: many(tPegawai),
    customerCards: many(tCustomerCard),
}));

export const tPegawaiRelations = relations(tPegawai, ({ one, many }) => ({
    toko: one(tToko, {
        fields: [tPegawai.idToko],
        references: [tToko.idToko],
    }),
    customerCards: many(tCustomerCard),
}));

export const tCustomerRelations = relations(tCustomer, ({ many }) => ({
    customerCards: many(tCustomerCard),
}));

export const tCustomerCardRelations = relations(tCustomerCard, ({ one }) => ({
    pegawai: one(tPegawai, {
        fields: [tCustomerCard.idPegawai],
        references: [tPegawai.idPegawai],
    }),
    toko: one(tToko, {
        fields: [tCustomerCard.idToko],
        references: [tToko.idToko],
    }),
    customer: one(tCustomer, {
        fields: [tCustomerCard.idCustomer],
        references: [tCustomer.idCustomer],
    }),
}));
