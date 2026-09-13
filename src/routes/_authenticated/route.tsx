import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import AuthSidebar from "#/components/Navigations/AuthSidebar";
import { ThemeProvider } from "#/components/ThemeProvider";
import { SidebarProvider } from "#/components/ui/sidebar";
import { getSession } from "#/lib/auth.functions";
import { getMeta } from "#/lib/meta.functions";
import { getProfile } from "#/lib/profile.functions";

export const Route = createFileRoute("/_authenticated")({
	staleTime: 5 * 60 * 1000,
	beforeLoad: async () => {
		const session = await getSession();

		if (!session) {
			throw redirect({
				to: "/login",
			});
		}
	},
	loader: async () => {
		const profile = await getProfile();
		const meta = await getMeta();

		return { profile, meta };
	},
	component: AuthenticatedLayout,
});

function AuthenticatedLayout() {
	const { profile, meta } = Route.useLoaderData();

	return (
		<ThemeProvider defaultTheme="light" storageKey="theme">
			<SidebarProvider>
				<AuthSidebar
					isAccountAdmin={meta?.role === "ADMIN"}
					accountHandle={profile?.handle ?? ""}
					pendingShoutoutsCount={0}
				/>

				<main className="w-11/12 max-w-2xl my-8 mx-auto">
					<Outlet />
				</main>
			</SidebarProvider>
		</ThemeProvider>
	);
}
