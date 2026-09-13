import { env } from "cloudflare:workers";
import { createServerFn } from "@tanstack/react-start";
import { eq } from "drizzle-orm";
import { createDb } from "#/db";
import { meta } from "#/db/schema/meta";
import { requireUserId } from "./auth.server";

export const getMeta = createServerFn({ method: "GET" }).handler(async () => {
	const userId = await requireUserId();
	const db = createDb(env.HYPERDRIVE.connectionString);

	const [metaData] = await db
		.select()
		.from(meta)
		.where(eq(meta.account, userId))
		.limit(1);

	return metaData ?? null;
});
