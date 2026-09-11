import { LogoutSquare01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useRouter } from "@tanstack/react-router";
import toast from "react-hot-toast";
import { authClient } from "#/lib/authClient";
import { DropdownMenuGroup, DropdownMenuItem } from "../ui/dropdown-menu";

export default function LogoutUser() {
	const router = useRouter();

	async function handleLogout() {
		const { error } = await authClient.signOut();

		if (error) {
			toast.error(error.message ?? "Could not log out");
			return;
		}
		await router.invalidate();
		await router.navigate({ to: "/login", replace: true });
	}

	return (
		<DropdownMenuGroup>
			<DropdownMenuItem variant="destructive" onClick={handleLogout}>
				<HugeiconsIcon icon={LogoutSquare01Icon} />
				Log out
			</DropdownMenuItem>
		</DropdownMenuGroup>
	);
}
