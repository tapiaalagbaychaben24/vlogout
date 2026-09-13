import { createFileRoute } from "@tanstack/react-router";
import AccountInformationForm from "#/components/Account/AccountInformationForm";
import DeleteAccount from "#/components/Account/DeleteAccount";
import SocialLinks from "#/components/Account/SocialLinks";
import AccountSkeleton from "#/components/Skeletons/AccountSkeleton";
import { getProfile } from "#/lib/profile.functions";

export const Route = createFileRoute("/_authenticated/account")({
	loader: () => getProfile(),
	pendingMs: 0,
	pendingComponent: AccountSkeleton,
	component: RouteComponent,
});

function RouteComponent() {
	const profile = Route.useLoaderData();

	return (
		<div className="space-y-8">
			<AccountInformationForm profile={profile} />
			<SocialLinks />
			<DeleteAccount />
		</div>
	);
}
