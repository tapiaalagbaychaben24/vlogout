import { createFileRoute } from "@tanstack/react-router";
import AccountInformationForm from "#/components/Account/AccountInformationForm";
import DeleteAccount from "#/components/Account/DeleteAccount";
import SocialLinks from "#/components/Account/SocialLinks";
import { getProfile } from "#/lib/profile.functions";

export const Route = createFileRoute("/_authenticated/account")({
	loader: () => getProfile(),
	component: RouteComponent,
});

function RouteComponent() {
	const profile = Route.useLoaderData();

	console.log("Profile", profile);

	return (
		<div className="space-y-8">
			<AccountInformationForm profile={profile} />
			<SocialLinks />
			<DeleteAccount />
		</div>
	);
}
