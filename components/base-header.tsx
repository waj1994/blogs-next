import Link from 'next/link';
import ThemeButton from './theme-button';

export default function BaseHeader() {
	return (
		<header className="px-4 lg:px-8 h-15 flex items-center mb-12 justify-between sticky top-0 bg-white dark:bg-black border-b border-black/20">
			<h2 className="text-xl font-bold">
				<Link
					href="/"
					className="text-gray-600"
				>
					w
				</Link>
			</h2>
			<div className="flex flex-row-reverse items-center gap-x-4 header-handler">
				<ThemeButton />
			</div>
		</header>
	);
}
