import {
	CheckmarkCircle03Icon,
	CreditCardNotAcceptIcon,
	TrashIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import toast from "react-hot-toast";
import { deleteBankInformation } from "#/lib/banks.functions";
import { formatDate } from "#/lib/formatDate";
import type { BankProps, InstapayProviderProps } from "#/types/BankProps";
import SectionTitle from "../SectionTitle";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";
import AddBankInformation from "./AddBankInformation";

export default function PayoutMethod({
	bank,
	instapayProviders,
}: {
	bank: BankProps;
	instapayProviders: InstapayProviderProps[];
}) {
	const router = useRouter();

	const deleteBankInformationMutation = useMutation({
		mutationFn: deleteBankInformation,
		onSuccess: () => {
			toast.success("Bank information deleted successfully");
			router.invalidate({
				filter: (route) => route.routeId === "/_authenticated/wallet",
			});
		},
		onError: () => {
			toast.error("Failed to delete bank information");
		},
	});

	function handleDeleteBankInformation() {
		deleteBankInformationMutation.mutate({
			data: {
				account: bank.account,
			},
		});
	}

	const isPending = deleteBankInformationMutation.isPending;

	return (
		<div className="space-y-5">
			<SectionTitle
				title="Payout method"
				description="Set up your payout method to receive your earnings."
			/>

			<div className="bg-card border rounded-lg">
				<div className="border-b py-3 px-4">
					{bank ? (
						<div className="flex justify-between">
							<div>
								<div className="space-y-1.5">
									<p className="font-medium">{bank.providerName}</p>

									<p className="font-medium">
										{bank.accountName}, {bank.accountNumber}
									</p>

									<p className="text-xs text-muted-foreground">
										Added on: {formatDate(bank.createdAt)}
									</p>
								</div>
							</div>

							<div className="flex gap-1">
								<Badge className="bg-green-100 text-green-800 rounded-md h-6">
									<div className="bg-green-800 rounded-full size-1.5" /> Primary
								</Badge>

								<Button
									type="button"
									variant="destructive"
									size="icon-xs"
									onClick={handleDeleteBankInformation}
									disabled={isPending}
								>
									{isPending ? <Spinner /> : <HugeiconsIcon icon={TrashIcon} />}
								</Button>
							</div>
						</div>
					) : (
						<div className="flex items-center gap-2 text-xs text-muted-foreground font-medium py-2">
							<HugeiconsIcon icon={CreditCardNotAcceptIcon} size={20} />
							No payout method added
						</div>
					)}
				</div>

				<div
					className={`flex ${bank ? "justify-between" : "justify-end"} py-3 px-4`}
				>
					{bank && (
						<div className="flex items-center gap-2">
							<HugeiconsIcon
								icon={CheckmarkCircle03Icon}
								size={16}
								strokeWidth={2}
								color="green"
							/>
							<span className="text-xs font-medium">Verified for payouts</span>
						</div>
					)}

					<AddBankInformation
						bank={bank}
						instapayProviders={instapayProviders}
					/>
				</div>
			</div>
		</div>
	);
}
