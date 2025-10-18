import { relations } from "drizzle-orm/relations";
import { tPegawai, tCustomerCard, tCustomer, tToko } from "./schema";

export const tCustomerCardRelations = relations(tCustomerCard, ({one}) => ({
	tPegawai: one(tPegawai, {
		fields: [tCustomerCard.idPegawai],
		references: [tPegawai.idPegawai]
	}),
	tCustomer: one(tCustomer, {
		fields: [tCustomerCard.idCustomer],
		references: [tCustomer.idCustomer]
	}),
	tToko: one(tToko, {
		fields: [tCustomerCard.idToko],
		references: [tToko.idToko]
	}),
}));

export const tPegawaiRelations = relations(tPegawai, ({one, many}) => ({
	tCustomerCards: many(tCustomerCard),
	tToko: one(tToko, {
		fields: [tPegawai.idToko],
		references: [tToko.idToko]
	}),
}));

export const tCustomerRelations = relations(tCustomer, ({many}) => ({
	tCustomerCards: many(tCustomerCard),
}));

export const tTokoRelations = relations(tToko, ({many}) => ({
	tCustomerCards: many(tCustomerCard),
	tPegawais: many(tPegawai),
}));