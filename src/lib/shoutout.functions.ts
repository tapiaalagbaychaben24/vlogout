// src/lib/shoutout.functions.ts
import { env } from "cloudflare:workers";
import { createServerFn } from "@tanstack/react-start";
import { eq } from "drizzle-orm";
import * as z from "zod";
import { createDb } from "#/db";
import { shoutoutSettings } from "#/db/schema/shoutouts";
import { requireUserId } from "./auth.server";

export const getShoutoutSettingsData = createServerFn({
	method: "GET",
}).handler(async () => {
	const userId = await requireUserId();
	const db = createDb(env.HYPERDRIVE.connectionString);

	const [row] = await db
		.select({ price: shoutoutSettings.price, status: shoutoutSettings.status })
		.from(shoutoutSettings)
		.where(eq(shoutoutSettings.account, userId))
		.limit(1);

	return row ?? null;
});

export const updateShoutoutPrice = createServerFn({ method: "POST" })
	.validator(z.object({ price: z.number() }))
	.handler(async ({ data }) => {
		const userId = await requireUserId();
		const db = createDb(env.HYPERDRIVE.connectionString);

		await db
			.update(shoutoutSettings)
			.set({ price: data.price })
			.where(eq(shoutoutSettings.account, userId));
	});

export const updateShoutoutStatus = createServerFn({ method: "POST" })
	.validator(z.object({ status: z.string() }))
	.handler(async ({ data }) => {
		const userId = await requireUserId();
		const db = createDb(env.HYPERDRIVE.connectionString);

		await db
			.update(shoutoutSettings)
			.set({ status: data.status })
			.where(eq(shoutoutSettings.account, userId));
	});
