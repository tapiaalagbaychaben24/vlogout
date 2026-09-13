import {
	CreditCardNotAcceptIcon,
	PlusSignIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import SectionTitle from "../SectionTitle";
import { Button } from "../ui/button";

export default function PayoutMethod() {
	return (
		<div className="space-y-5">
			<SectionTitle
				title="Payout method"
				description="Set up your payout method to receive your earnings."
			/>

			<div className="bg-card border rounded-lg">
				<div className="border-b py-3 px-4">
					<div className="flex items-center gap-2 text-xs text-muted-foreground font-medium py-2">
						<HugeiconsIcon icon={CreditCardNotAcceptIcon} size={20} />
						No payout method added
					</div>
				</div>

				<div className="flex justify-end py-3 px-4">
					<Button type="button" variant="outline" size="sm">
						<HugeiconsIcon icon={PlusSignIcon} />
						Add new card
					</Button>
				</div>
			</div>
		</div>
	);
}
