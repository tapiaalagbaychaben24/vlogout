import { useMutation } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import toast from "react-hot-toast";
import { updateShoutoutStatus } from "#/lib/shoutout.functions";
import SectionTitle from "../SectionTitle";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";

export default function ShoutoutStatus({
	shoutoutStatus,
}: {
	shoutoutStatus: string;
}) {
	const shoutoutStatusTitle =
		shoutoutStatus === "ACTIVE"
			? "Pause Shoutouts"
			: shoutoutStatus === "PAUSED"
				? "Shoutouts Paused"
				: "Shoutouts Inactive";

	const shoutoutStatusDescription =
		shoutoutStatus === "ACTIVE"
			? "Going on vacation or unavailable to fulfill requests? Pause your shoutouts to stop receiving new requests and avoid supporter frustration, refunds, and negative reviews."
			: shoutoutStatus === "PAUSED"
				? "Your shoutouts are currently paused. You will not receive new requests while paused. Unpause your shoutouts to start receiving new requests again."
				: "Your shoutouts are currently inactive because a previous request was not completed within the required time. You will not receive new requests until your shoutouts are reactivated.";

	const statusButtonLabel =
		shoutoutStatus === "ACTIVE"
			? "Pause shoutout"
			: shoutoutStatus === "PAUSED"
				? "Activate shoutout"
				: "Reactivate shoutout";

	const pendingStatusButtonLabel =
		shoutoutStatus === "ACTIVE"
			? "Pausing shoutout"
			: shoutoutStatus === "PAUSED"
				? "Activating shoutout"
				: "Reactivating shoutout";

	const router = useRouter();

	const updateShoutoutStatusMutation = useMutation({
		mutationFn: (status: string) => updateShoutoutStatus({ data: { status } }),
		onSuccess: async () => {
			toast.success("Shoutout status updated");
			await router.invalidate({
				filter: (route) => route.routeId === "/_authenticated/shoutouts",
			});
		},
		onError: (error) => {
			toast.error(error.message);
		},
	});

	function handleToggleShoutoutStatus() {
		if (shoutoutStatus === "ACTIVE") {
			updateShoutoutStatusMutation.mutate("PAUSED");
		} else if (shoutoutStatus === "PAUSED") {
			updateShoutoutStatusMutation.mutate("ACTIVE");
		} else if (shoutoutStatus === "INACTIVE") {
			updateShoutoutStatusMutation.mutate("ACTIVE");
		}

		return;
	}

	const isPending = updateShoutoutStatusMutation.isPending;

	return (
		<div className="space-y-5">
			<SectionTitle
				title="Shoutout status"
				description="View your shoutout status and reactivate your shoutouts if needed."
			/>

			<div className="bg-card border rounded-lg">
				<div className="border-b py-3 px-4 space-y-0.5">
					<p className="font-medium">{shoutoutStatusTitle}</p>
					<p className="text-muted-foreground">{shoutoutStatusDescription}</p>
				</div>

				<div className="flex justify-end py-3 px-4">
					<Button
						type="button"
						variant="outline"
						size="sm"
						disabled={isPending}
						onClick={handleToggleShoutoutStatus}
					>
						{isPending ? (
							<>
								<Spinner />
								{pendingStatusButtonLabel}
							</>
						) : (
							statusButtonLabel
						)}
					</Button>
				</div>
			</div>
		</div>
	);
}
