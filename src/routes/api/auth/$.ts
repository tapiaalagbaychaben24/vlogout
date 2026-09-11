import { createFileRoute } from "@tanstack/react-router";
import { createAuth } from "#/lib/auth";

export const Route = createFileRoute("/api/auth/$")({
	server: {
		handlers: {
			GET: async ({ request }) => await createAuth().handler(request),
			POST: async ({ request }) => await createAuth().handler(request),
		},
	},
});
