import { Button } from "../ui/button";

export default function ShoutoutStatus() {
	return (
		<div className="bg-card border rounded-lg p-4">
			<div className="space-y-3">
				<div className="space-y-0.5">
					<p className="font-medium">Shoutouts Inactive</p>

					<p className="text-muted-foreground">
						Your shoutouts are currently inactive because a previous request was
						not completed within the required time. You will not receive new
						requests until your shoutouts are reactivated.
					</p>
				</div>

				<Button type="button" size="sm">
					Reactivate shoutouts
				</Button>
			</div>
		</div>
	);
}
