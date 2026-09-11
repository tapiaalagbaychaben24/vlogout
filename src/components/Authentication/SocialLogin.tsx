import FacebookIcon from "#/assets/socials/facebook.svg?react";
import GoogleIcon from "#/assets/socials/google.svg?react";
import { Button } from "#/components/ui/button";

export default function SocialLogin() {
	return (
		<div className="space-y-2">
			<Button type="button" variant="outline" size="lg" className="w-full">
				<GoogleIcon className="size-4" />
				Continue with Google
			</Button>

			<Button type="button" variant="outline" size="lg" className="w-full">
				<FacebookIcon className="size-4" />
				Continue with Facebook
			</Button>
		</div>
	);
}
