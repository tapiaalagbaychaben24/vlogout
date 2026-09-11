import SectionTitle from "../SectionTitle";
import { Button } from "../ui/button";

export default function DeleteAccount() {
	return (
		<div className="space-y-5">
			<SectionTitle
				title="Danger zone"
				description="Permanently delete your Vlogout account and data."
			/>

			<div className="bg-card border rounded-lg p-4">
				<div className="space-y-3">
					<div className="space-y-0.5">
						<p className="font-medium">Request for account deletion</p>

						<p className="text-muted-foreground">
							Deleting your account is permanent and cannot be undone. Your data
							will be deleted within 30 days, but we may retain some metadata
							and logs for longer where required or permitted by law.
						</p>
					</div>

					<Button type="button" variant="destructive" size="sm">
						Request to delete account
					</Button>
				</div>
			</div>
		</div>
	);
}
