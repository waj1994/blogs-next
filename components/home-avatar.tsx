import Image from 'next/image';

export default function HomeAvatar() {
	return (
		<div className="text-center mb-10">
			<Image
				width={120}
				height={120}
				src="/avatar.jpg"
				className="rounded-full border-8 border-gray-200 dark:border-gray-800 !mx-auto mb-2 rotate-0 hover:rotate-360"
				alt="头像"
			/>
			<h3>{`I'm 王杰`}</h3>
			<p className="text-gray-600 dark:text-gray-400">Welcome to my blog!</p>
		</div>
	);
}
