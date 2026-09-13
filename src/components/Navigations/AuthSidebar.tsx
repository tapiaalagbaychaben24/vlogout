import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react";
import {
	AccountSetting03Icon,
	ArrowDown01Icon,
	Copy01Icon,
	CreditCardIcon,
	DeliveryBox01Icon,
	FavouriteIcon,
	GitbookIcon,
	Layers01Icon,
	LinkSquare02Icon,
	PromotionIcon,
	ShoppingBag01Icon,
} from "@hugeicons-pro/core-twotone-rounded";
import { Link, useLocation } from "@tanstack/react-router";
import { useState } from "react";
import toast from "react-hot-toast";
import { useCopyToClipboard } from "react-use";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSub,
	SidebarMenuSubButton,
	SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { Badge } from "../ui/badge";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "../ui/collapsible";
import UserMenu from "./UserMenu";

type SideNavigationLinkProps = {
	category: string;
	links: {
		label: string;
		path: string;
		icon: IconSvgElement;
		hasSublinks: boolean;
		isOpen?: boolean;
		setIsOpen?: (isOpen: boolean) => void;
		sublinks?: {
			label: string;
			path: string;
		}[];
	}[];
};

export default function AuthSidebar({
	isAccountAdmin,
	accountHandle,
	pendingShoutoutsCount,
}: {
	isAccountAdmin: boolean;
	accountHandle: string;
	pendingShoutoutsCount: number;
}) {
	const { pathname } = useLocation();

	const [isShopOpen, setIsShopOpen] = useState<boolean>(false);
	const [, copy] = useCopyToClipboard();

	function handleCopyProfileLink() {
		copy(`${window.location.origin}/${accountHandle}`);
		toast.success("Profile Link copied!");
	}

	const links: SideNavigationLinkProps[] = [
		{
			category: "DASHBOARD",
			links: [
				{
					label: "Dashboard",
					path: "/dashboard",
					icon: Layers01Icon,
					hasSublinks: false,
				},
				{
					label: "Wallet",
					path: "/wallet",
					icon: CreditCardIcon,
					hasSublinks: false,
				},
				{
					label: "Purchases",
					path: "/purchases",
					icon: DeliveryBox01Icon,
					hasSublinks: false,
				},
			],
		},
		{
			category: "INFLUENCER",
			links: [
				{
					label: "Supporters",
					path: "/supporters",
					icon: FavouriteIcon,
					hasSublinks: false,
				},
				{
					label: "Shoutouts",
					path: "/shoutouts",
					icon: PromotionIcon,
					hasSublinks: false,
				},
				{
					label: "Shop",
					path: "/shop",
					icon: ShoppingBag01Icon,
					hasSublinks: true,
					isOpen: isShopOpen,
					setIsOpen: setIsShopOpen,
					sublinks: [
						{
							label: "Products",
							path: "/shop/products",
						},
						{
							label: "Orders",
							path: "/shop/orders",
						},
					],
				},
			],
		},
	];

	if (isAccountAdmin) {
		links.push({
			category: "ADMIN",
			links: [
				{
					label: "Ledger",
					path: "/admin/ledger",
					icon: GitbookIcon,
					hasSublinks: false,
				},
			],
		});
	}

	return (
		<Sidebar>
			<SidebarHeader>
				<Link to="/dashboard">
					<div className="bg-primary rounded-full size-6 mx-1.5" />
				</Link>

				<UserMenu avatar="" name="Chaben Jade Alagbay" />
			</SidebarHeader>

			<SidebarContent>
				{links.map((group) => {
					if (group.category === "Admin" && !isAccountAdmin) return null;

					return (
						<SidebarGroup key={group.category}>
							{group.category !== "DASHBOARD" && (
								<SidebarGroupLabel>{group.category}</SidebarGroupLabel>
							)}

							<SidebarMenu>
								{group.links.map((link) =>
									!link.hasSublinks ? (
										<SidebarMenu key={link.label}>
											<SidebarMenuItem>
												<SidebarMenuButton
													isActive={pathname === link.path}
													render={
														<Link to={link.path} preload="intent">
															<HugeiconsIcon icon={link.icon} size={20} />{" "}
															{link.label}
															{link.path === "/shoutouts" &&
																pendingShoutoutsCount > 0 && (
																	<Badge className="ml-auto">
																		{pendingShoutoutsCount}
																	</Badge>
																)}
														</Link>
													}
												/>
											</SidebarMenuItem>
										</SidebarMenu>
									) : (
										<Collapsible
											key={link.label}
											open={link.isOpen}
											onOpenChange={link.setIsOpen}
										>
											<CollapsibleTrigger
												render={
													<SidebarMenuButton>
														<HugeiconsIcon icon={link.icon} size={20} />{" "}
														{link.label}
														<HugeiconsIcon
															icon={ArrowDown01Icon}
															size={20}
															className={`ml-auto ${link.isOpen ? "rotate-180 transition-all duration-300" : ""}`}
														/>
													</SidebarMenuButton>
												}
											/>

											<CollapsibleContent>
												<SidebarMenuSub>
													{link.sublinks?.map((sublink) => (
														<SidebarMenuSubItem key={sublink.label}>
															<SidebarMenuSubButton
																isActive={pathname === sublink.path}
																render={
																	<Link to={sublink.path}>{sublink.label}</Link>
																}
															/>
														</SidebarMenuSubItem>
													))}
												</SidebarMenuSub>
											</CollapsibleContent>
										</Collapsible>
									),
								)}
							</SidebarMenu>
						</SidebarGroup>
					);
				})}
			</SidebarContent>

			<SidebarFooter>
				<SidebarGroup>
					<SidebarMenu>
						<SidebarMenuItem>
							<SidebarMenuButton
								render={
									<Link
										to="/$handle"
										params={{ handle: accountHandle }}
										target="_blank"
									>
										<HugeiconsIcon icon={LinkSquare02Icon} size={20} /> View
										Profile Page
									</Link>
								}
							/>
						</SidebarMenuItem>

						<SidebarMenuItem>
							<SidebarMenuButton
								onClick={handleCopyProfileLink}
								className="cursor-pointer"
							>
								<HugeiconsIcon icon={Copy01Icon} size={20} /> Copy Profile Link
							</SidebarMenuButton>
						</SidebarMenuItem>

						<SidebarMenuItem>
							<SidebarMenuButton
								isActive={pathname.startsWith("/account")}
								render={
									<Link to="/account">
										<HugeiconsIcon icon={AccountSetting03Icon} size={20} />{" "}
										Account
									</Link>
								}
							/>
						</SidebarMenuItem>
					</SidebarMenu>
				</SidebarGroup>
			</SidebarFooter>
		</Sidebar>
	);
}
