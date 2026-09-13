import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/$handle")({
	component: RouteComponent,
});

function RouteComponent() {
	return <div>Hello "/$handle"!</div>;
}
