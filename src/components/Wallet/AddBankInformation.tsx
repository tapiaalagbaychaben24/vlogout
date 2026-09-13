import { zodResolver } from "@hookform/resolvers/zod";
import { HugeiconsIcon } from "@hugeicons/react";
import { PlusSignIcon } from "@hugeicons-pro/core-twotone-rounded";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import type * as z from "zod";
import { addBankInformation, bankFormSchema } from "#/lib/banks.functions";
import type { BankProps, InstapayProviderProps } from "#/types/BankProps";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Field, FieldError, FieldSet } from "../ui/field";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupInput,
} from "../ui/input-group";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectSeparator,
	SelectTrigger,
	SelectValue,
} from "../ui/select";
import { Spinner } from "../ui/spinner";

export default function AddBankInformation({
	bank,
	instapayProviders,
}: {
	bank: BankProps;
	instapayProviders: InstapayProviderProps[];
}) {
	const [openPayoutMethodDialog, setOpenPayoutMethodDialog] =
		useState<boolean>(false);

	const form = useForm<z.infer<typeof bankFormSchema>>({
		resolver: zodResolver(bankFormSchema),
		defaultValues: {
			accountName: "",
			accountNumber: "",
			providerCode: "",
			providerName: "",
		},
	});

	const router = useRouter();

	const addBankInformationMutation = useMutation({
		mutationFn: addBankInformation,
		onSuccess: () => {
			toast.success("Bank information added successfully!");
			form.reset();
			setOpenPayoutMethodDialog(false);
			router.invalidate({
				filter: (route) => route.routeId === "/_authenticated/wallet",
			});
		},
		onError: (error) => {
			toast.error(error.message);
		},
	});

	function onSubmit(data: z.infer<typeof bankFormSchema>) {
		const provider = instapayProviders?.find(
			(bank: { attributes: { provider_code: string } }) =>
				bank.attributes.provider_code === data.providerCode,
		);

		const providerName = provider?.attributes?.name;
		const providerCode = provider?.attributes?.provider_code;

		if (!providerCode || !providerName) {
			toast.error("Invalid bank selection");
			return;
		}

		addBankInformationMutation.mutate({
			data: {
				accountName: data.accountName,
				accountNumber: data.accountNumber,
				providerCode,
				providerName,
			},
		});
	}

	const { isDirty, isSubmitting } = form.formState;

	const isPending = isSubmitting || addBankInformationMutation.isPending;

	return (
		<Dialog
			open={openPayoutMethodDialog}
			onOpenChange={(open) => {
				if (open && bank) {
					toast.error("You already have a bank added");
					return;
				}
				setOpenPayoutMethodDialog(open);
			}}
		>
			<DialogTrigger
				render={
					<Button type="button" variant="outline" size="sm">
						<HugeiconsIcon icon={PlusSignIcon} />
						Add new bank
					</Button>
				}
			/>

			<DialogContent className="sm:max-w-md">
				<DialogHeader className="border-b p-4 -mx-4 -mt-4">
					<DialogTitle>Add new payout method</DialogTitle>

					<DialogDescription className="text-xs">
						Double-check your bank details. Incorrect details may cause failed
						or misdirected payouts.
					</DialogDescription>
				</DialogHeader>

				<form id="add-bank-information" onSubmit={form.handleSubmit(onSubmit)}>
					<FieldSet className="gap-2">
						<Controller
							name="providerCode"
							control={form.control}
							render={({ field, fieldState }) => (
								<Field data-invalid={fieldState.invalid}>
									<Select
										name={field.name}
										value={field.value}
										onValueChange={field.onChange}
										disabled={isPending}
									>
										<SelectTrigger
											id={field.name}
											aria-invalid={fieldState.invalid}
										>
											<SelectValue placeholder="Select bank" />
										</SelectTrigger>

										<SelectContent>
											<SelectGroup>
												<SelectLabel>Banks</SelectLabel>

												{instapayProviders
													?.filter((bank) => bank.category === "bank")
													.map((bank) => (
														<SelectItem
															key={bank.attributes.provider_code}
															value={bank.attributes.provider_code}
														>
															{bank.attributes.name}
														</SelectItem>
													))}
											</SelectGroup>

											<SelectSeparator />

											<SelectGroup>
												<SelectLabel>E-Wallets</SelectLabel>

												{instapayProviders
													?.filter((bank) => bank.category === "e-wallet")
													.map((bank) => (
														<SelectItem
															key={bank.attributes.provider_code}
															value={bank.attributes.provider_code}
														>
															{bank.attributes.name}
														</SelectItem>
													))}
											</SelectGroup>
										</SelectContent>
									</Select>

									{fieldState.invalid && (
										<FieldError errors={[fieldState.error]} />
									)}
								</Field>
							)}
						/>

						<Controller
							name="accountNumber"
							control={form.control}
							render={({ field, fieldState }) => (
								<Field data-invalid={fieldState.invalid}>
									<InputGroup>
										<InputGroupAddon align="block-start" className="text-xs">
											Account Number
										</InputGroupAddon>

										<InputGroupInput
											{...field}
											id={field.name}
											disabled={isPending}
											placeholder="0000 0000 0000 0000"
											aria-invalid={fieldState.invalid}
										/>
									</InputGroup>

									{fieldState.invalid && (
										<FieldError errors={[fieldState.error]} />
									)}
								</Field>
							)}
						/>

						<Controller
							name="accountName"
							control={form.control}
							render={({ field, fieldState }) => (
								<Field data-invalid={fieldState.invalid}>
									<InputGroup>
										<InputGroupAddon align="block-start" className="text-xs">
											Account Name
										</InputGroupAddon>

										<InputGroupInput
											{...field}
											id={field.name}
											disabled={isPending}
											placeholder="Juan Dela Cruz"
											aria-invalid={fieldState.invalid}
										/>
									</InputGroup>

									{fieldState.invalid && (
										<FieldError errors={[fieldState.error]} />
									)}
								</Field>
							)}
						/>
					</FieldSet>
				</form>

				<DialogFooter>
					<Button
						type="button"
						variant="outline"
						size="sm"
						form="add-bank-information"
						onClick={() => {
							form.reset();
							setOpenPayoutMethodDialog(false);
						}}
						disabled={isPending}
					>
						Cancel
					</Button>

					<Button
						type="submit"
						size="sm"
						form="add-bank-information"
						disabled={!isDirty || isPending}
					>
						{isPending ? (
							<>
								<Spinner /> Saving Changes
							</>
						) : (
							"Add payout method"
						)}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
