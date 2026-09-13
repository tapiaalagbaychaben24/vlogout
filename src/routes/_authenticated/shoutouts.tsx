import { createFileRoute } from "@tanstack/react-router";
import ShoutoutPrice from "#/components/Shoutouts/ShoutoutPrice";
import ShoutoutStatus from "#/components/Shoutouts/ShoutoutStatus";
import { getShoutoutSettingsData } from "#/lib/shoutout.functions";

export const Route = createFileRoute("/_authenticated/shoutouts")({
	loader: () => getShoutoutSettingsData(),
	component: RouteComponent,
});

function RouteComponent() {
	const { price, status } = Route.useLoaderData();

	const formattedShoutoutPrice = price / 100;

	return (
		<div className="space-y-8">
			<ShoutoutPrice shoutoutPrice={formattedShoutoutPrice} />
			<ShoutoutStatus shoutoutStatus={status} />
		</div>
	);
}
