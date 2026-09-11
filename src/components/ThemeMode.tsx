import { MonitorIcon, Moon02Icon, Sun03Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useTheme } from "./ThemeProvider";
import { DropdownMenuItem } from "./ui/dropdown-menu";

export default function ThemeMode() {
	const { theme, setTheme } = useTheme();

	const Icon =
		theme === "light" ? Moon02Icon : theme === "dark" ? Sun03Icon : MonitorIcon;

	const themeList: Array<"light" | "dark" | "system"> = [
		"light",
		"dark",
		"system",
	];

	function toggleTheme() {
		const currentIndex = themeList.indexOf(theme);
		const nextIndex = (currentIndex + 1) % themeList.length;

		setTheme(themeList[nextIndex]);
	}

	return (
		<DropdownMenuItem
			className="flex items-center justify-between"
			onClick={toggleTheme}
		>
			<div className="flex items-center gap-2">
				<HugeiconsIcon icon={Icon} />
				Toggle Theme
			</div>
		</DropdownMenuItem>
	);
}
