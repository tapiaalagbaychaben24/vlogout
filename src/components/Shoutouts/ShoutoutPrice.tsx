import { zodResolver } from "@hookform/resolvers/zod";
import { HugeiconsIcon } from "@hugeicons/react";
import { PhilippinePesoIcon } from "@hugeicons-pro/core-twotone-rounded";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";
import { pesosToCentavos } from "#/lib/formatPhp";
import { updateShoutoutPrice } from "#/lib/shoutout.functions";
import { Button } from "../ui/button";
import { Field, FieldError } from "../ui/field";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupInput,
} from "../ui/input-group";
import { Spinner } from "../ui/spinner";

const formSchema = z.object({
	price: z
		.number()
		.min(100, "Price must be at least 100 PHP.")
		.max(50000, "Price must be at most 50,000 PHP."),
});

export default function ShoutoutPrice({
	shoutoutPrice,
}: {
	shoutoutPrice: number;
}) {
	const [updateShoutoutPriceOpen, setUpdateShoutoutPriceOpen] =
		useState<boolean>(false);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			price: shoutoutPrice ?? 100,
		},
	});

	const router = useRouter();

	const updateShoutoutPriceMutation = useMutation({
		mutationFn: (data: z.infer<typeof formSchema>) =>
			updateShoutoutPrice({ data }),
		onSuccess: () => {
			toast.success("Shoutout price updated successfully");
			setUpdateShoutoutPriceOpen(false);
			router.invalidate({
				filter: (route) => route.routeId === "/_authenticated/shoutouts",
			});
		},
		onError: () => {
			toast.error("Failed to update shoutout price");
		},
	});

	function onSubmit(data: z.infer<typeof formSchema>) {
		updateShoutoutPriceMutation.mutate({ price: pesosToCentavos(data.price) });
	}

	const isPending =
		form.formState.isSubmitting || updateShoutoutPriceMutation.isPending;

	return (
		<div className="bg-card border rounded-lg">
			<div className="flex items-center justify-between border-b py-3 px-4">
				<h2 className="font-medium">Price per shoutout</h2>

				{updateShoutoutPriceOpen ? (
					<form
						id="update-shoutout-price-form"
						onSubmit={form.handleSubmit(onSubmit)}
					>
						<Controller
							name="price"
							control={form.control}
							render={({ field, fieldState }) => (
								<Field data-invalid={fieldState.invalid}>
									<InputGroup className="h-8">
										<InputGroupAddon>PHP</InputGroupAddon>

										<InputGroupInput
											{...field}
											id={field.name}
											onChange={(event) =>
												field.onChange(Number(event.target.value))
											}
											className="text-right pr-0!"
											disabled={isPending}
											aria-invalid={fieldState.invalid}
											placeholder="100"
											autoComplete="off"
										/>

										<InputGroupAddon align="inline-end">.00</InputGroupAddon>
									</InputGroup>

									{fieldState.invalid && (
										<FieldError errors={[fieldState.error]} />
									)}
								</Field>
							)}
						/>
					</form>
				) : (
					<div className="flex items-center gap-1">
						<HugeiconsIcon
							icon={PhilippinePesoIcon}
							size={14}
							strokeWidth={2}
							className="text-muted-foreground"
						/>
						<span className="text-2xl font-semibold">
							{shoutoutPrice?.toLocaleString("en-US", {
								minimumFractionDigits: 2,
								maximumFractionDigits: 2,
							})}
						</span>
					</div>
				)}
			</div>

			<div className="flex justify-end py-3 px-4">
				{updateShoutoutPriceOpen ? (
					<div className="flex items-center gap-1">
						<Button
							type="reset"
							variant="outline"
							size="sm"
							onClick={() => {
								setUpdateShoutoutPriceOpen(false);
								form.reset({ price: shoutoutPrice ?? 100 });
							}}
							disabled={isPending}
						>
							Cancel
						</Button>

						<Button
							type="submit"
							form="update-shoutout-price-form"
							size="sm"
							disabled={isPending}
						>
							{isPending ? (
								<>
									<Spinner /> Updating...
								</>
							) : (
								"Update"
							)}
						</Button>
					</div>
				) : (
					<Button
						type="button"
						variant="outline"
						size="sm"
						onClick={() => setUpdateShoutoutPriceOpen(true)}
						disabled={isPending}
					>
						Update Shoutout Price
					</Button>
				)}
			</div>
		</div>
	);
}
