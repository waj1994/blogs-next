import Link from 'next/link';
import ThemeButton from './theme-button';

export default function BaseHeader() {
  return (
    <header className="px-8 h-15 flex items-center mb-12 justify-between sticky top-0 bg-white dark:bg-black">
      <h2 className="text-xl font-bold">
        <Link
          href="/"
          className="text-red-200"
        >
          W
        </Link>
      </h2>
      <ThemeButton />
    </header>
  );
}
