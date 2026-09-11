import { createFileRoute } from "@tanstack/react-router";
import OutstandingBalance from "#/components/Wallet/OutstandingBalance";
import PayoutHistory from "#/components/Wallet/PayoutHistory";
import PayoutMethod from "#/components/Wallet/PayoutMethod";

export const Route = createFileRoute("/_authenticated/wallet")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="space-y-8">
			<OutstandingBalance />
			<PayoutMethod />
			<PayoutHistory />
		</div>
	);
}
