import { HugeiconsIcon } from "@hugeicons/react";
import { Link } from "@tanstack/react-router";
import type { LinkProps } from "#/types/LinkProps";
import { DropdownMenuGroup, DropdownMenuItem } from "../ui/dropdown-menu";

export default function UserMenuLinksGroup({
	links,
	title,
}: {
	links: LinkProps[];
	title: string;
}) {
	return (
		<DropdownMenuGroup>
			{links
				.find((link) => link.category === title)
				?.links.map((link) => (
					<DropdownMenuItem
						key={link.label}
						render={
							<Link to={link.path}>
								<HugeiconsIcon icon={link.icon} />
								{link.label}
							</Link>
						}
					/>
				))}
		</DropdownMenuGroup>
	);
}
