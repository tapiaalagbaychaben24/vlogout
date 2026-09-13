import { getRequestHeaders } from "@tanstack/react-start/server";
import { createAuth } from "./auth";

export async function requireUserId() {
	const session = await createAuth().api.getSession({
		headers: getRequestHeaders(),
	});

	if (!session) throw new Error("Unauthorized");

	return session.user.id;
}
