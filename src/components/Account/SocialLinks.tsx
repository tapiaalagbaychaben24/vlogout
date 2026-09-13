import { ArrowDown01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import FacebookIcon from "@/assets/socials/facebook.svg?react";
import InstagramIcon from "@/assets/socials/instagram.svg?react";
import LinkedInIcon from "@/assets/socials/linkedin.svg?react";
import TikTokIcon from "@/assets/socials/tiktok.svg?react";
import YoutubeIcon from "@/assets/socials/youtube.svg?react";
import SectionTitle from "../SectionTitle";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

export default function SocialLinks() {
	return (
		<div className="space-y-5">
			<SectionTitle
				title="Social media connections"
				description="Connect your socials to help supporters verify that this account belongs to you."
			/>

			<div className="space-y-2">
				<div className="flex justify-between items-center gap-8 bg-card border rounded-lg py-3 px-4">
					<div className="flex items-center gap-3">
						<FacebookIcon className="size-7" />

						<div>
							<div className="flex items-center gap-1.5">
								<p className="font-medium">Facebook</p>

								<Badge variant="outline" className="text-xxs h-4 px-1">
									CONNECTED
								</Badge>
							</div>

							<p className="text-xs text-muted-foreground">
								Connected on: September 1, 2026 7:46 PM
							</p>
						</div>
					</div>

					<div>
						<Button type="button" variant="outline" size="sm">
							Manage <HugeiconsIcon icon={ArrowDown01Icon} />
						</Button>
					</div>
				</div>

				<div className="flex justify-between items-center gap-8 bg-card border rounded-lg py-3 px-4">
					<div className="flex items-center gap-3">
						<InstagramIcon className="size-7" />

						<div>
							<p className="font-medium">Instagram</p>

							<p className="text-xs text-muted-foreground">Not connected</p>
						</div>
					</div>

					<div>
						<Button type="button" size="sm">
							Connect
						</Button>
					</div>
				</div>

				<div className="flex justify-between items-center gap-8 bg-card border rounded-lg py-3 px-4">
					<div className="flex items-center gap-3">
						<TikTokIcon className="size-7" />

						<div>
							<p className="font-medium">TikTok</p>

							<p className="text-xs text-muted-foreground">Not connected</p>
						</div>
					</div>

					<div>
						<Button type="button" size="sm">
							Connect
						</Button>
					</div>
				</div>

				<div className="flex justify-between items-center gap-8 bg-card border rounded-lg py-3 px-4">
					<div className="flex items-center gap-3">
						<YoutubeIcon className="size-7" />

						<div>
							<p className="font-medium">Youtube</p>

							<p className="text-xs text-muted-foreground">Not connected</p>
						</div>
					</div>

					<div>
						<Button type="button" size="sm">
							Connect
						</Button>
					</div>
				</div>

				<div className="flex justify-between items-center gap-8 bg-card border rounded-lg py-3 px-4">
					<div className="flex items-center gap-3">
						<LinkedInIcon className="size-7" />

						<div>
							<p className="font-medium">Linkedin</p>

							<p className="text-xs text-muted-foreground">Not connected</p>
						</div>
					</div>

					<div>
						<Button type="button" size="sm">
							Connect
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}
