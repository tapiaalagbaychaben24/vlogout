import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import type * as z from "zod";
import { profileFormSchema, updateProfile } from "#/lib/profile.functions";
import SectionTitle from "../SectionTitle";
import { Button } from "../ui/button";
import {
	Field,
	FieldContent,
	FieldDescription,
	FieldError,
	FieldGroup,
	FieldLabel,
} from "../ui/field";
import { Input } from "../ui/input";
import { Spinner } from "../ui/spinner";
import { Textarea } from "../ui/textarea";

type FormValues = z.infer<typeof profileFormSchema>;

type Profile = {
	name: string | null;
	handle: string | null;
	number: string | null;
	bio: string | null;
	about: string | null;
} | null;

export default function AccountInformationForm({
	profile,
}: {
	profile: Profile;
}) {
	const form = useForm<FormValues>({
		resolver: zodResolver(profileFormSchema),
		defaultValues: {
			name: profile?.name ?? "",
			handle: profile?.handle ?? "",
			number: profile?.number ?? "",
			bio: profile?.bio ?? "",
			about: profile?.about ?? "",
		},
	});

	async function onSubmit(data: FormValues) {
		try {
			await updateProfile({ data });
			toast.success("Profile saved");
		} catch (error) {
			toast.error(error instanceof Error ? error.message : "Could not save");
		}
	}

	const { isDirty, isSubmitting } = form.formState;

	const isPending = isSubmitting;

	return (
		<div className="space-y-5">
			<SectionTitle title="Profile Information" />

			<div className="bg-card border rounded-lg">
				<div>
					<div className="flex justify-between border-b p-4">
						<h3 className="font-medium">Profile Picture</h3>

						<div className="w-74">
							<div className="border rounded-md size-16"></div>
						</div>
					</div>

					<div className="flex justify-between border-b p-4">
						<h3 className="font-medium">Cover Photo</h3>

						<div className="w-74">
							<div className="border rounded-md h-16 w-74"></div>
						</div>
					</div>
				</div>

				<form onSubmit={form.handleSubmit(onSubmit)}>
					<FieldGroup className="gap-0">
						<Controller
							name="name"
							control={form.control}
							render={({ field, fieldState }) => (
								<Field
									orientation="horizontal"
									data-invalid={fieldState.invalid}
									className="gap-6 p-4 border-b"
								>
									<FieldLabel htmlFor={field.name}>Display Name</FieldLabel>

									<Input
										{...field}
										id={field.name}
										className="w-74"
										disabled={isPending}
										aria-invalid={fieldState.invalid}
										placeholder="Juan Dela Cruz"
										autoComplete="off"
									/>

									{fieldState.invalid && (
										<FieldError errors={[fieldState.error]} />
									)}
								</Field>
							)}
						/>

						<Controller
							name="handle"
							control={form.control}
							render={({ field, fieldState }) => (
								<Field
									orientation="horizontal"
									data-invalid={fieldState.invalid}
									className="gap-6 p-4 border-b"
								>
									<FieldLabel htmlFor={field.name}>Handle</FieldLabel>

									<Input
										{...field}
										id={field.name}
										className="w-74"
										disabled={isPending}
										aria-invalid={fieldState.invalid}
										placeholder="JuanDelaCruz"
										autoComplete="off"
									/>

									{fieldState.invalid && (
										<FieldError errors={[fieldState.error]} />
									)}
								</Field>
							)}
						/>

						<Controller
							name="number"
							control={form.control}
							render={({ field, fieldState }) => (
								<Field
									orientation="horizontal"
									data-invalid={fieldState.invalid}
									className="gap-6 p-4 border-b"
								>
									<FieldContent>
										<FieldLabel htmlFor={field.name}>Mobile number</FieldLabel>

										<FieldDescription>
											We’ll use this to keep you updated on new requests,
											payouts, and other important notifications.
										</FieldDescription>
									</FieldContent>

									<Input
										{...field}
										id={field.name}
										className="w-74"
										disabled={isPending}
										aria-invalid={fieldState.invalid}
										placeholder="09"
										autoComplete="off"
									/>

									{fieldState.invalid && (
										<FieldError errors={[fieldState.error]} />
									)}
								</Field>
							)}
						/>

						<Controller
							name="bio"
							control={form.control}
							render={({ field, fieldState }) => (
								<Field
									orientation="horizontal"
									data-invalid={fieldState.invalid}
									className="gap-6 p-4 border-b"
								>
									<FieldContent>
										<FieldLabel htmlFor={field.name}>Bio</FieldLabel>

										<FieldDescription>
											A brief introduction about yourself, your work, or what
											you do.
										</FieldDescription>
									</FieldContent>

									<Textarea
										{...field}
										id={field.name}
										className="w-74"
										disabled={isPending}
										aria-invalid={fieldState.invalid}
										placeholder="Content creator, entrepreneur, and coffee enthusiast."
										autoComplete="off"
									/>

									{fieldState.invalid && (
										<FieldError errors={[fieldState.error]} />
									)}
								</Field>
							)}
						/>

						<Controller
							name="about"
							control={form.control}
							render={({ field, fieldState }) => (
								<Field
									orientation="horizontal"
									data-invalid={fieldState.invalid}
									className="gap-6 p-4 border-b"
								>
									<FieldContent>
										<FieldLabel htmlFor={field.name}>About you</FieldLabel>

										<FieldDescription>
											Everything about yourself, your background, experiences,
											and anything else you'd like others to know.
										</FieldDescription>
									</FieldContent>

									<Textarea
										{...field}
										id={field.name}
										className="w-74"
										disabled={isPending}
										aria-invalid={fieldState.invalid}
										placeholder="Filipino content creator sharing tech, lifestyle, and travel."
										autoComplete="off"
									/>

									{fieldState.invalid && (
										<FieldError errors={[fieldState.error]} />
									)}
								</Field>
							)}
						/>
					</FieldGroup>

					<FieldGroup className="items-end p-4">
						<Button
							type="submit"
							size="sm"
							disabled={!isDirty || isPending}
							className="w-max"
						>
							{isPending ? (
								<>
									<Spinner /> Saving changes...
								</>
							) : (
								"Save changes"
							)}
						</Button>
					</FieldGroup>
				</form>
			</div>
		</div>
	);
}
