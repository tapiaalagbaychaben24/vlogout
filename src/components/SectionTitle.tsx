export default function SectionTitle({
	title,
	description,
}: {
	title: string;
	description?: string;
}) {
	return (
		<div className="space-y-0.5">
			<h2 className="text-base font-semibold">{title}</h2>

			{description && <p className="text-muted-foreground">{description}</p>}
		</div>
	);
}
