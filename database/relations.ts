import { relations } from "drizzle-orm";
import { tCabang, tCustomer, tCustomerCard, tPegawai } from "./schema";

// ================== Relations ==================
export const tCabangRelations = relations(tCabang, ({ many }) => ({
    pegawai: many(tPegawai),
    customerCards: many(tCustomerCard),
}));

export const tPegawaiRelations = relations(tPegawai, ({ one, many }) => ({
    cabang: one(tCabang, {
        fields: [tPegawai.idCabang],
        references: [tCabang.idCabang],
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
    cabang: one(tCabang, {
        fields: [tCustomerCard.idCabang],
        references: [tCabang.idCabang],
    }),
    customer: one(tCustomer, {
        fields: [tCustomerCard.idCustomer],
        references: [tCustomer.idCustomer],
    }),
}));
