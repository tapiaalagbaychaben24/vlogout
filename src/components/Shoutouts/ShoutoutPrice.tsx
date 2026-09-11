import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

export default function ShoutoutPrice() {
	return (
		<div className="bg-card border rounded-lg">
			<div className="p-4">
				<div>
					<h2>Shoutout Price</h2>

					<div>
						<span className="text-2xl font-semibold">500.00</span>
					</div>
				</div>
			</div>

			<Separator />

			<div className="flex justify-end py-3 px-4">
				<Button variant="outline" size="sm">
					Update shoutout price
				</Button>
			</div>
		</div>
	);
}
