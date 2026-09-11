import { PhilippinePesoIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import SectionTitle from "../SectionTitle";
import { Button } from "../ui/button";

export default function OutstandingBalance() {
	return (
		<div className="space-y-4">
			<SectionTitle
				title="Outstanding balance"
				description="View your outstanding balance and your payment history."
			/>

			<div className="bg-card border rounded-lg">
				<div className="flex items-center justify-between border-b p-4">
					<p className="font-medium">Balance</p>

					<div className="flex items-center gap-1">
						<HugeiconsIcon
							icon={PhilippinePesoIcon}
							size={14}
							strokeWidth={2}
							className="text-muted-foreground"
						/>
						<span className="text-2xl font-semibold">0.00</span>
					</div>
				</div>

				<div className="flex justify-end p-4">
					<Button type="button" variant="outline" size="sm">
						Withdraw balance
					</Button>
				</div>
			</div>
		</div>
	);
}
