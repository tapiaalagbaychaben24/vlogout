import type { IconSvgElement } from "@hugeicons/react";

export type LinkProps = {
	category: string;
	links: {
		path: string;
		icon: IconSvgElement;
		label: string;
	}[];
};
