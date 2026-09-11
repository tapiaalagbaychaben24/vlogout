import { pgTable, text, timestamp, unique } from "drizzle-orm/pg-core";
import { user } from "./auth-schema";

export const profiles = pgTable(
	"profiles",
	{
		id: text("id")
			.primaryKey()
			.references(() => user.id, { onDelete: "cascade", onUpdate: "cascade" }),
		avatar: text("avatar"),
		cover: text("cover"),
		name: text("name"),
		number: text("number"),
		handle: text("handle"),
		bio: text("bio"),
		about: text("about"),
		email: text("email").notNull(),
		createdAt: timestamp("created_at", { withTimezone: true, mode: "date" })
			.defaultNow()
			.notNull(),
	},
	(table) => [unique("profiles_handle_key").on(table.handle)],
);
