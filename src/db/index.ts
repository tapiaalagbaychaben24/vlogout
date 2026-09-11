import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as authSchema from "./schema/auth-schema";

const schema = { ...authSchema };

export function createDb(connectionString: string) {
	const client = postgres(connectionString, {
		max: 1,
		prepare: false,
		fetch_types: false,
	});
	return drizzle(client, { schema });
}

export { schema };
