import { createFileRoute } from "@tanstack/react-router";
import ShoutoutPrice from "#/components/Shoutouts/ShoutoutPrice";
import ShoutoutStatus from "#/components/Shoutouts/ShoutoutStatus";

export const Route = createFileRoute("/_authenticated/shoutouts")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="space-y-6">
			<ShoutoutPrice />
			<ShoutoutStatus />
		</div>
	);
}
