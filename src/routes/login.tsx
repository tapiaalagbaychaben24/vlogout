import { createFileRoute } from "@tanstack/react-router";
import EmailLogin from "#/components/Authentication/EmailLogin";
import SocialLogin from "#/components/Authentication/SocialLogin";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

export const Route = createFileRoute("/login")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="flex items-center justify-center min-h-screen w-11/12 max-w-md mx-auto">
			<Card className="shadow-xs">
				<CardHeader className="text-center">
					<CardTitle>Fund your creative work</CardTitle>

					<CardDescription>
						<p>Get support. Give shoutouts. Sell products.</p>

						<p>It's easier than you think.</p>
					</CardDescription>
				</CardHeader>

				<CardContent className="space-y-4">
					<SocialLogin />

					<div className="relative">
						<div className="absolute inset-0 flex items-center">
							<span className="border-t w-full"></span>
						</div>

						<div className="relative flex justify-center text-xs text-muted-foreground">
							<span className="bg-card px-2">or continue with email</span>
						</div>
					</div>

					<EmailLogin />
				</CardContent>
			</Card>
		</div>
	);
}
