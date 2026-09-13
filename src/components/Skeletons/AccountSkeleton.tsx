import SectionTitle from "../SectionTitle";
import { Skeleton } from "../ui/skeleton";

export default function AccountSkeleton() {
	return (
		<div className="space-y-8">
			<div className="space-y-5">
				<SectionTitle title="Profile Information" />

				<div className="bg-card border rounded-lg">
					<div className="flex justify-between gap-6 border-b p-4">
						<div className="flex flex-col gap-0.5">
							<h3 className="font-medium">Profile Picture</h3>
						</div>

						<div className="w-74">
							<Skeleton className="size-16" />
						</div>
					</div>

					<div className="flex justify-between gap-6 border-b p-4">
						<div className="flex flex-col gap-0.5">
							<h3 className="font-medium">Cover Photo</h3>
						</div>
						<div className="w-74">
							<Skeleton className="h-16 w-74" />
						</div>
					</div>

					<div className="flex justify-between gap-6 border-b p-4">
						<div className="flex flex-col gap-0.5">
							<h3 className="font-medium">Display Name</h3>
						</div>

						<div className="w-74">
							<Skeleton className="h-9 w-74" />
						</div>
					</div>

					<div className="flex justify-between gap-6 border-b p-4">
						<div className="flex flex-col gap-0.5">
							<h3 className="font-medium">Handle</h3>
						</div>

						<div className="w-74">
							<Skeleton className="h-9 w-74" />
						</div>
					</div>

					<div className="flex justify-between gap-6 border-b p-4">
						<div className="flex flex-col gap-0.5">
							<h3 className="font-medium">Mobile number</h3>

							<p className="text-xs text-muted-foreground">
								We’ll use this to keep you updated on new requests, payouts, and
								other important notifications.
							</p>
						</div>

						<div className="w-74">
							<Skeleton className="h-9 w-74" />
						</div>
					</div>

					<div className="flex justify-between gap-6 border-b p-4">
						<div className="flex flex-col gap-0.5">
							<h3 className="font-medium">Bio</h3>

							<p className="text-xs text-muted-foreground">
								A brief introduction about yourself, your work, or what you do.
							</p>
						</div>

						<div className="w-74">
							<Skeleton className="h-16 w-74" />
						</div>
					</div>

					<div className="flex justify-between gap-6 border-b p-4">
						<div className="flex flex-col gap-0.5">
							<h3 className="font-medium">About you</h3>

							<p className="text-xs text-muted-foreground">
								Everything about yourself, your background, experiences, and
								anything else you'd like others to know.
							</p>
						</div>

						<div className="w-74">
							<Skeleton className="h-16 w-74" />
						</div>
					</div>

					<div className="flex justify-end p-4">
						<Skeleton className="h-7 w-24" />
					</div>
				</div>
			</div>

			<div className="space-y-5">
				<SectionTitle
					title="Social media connections"
					description="Connect your socials to help supporters verify that this account belongs to you."
				/>

				<div className="space-y-2">
					{Array.from({ length: 5 }).map((_) => (
						<div
							key={crypto.randomUUID()}
							className="flex justify-between items-center bg-card border rounded-lg py-3 px-4"
						>
							<div className="flex-1 flex items-center gap-3">
								<Skeleton className="rounded-full size-7" />

								<div className="flex-1 space-y-1">
									<Skeleton className="h-4 w-2/12" />
									<Skeleton className="h-4 w-2/6" />
								</div>
							</div>

							<Skeleton className="h-6 w-20" />
						</div>
					))}
				</div>
			</div>

			<div className="space-y-5">
				<SectionTitle
					title="Danger zone"
					description="Permanently delete your Vlogout account and data."
				/>

				<div className="bg-card border rounded-lg p-4 space-y-1">
					<Skeleton className="h-5 w-2/6" />
					<Skeleton className="h-5 w-full" />
					<Skeleton className="h-5 w-11/12" />
					<Skeleton className="h-5 w-2/6 mt-3" />
				</div>
			</div>
		</div>
	);
}
