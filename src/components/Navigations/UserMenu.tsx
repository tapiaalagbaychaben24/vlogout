import {
	LockPasswordIcon,
	NotebookIcon,
	UnfoldMoreIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ThemeMode from "../ThemeMode";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import LogoutUser from "./LogoutUser";
import UserMenuLinksGroup from "./UserMenuLinksGroup";

export default function UserMenu({
	avatar,
	name,
}: {
	avatar: string;
	name: string;
}) {
	const links = [
		{
			category: "Legal",
			links: [
				{
					path: "/terms-of-service",
					icon: NotebookIcon,
					label: "Terms of Service",
				},
				{
					path: "/privacy-policy",
					icon: LockPasswordIcon,
					label: "Privacy Policy",
				},
			],
		},
	];

	const [open, setOpen] = useState(false);

	return (
		<DropdownMenu open={open} onOpenChange={setOpen}>
			<DropdownMenuTrigger
				render={
					<Button
						variant="ghost"
						size="lg"
						className="justify-between hover:bg-sidebar-accent dark:hover:bg-sidebar-accent border-0 rounded-lg w-full px-2 [&_svg:not([class*='size-'])]:size-5"
					>
						<div className="flex items-center gap-2">
							<Avatar className="size-5">
								<AvatarImage
									src={`https://assets.vlogout.com/accounts/avatars/${avatar}`}
								/>

								<AvatarFallback>
									{name?.charAt(0).toUpperCase() ?? "V"}
								</AvatarFallback>
							</Avatar>

							<p className="text-left truncate max-w-36">{name ?? "VLOGOUT"}</p>
						</div>

						<HugeiconsIcon icon={UnfoldMoreIcon} />
					</Button>
				}
			/>

			<DropdownMenuContent align="end">
				<UserMenuLinksGroup links={links} title="Legal" />

				<DropdownMenuSeparator />

				<ThemeMode />

				<DropdownMenuSeparator />

				<LogoutUser />
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
