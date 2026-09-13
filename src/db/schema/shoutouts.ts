import { integer, pgEnum, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { user } from "./auth-schema";

export const statusEnum = pgEnum("status", ["ACTIVE", "INACTIVE", "PAUSED"]);

export const shoutoutSettings = pgTable("shoutout_settings", {
	account: text("account")
		.primaryKey()
		.references(() => user.id, { onDelete: "cascade", onUpdate: "cascade" }),
	price: integer("price").default(10000).notNull(),
	status: statusEnum("status").default("ACTIVE").notNull(),
	priceUpdatedAt: timestamp("price_updated_at", {
		withTimezone: true,
		mode: "date",
	}),
	statusUpdatedAt: timestamp("status_updated_at", {
		withTimezone: true,
		mode: "date",
	}),
	createdAt: timestamp("created_at", { withTimezone: true, mode: "date" })
		.defaultNow()
		.notNull(),
});
