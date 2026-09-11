import { createServerFn } from "@tanstack/react-start";
import { getRequestHeaders } from "@tanstack/react-start/server";
import { createAuth } from "#/lib/auth";

export const getSession = createServerFn({ method: "GET" }).handler(
	async () => {
		return createAuth().api.getSession({ headers: getRequestHeaders() });
	},
);
