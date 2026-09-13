import { createFileRoute } from "@tanstack/react-router";
import OutstandingBalance from "#/components/Wallet/OutstandingBalance";
import PayoutHistory from "#/components/Wallet/PayoutHistory";
import PayoutMethod from "#/components/Wallet/PayoutMethod";
import { getBank, getInstapayProviders } from "#/lib/banks.functions";
import { getMeta } from "#/lib/meta.functions";

export const Route = createFileRoute("/_authenticated/wallet")({
	loader: async () => {
		const meta = await getMeta();
		const bank = await getBank();
		const instapayProviders = await getInstapayProviders();

		return { meta, bank, instapayProviders };
	},
	component: RouteComponent,
});

function RouteComponent() {
	const { meta, bank, instapayProviders } = Route.useLoaderData();

	return (
		<div className="space-y-8">
			<OutstandingBalance balance={Number(meta?.balance)} />
			<PayoutMethod bank={bank} instapayProviders={instapayProviders} />
			<PayoutHistory />
		</div>
	);
}
