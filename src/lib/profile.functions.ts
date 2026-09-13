import { env } from "cloudflare:workers";
import { createServerFn } from "@tanstack/react-start";
import { eq } from "drizzle-orm";
import * as z from "zod";
import { createDb } from "#/db";
import { profiles } from "#/db/schema/profiles";
import { requireUserId } from "./auth.server";

export const getProfile = createServerFn({ method: "GET" }).handler(
	async () => {
		const userId = await requireUserId();
		const db = createDb(env.HYPERDRIVE.connectionString);

		const [profile] = await db
			.select()
			.from(profiles)
			.where(eq(profiles.id, userId))
			.limit(1);

		return profile ?? null;
	},
);

export const profileFormSchema = z.object({
	name: z
		.string()
		.min(2, "Display name must be at least 2 characters.")
		.max(64),
	handle: z
		.string()
		.min(3, "Handle must be at least 3 characters.")
		.max(32)
		.regex(/^[a-zA-Z0-9_]+$/, "Letters, numbers, and underscores only"),
	number: z.string().max(20),
	bio: z.string().max(160),
	about: z.string().max(2000),
});

export const updateProfile = createServerFn({ method: "POST" })
	.validator(profileFormSchema)
	.handler(async ({ data }) => {
		const userId = await requireUserId();
		const db = createDb(env.HYPERDRIVE.connectionString);

		const [updated] = await db
			.update(profiles)
			.set({
				name: data.name,
				handle: data.handle,
				number: data.number || null,
				bio: data.bio || null,
				about: data.about || null,
			})
			.where(eq(profiles.id, userId))
			.returning();

		return updated;
	});
