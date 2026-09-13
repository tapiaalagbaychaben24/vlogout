import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { user } from "./auth-schema";

export const banks = pgTable("banks", {
	account: text("account")
		.primaryKey()
		.references(() => user.id, { onDelete: "cascade", onUpdate: "cascade" }),
	accountName: text("account_name").notNull(),
	accountNumber: text("account_number").notNull(),
	providerCode: text("provider_code").notNull(),
	providerName: text("provider_name").notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: "date" })
		.defaultNow()
		.notNull(),
});
