import { numeric, pgEnum, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { user } from "./auth-schema";

export const roleEnum = pgEnum("role", ["INFLUENCER", "ADMIN"]);

export const meta = pgTable("meta", {
	account: text("account")
		.primaryKey()
		.references(() => user.id, { onDelete: "cascade", onUpdate: "cascade" }),
	role: roleEnum("role").default("INFLUENCER").notNull(),
	balance: numeric("balance", { precision: 10, scale: 2 })
		.default("0")
		.notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: "date" })
		.defaultNow()
		.notNull(),
});
