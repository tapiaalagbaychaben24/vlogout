import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";
import { authClient } from "#/lib/authClient";
import { Button } from "../ui/button";
import {
	Field,
	FieldDescription,
	FieldError,
	FieldGroup,
	FieldLabel,
	FieldSet,
} from "../ui/field";
import { Input } from "../ui/input";
import { Spinner } from "../ui/spinner";

const loginSchema = z.object({
	email: z.email("Invalid email address"),
	code: z.string(),
});

export default function EmailLogin() {
	const [loginStep, setLoginStep] = useState<"Email" | "Code">("Email");

	const router = useRouter();

	const form = useForm<z.infer<typeof loginSchema>>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: "",
			code: "",
		},
	});

	async function onSubmit(data: z.infer<typeof loginSchema>) {
		if (loginStep === "Email") {
			const { error } = await authClient.emailOtp.sendVerificationOtp({
				email: data.email,
				type: "sign-in",
			});

			if (error) {
				toast.error(error.message ?? "Could not send code");
				return;
			}

			toast.success("Check your terminal for the code");
			setLoginStep("Code");
			return;
		}

		const { error } = await authClient.signIn.emailOtp({
			email: data.email,
			otp: data.code,
		});

		if (error) {
			console.error("OTP error:", error);
			toast.error(error.message ?? "Invalid code");
			return;
		}

		router.navigate({ to: "/dashboard" });
	}

	const isPending = form.formState.isSubmitting;

	return (
		<form onSubmit={form.handleSubmit(onSubmit)}>
			<FieldSet className="gap-3">
				<FieldGroup className="gap-3">
					<Controller
						name="email"
						control={form.control}
						render={({ field, fieldState }) => (
							<Field data-invalid={fieldState.invalid}>
								<FieldLabel htmlFor={field.name}>Email address</FieldLabel>

								<Input
									type="email"
									{...field}
									id={field.name}
									aria-invalid={fieldState.invalid}
									disabled={isPending || loginStep === "Code"}
									placeholder="yourname@email.com"
								/>

								{fieldState.invalid && (
									<FieldError errors={[fieldState.error]} />
								)}
							</Field>
						)}
					/>

					{loginStep === "Code" && (
						<Controller
							name="code"
							control={form.control}
							render={({ field, fieldState }) => (
								<Field data-invalid={fieldState.invalid}>
									<FieldLabel htmlFor={field.name}>6-digit code</FieldLabel>

									<Input
										{...field}
										id={field.name}
										aria-invalid={fieldState.invalid}
										disabled={isPending}
										placeholder="000000"
									/>

									{fieldState.invalid && (
										<FieldError errors={[fieldState.error]} />
									)}
								</Field>
							)}
						/>
					)}
				</FieldGroup>

				<FieldGroup className="gap-3">
					<Button
						type="submit"
						size="lg"
						disabled={isPending}
						className="w-full"
					>
						{isPending ? (
							<>
								<Spinner /> Sending login code...
							</>
						) : (
							"Send login code"
						)}
					</Button>

					<FieldDescription className="text-center">
						We will email you a 6-digit code. No password.
					</FieldDescription>
				</FieldGroup>
			</FieldSet>
		</form>
	);
}
