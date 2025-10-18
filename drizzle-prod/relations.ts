import { relations } from "drizzle-orm/relations";
import { tCustomer, tCustomerCard, tPegawai, tToko } from "./schema";

export const tCustomerCardRelations = relations(tCustomerCard, ({one}) => ({
	tCustomer: one(tCustomer, {
		fields: [tCustomerCard.idCustomer],
		references: [tCustomer.idCustomer]
	}),
	tPegawai: one(tPegawai, {
		fields: [tCustomerCard.idPegawai],
		references: [tPegawai.idPegawai]
	}),
	tToko: one(tToko, {
		fields: [tCustomerCard.idToko],
		references: [tToko.idToko]
	}),
}));

export const tCustomerRelations = relations(tCustomer, ({many}) => ({
	tCustomerCards: many(tCustomerCard),
}));

export const tPegawaiRelations = relations(tPegawai, ({one, many}) => ({
	tCustomerCards: many(tCustomerCard),
	tToko: one(tToko, {
		fields: [tPegawai.idToko],
		references: [tToko.idToko]
	}),
}));

export const tTokoRelations = relations(tToko, ({many}) => ({
	tCustomerCards: many(tCustomerCard),
	tPegawais: many(tPegawai),
}));