import { env } from "cloudflare:workers";
import { drizzleAdapter } from "@better-auth/drizzle-adapter";
import { betterAuth } from "better-auth";
import { emailOTP } from "better-auth/plugins";
import { tanstackStartCookies } from "better-auth/tanstack-start";
import { createDb, schema } from "#/db";
import { profiles } from "#/db/schema/profiles";

export function createAuth() {
	const db = createDb(env.HYPERDRIVE.connectionString);

	return betterAuth({
		database: drizzleAdapter(db, {
			provider: "pg",
			schema,
		}),
		session: { cookieCache: { enabled: true, maxAge: 5 * 60 } },
		databaseHooks: {
			user: {
				create: {
					after: async (user) => {
						await db
							.insert(profiles)
							.values({
								id: user.id,
								email: user.email,
							})
							.onConflictDoNothing();
					},
				},
			},
		},
		plugins: [
			emailOTP({
				async sendVerificationOTP({ email, otp, type }) {
					console.log("[email-otp]:", { email, otp, type });
				},
			}),
			tanstackStartCookies(),
		],
	});
}
