import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import AuthSidebar from "#/components/Navigations/AuthSidebar";
import { ThemeProvider } from "#/components/ThemeProvider";
import { SidebarProvider } from "#/components/ui/sidebar";
import { getSession } from "#/lib/auth.functions";

export const Route = createFileRoute("/_authenticated")({
	beforeLoad: async ({ location }) => {
		const session = await getSession();

		if (!session) {
			throw redirect({
				to: "/login",
				search: { redirect: location.href },
			});
		}

		return { session };
	},
	component: AuthenticatedLayout,
});

function AuthenticatedLayout() {
	return (
		<ThemeProvider defaultTheme="light" storageKey="theme">
			<SidebarProvider>
				<AuthSidebar isAdmin={false} handle="test" pendingShoutoutsCount={0} />

				<main className="w-11/12 max-w-2xl my-8 mx-auto">
					<Outlet />
				</main>
			</SidebarProvider>
		</ThemeProvider>
	);
}
